const express = require("express");
const orderItemsRouter = express.Router();
const { promisifiedVerify } = require("../db/users");
const {
  deleteCart,
  getActiveCartByUserId,
  getProductQuantity,
  createOrUpdateCartProduct,
  getCartProductsQuantity,
} = require("../db");

orderItemsRouter.use((req, res, next) =>{
    console.log('A request is being made to /orderItems');
    next();
  });

// This route creates an upsert vs insert. Meaning we could potentially update an existing cart_product or create a new one. Must be careful not to insert duplicate cart_product on the front end.
orderItemsRouter.post("/", verifyToken, async (req, res, next) => {
    const { productId, quantity } = req.body;
    const token = req.token;
    const productQuantity = await getProductQuantity(productId);
    if (productQuantity === null) {
      throw new Error("Product not found.")
    }

    //cannot add negative items. When creating cart can only add not subtract
    let quantityToPurchase = quantity > 0 ? quantity : 0;
    if (productQuantity < quantityToPurchase) {
      quantityToPurchase = productQuantity;
    }

    const {id} = await promisifiedVerify(token);
    const cart = await getActiveCartByUserId(id);
    const cartProduct = await createOrUpdateCartProduct(cart.id, productId, quantityToPurchase);
    
    res.json(cartProduct);

});

// PUT "api/orderItems/:orderItemId" : Updating the quantity of a users order item.
// Body: { quantity }
// Make sure the ordered item exists for that user first. - done: createOrUpdateCartProduct will insert and update if the item already exists
// Make sure item belongs to active cart. - Done getActiveCartByUserId
// If increasing the quantity, make sure stock is available first. If there isn't, increase as much as is available. Make sure to decrease the stock. - done 
// If decreasing the purchased quantity, increase the quantity of the product. - done
orderItemsRouter.put("/:orderItemId", verifyToken, async (req, res, next) => {
  console.log("got this far");
    const { orderItemId } = req.params;
    const { quantity } = req.body;
    const token = req.token;

    const productQuantity = await getProductQuantity(orderItemId);
    if (productQuantity === null) {
      throw new Error("Product not found.")
    }

    const {id} = await promisifiedVerify(token);
    const cart = await getActiveCartByUserId(id);
    const cartQuantity = await getCartProductsQuantity(orderItemId, cart.id);

    let quantityToUpdate = quantity;

    //if there was an easier way to do this please let me know. My nose is bleeding...
    if ((productQuantity - quantityToUpdate <= 0) && quantityToUpdate > 0) {
      console.log("triggering productQuantity logic");
      quantityToUpdate = productQuantity;
    }

    if ((cartQuantity + quantityToUpdate <= 0) && quantityToUpdate < 0) {
      console.log("trigger carQuantity logic", cartQuantity);
      quantityToUpdate = -cartQuantity;
    }

    const cartProduct = await createOrUpdateCartProduct(cart.id, orderItemId, quantityToUpdate);

    res.json(cartProduct);
});

// DELETE "api/orderItems/:orderItemId" : Deleting an order item from the cart
// Make sure you are dealing with an order item from an active cart for the user. You can expect an authorization header with a token for the user whose cart this is. Add all of the deleted quantity back to the stock of the product.
orderItemsRouter.delete("/:orderItemId", verifyToken, async (req, res, next) => {
    const { orderItemId } = req.params;
    const token = req.token;
});

// Verify Token
function verifyToken(req, res, next) {
  // Get auth header value
  const bearerHeader = req.headers["authorization"];
  // Check if bearer is undefined
  if (typeof bearerHeader !== "undefined") {
    // Split at the space
    const bearer = bearerHeader.split(" ");
    // Get token from array
    const bearerToken = bearer[1];
    // Set the token
    req.token = bearerToken;
    // Next middleware
    next();
  } else {
    // Forbidden
    res.sendStatus(403);
  }
}

module.exports = orderItemsRouter;
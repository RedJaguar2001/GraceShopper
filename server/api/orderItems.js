const express = require("express");
const orderItemsRouter = express.Router();
const { verifyToken } = require("./utils");
const { promisifiedVerify } = require("../db/users");
const {
  getActiveCartByUserId,
  getProductQuantity,
  getCartProductsQuantity,
  createOrUpdateCartProduct,
  deleteOrderItem,
} = require("../db");

orderItemsRouter.use((req, res, next) => {
  console.log("A request is being made to /orderItems");
  next();
});

// This route creates an upsert vs insert. Meaning we could potentially update an existing cart_product or create a new one. Must be careful not to insert duplicate cart_product on the front end.
orderItemsRouter.post("/", verifyToken, async (req, res, next) => {
  const { productId, quantity } = req.body;
  const id = req.id;
  const productQuantity = await getProductQuantity(productId);
  if (productQuantity === null) {
    throw new Error("Product not found.");
  }

  //cannot add negative items. When creating cart can only add not subtract
  let quantityToPurchase = quantity > 0 ? quantity : 0;
  if (productQuantity < quantityToPurchase) {
    quantityToPurchase = productQuantity;
  }

  const cart = await getActiveCartByUserId(id);
  const cartProduct = await createOrUpdateCartProduct(
    cart.id,
    productId,
    quantityToPurchase
  );

  res.json(cartProduct);
});

orderItemsRouter.put("/:orderItemId", verifyToken, async (req, res, next) => {
  const { orderItemId } = req.params;
  const { quantity } = req.body;
  const id = req.id;

  const productQuantity = await getProductQuantity(orderItemId);
  if (productQuantity === null) {
    throw new Error("Product not found.");
  }

  const cart = await getActiveCartByUserId(id);
  const cartQuantity = await getCartProductsQuantity(orderItemId, cart.id);

  let quantityToUpdate = quantity;

  //if there was an easier way to do this please let me know. My nose is bleeding...
  if (productQuantity - quantityToUpdate <= 0 && quantityToUpdate > 0) {
    quantityToUpdate = productQuantity;
  }

  // thought - if(below if statement: deleteCartProduct() since it would be 0) Else(createOrUpdateCartProduct)

  // if (cartQuantity + quantityToUpdate <= 0 && quantityToUpdate < 0) {
  //   quantityToUpdate = -cartQuantity;
  // }

  // const cartProduct = await createOrUpdateCartProduct(
  //   cart.id,
  //   orderItemId,
  //   quantityToUpdate
  // );

  // res.json(cartProduct);

  if (cartQuantity + quantityToUpdate <= 0 && quantityToUpdate < 0) {
    const newProductQuantity = productQuantity + cartQuantity;
    const itemDeleted = await deleteOrderItem(
      orderItemId,
      cart.id,
      newProductQuantity
    );

    if (itemDeleted) {
      res.json({
        message: "Item successfully deleted.",
      });
    } else {
      res.json({
        message: "No item to delete.",
      });
    }
  } else {
    const cartProduct = await createOrUpdateCartProduct(
      cart.id,
      orderItemId,
      quantityToUpdate
    );
  
    res.json(cartProduct);
  }

});

orderItemsRouter.delete(
  "/:orderItemId",
  verifyToken,
  async (req, res, next) => {
    const { orderItemId } = req.params;
    const id = req.id;

    const productQuantity = await getProductQuantity(orderItemId);
    if (productQuantity === null) {
      throw new Error("Product not found.");
    }

    const cart = await getActiveCartByUserId(id);
    const cartQuantity = await getCartProductsQuantity(orderItemId, cart.id);
    const newProductQuantity = productQuantity + cartQuantity;
    const itemDeleted = await deleteOrderItem(
      orderItemId,
      cart.id,
      newProductQuantity
    );

    if (itemDeleted) {
      //successful - No content
      res.sendStatus(204);
    } else {
      //Not Found
      res.sendStatus(404);
    }
  }
);

module.exports = orderItemsRouter;

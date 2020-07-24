const express = require("express");
const orderItemsRouter = express.Router();
const { verifyToken } = require("./utils");
const {
  getActiveCartByUserId,
  getProductQuantity,
  getCartProductsQuantity,
  createOrUpdateCartProduct,
  deleteOrderItem,
  getProductIdForOrderItem
} = require("../db");

orderItemsRouter.use((req, res, next) => {
  console.log("A request is being made to /orderItems");
  next();
});

// This route creates an upsert vs insert. Meaning we could potentially update an existing cart_product or create a new one. Must be careful not to insert duplicate cart_product on the front end.
orderItemsRouter.post("/", verifyToken, async (req, res, next) => {
  const { productId, quantity } = req.body;
  const { id } = req.id;
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
  const { id } = req.id;

  const productId = await getProductIdForOrderItem(orderItemId);
  console.log(productId);

  const productInventory = await getProductQuantity(productId);
  if (productInventory === null) {
    throw new Error("Product not found.");
  }

  let quantityToUpdate = quantity;
  const cart = await getActiveCartByUserId(id);
  const cartQuantity = await getCartProductsQuantity(productId, cart.id);

  if (quantityToUpdate <= 0) {
    const newProductQuantity = productInventory + cartQuantity;
    const itemDeleted = await deleteOrderItem(
      productId,
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
    return;
  }

  console.log("cartqty", cartQuantity);

  if (
    quantityToUpdate > cartQuantity &&
    productInventory - (quantityToUpdate - cartQuantity) < 0
  ) {
    quantityToUpdate = productInventory;
  }
  console.log("qtyToUpdate", quantityToUpdate);

  const cartProduct = await createOrUpdateCartProduct(
    cart.id,
    productId,
    quantityToUpdate
  );

  res.json(cartProduct);
});

orderItemsRouter.delete(
  "/:orderItemId",
  verifyToken,
  async (req, res, next) => {
    const { orderItemId } = req.params;
    const { id } = req.id;

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

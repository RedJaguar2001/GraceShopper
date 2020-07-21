const express = require("express");
const ordersRouter = express.Router();
const { verifyToken } = require("./utils");
const {
  createCart,
  getAllCarts,
  deleteCart,
  updateCart,
  getCartById,
  getActiveCartByUserId,
  getOrderHistoryByUserId,
  isCartEmpty,
} = require("../db");

ordersRouter.use((req, res, next) => {
  console.log("A request is being made to /orders");
  next();
});

ordersRouter.get("/", async (req, res, next) => {
  const orders = await getAllCarts();
  res.send({ orders });
});

ordersRouter.get("/history", verifyToken, async (req, res, next) => {
  const { id } = req.id;
  const orders = await getOrderHistoryByUserId(id);
  // console.log('Your orders: ', orders);
  if (orders !== null) {
    res.json(orders);
  } else {
    res.json([]);
  }
});

ordersRouter.patch("/:ordersId", async (req, res, next) => {
  const { orderId } = req.params;
  const { productId, price, quantity } = req.body;
  const updateFields = {};

  if (productId) {
    updateFields.productId = productId;
  }

  if (price) {
    updateFields.price = price;
  }

  if (quantity) {
    updateFields.quantity = quantity;
  }

  try {
    const cart = await getOrderById(orderId);

    if (cart) {
      const updatedOrder = await updateOrder(orderId, updateFields);
      res.send({ order: updatedOrder });
    } else {
      next({
        name: "UpdateOrderError",
        description: "Error updating Order",
      });
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
});

ordersRouter.delete("/:id"),
  async (req, res, next) => {
    const { id } = req.params;
    try {
      const deletedOrder = await deletedOrder(id);
      res.send({
        message: `deleting order ${deletedOrder ? "succesful" : "failed"}`,
        status: deletedOrder,
      });
    } catch (error) {
      next(error);
    }
  };

ordersRouter.post("/checkout", verifyToken, async (req, res, next) => {
  try {
    const activeCart = await getActiveCartByUserId(req.id);

    if (await isCartEmpty(activeCart.id)) {
      return res.status(400).json({
        error: "Cannot checkout empty cart",
      });
    }

    await updateCart(activeCart.id, { checked_out: true });

    res.sendStatus(200);
  } catch (error) {
    next(error);
  }
});
module.exports = ordersRouter;

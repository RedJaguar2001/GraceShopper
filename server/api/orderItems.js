const express = require("express");
const orderItemsRouter = express();
const { promisifiedVerify } = require("../db/users");
const {
  createCart,
  deleteCart,
  updateCart,
  getCartById,
} = require("../db/orders");

// POST "api/orderItems" : Adding an item to a cart.
// Body: { productId, quantity }
// Create an active cart for the user if one doesn't already exist. Make sure that there is a sufficient quantity of the product to meet the purchase request. Create a new order item, or update the quantity if an order item exists for that cart and product. Make sure to update the quantity of the product (decrement). You can expect an authorization header with a token for the user whose cart this is.
orderItemsRouter.post("/", verifyToken, async (req, res, next) => {
    const { productId, quantity } = req.body;
    const token = req.token;
});

// PUT "api/orderItems/:orderItemId" : Updating the quantity of a users order item.
// Body: { quantity }
// If increasing the quantity, make sure stock is available first. If there isn't, increase as much as is available. Make sure to decrease the stock. If decreasing the purchased quantity, increase the quantity of the product. You can expect an authorization header with a token for the user whose cart this is. Make sure the ordered item exists for that user first. Make sure item belongs to active cart.
orderItemsRouter.put("/:orderItemId", verifyToken, async (req, res, next) => {
    const { orderItemId } = req.params;
    const { quantity } = req.body;
    const token = req.token;

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

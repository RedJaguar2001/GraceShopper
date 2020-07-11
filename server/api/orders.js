const express = require('express')
const server = express()
const port = 3000
const { createCart,
  getAllCarts,
  deleteCart,
  updateCart,
  getCartById,
} = require('../db/orders');

server.use((req, res, next) =>{
  console.log('A request is being made to /orders');
  next();
});

server.get('/', async (req, res, next)=> {
  const orders = await getAllCarts();
  res.send({ orders });
});

server.patch('/:ordersId', async (req, rest, next) => {
  const { orderId } = req.params;
  const {productId,price, quantity } = req.body
  const updateFields = {};

  if (productId){
    updateFields.productId = productId;
  }

  if (price){
    updateFields.price = price;
  }

  if (quantity){
    updateFields.quantity = quantity;
  }

  try {
    //THIS NEEDS INFO
  } catch (error) {
    console.error(error);
    throw error;
  }


})


module.exports = server;

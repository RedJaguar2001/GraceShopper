const express = require('express')
const server = express.Router()
const { createCart,
  getAllCarts,
  deleteCart,
  updateCart,
  getCartById,
  getActiveCartByUserId
} = require('../db/orders');

server.use((req, res, next) =>{
  console.log('A request is being made to /orders');
  next();
});

server.get('/', async (req, res, next)=> {
  const orders = await getAllCarts();
  res.send({ orders });
});

server.patch('/:ordersId', async (req, res, next) => {
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
    const cart = await getOrderById(orderId);

    if(cart) {
      const updatedOrder = await updateOrder(orderId, updateFields);
      res.send({order: updatedOrder});
    } else {
      next({
        name: 'UpdateOrderError',
        desription: 'Error updating Order',
      })
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
});

server.delete('/:id'), async (req, res, next) => {
  const { id } = req.params;
  try{
    const deletedOrder = await deletedOrder(id);
    res.send({
      message: `deleting order ${deletedOrder ? 'succesful' : 'failed'}`,
      status: deletedOrder
    })
  } catch (error) {
    next(error)
  }
}

server.post("/checkout"), async(req, res, next) => {
 try{
const activeCart = await getActiveCartByUserId(id);



 }



}
module.exports = server;

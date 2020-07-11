const express = require('express')
const server = express.Router()
const port = 3000
const { createCart,
  getAllCarts,
  deleteCart,
  updateCart,
  getCartById,
} = require('../db/orders');



server.get('/', (req, res, next)=> {
  console.log('Inside Orders Router GET/');
  res.send({
    mesage: "You successfully reached orders GET/"
  })
})


module.exports = server;


// require('dotenv').config();

const express = require('express');
const apiRouter = express.Router();

apiRouter.get('/', async(req, res, next) => {
    res.send({message: "You've reached /api"});
    
    next();
})


const productsRouter = require('./products');
apiRouter.use('/products', productsRouter);

apiRouter.use((error, req, res, next) => {
    res.send(error);
}) 

const userRouter = require('./user');
apiRouter.use('/', userRouter);

module.exports = apiRouter;
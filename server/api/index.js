// require('dotenv').config();

const express = require('express');
const apiRouter = express.Router();

apiRouter.get('/', async(req, res, next) => {
    res.send({message: "You've reached /api"});
    
    next();
})

apiRouter.use((error, req, res, next) => {
    res.send(error);
}) 

const productsRouter = require('./products');
apiRouter.use('/products', productsRouter);

const userRouter = require('./user');
apiRouter.use('/', userRouter);

const categoryRouter = require('./categories');
apiRouter.use('/category', categoryRouter);

const reviewRouter = require('./reviews');
apiRouter.use('/review', reviewRouter);

module.exports = apiRouter;
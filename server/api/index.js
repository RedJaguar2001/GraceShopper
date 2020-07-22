// require('dotenv').config();

const express = require('express');
const apiRouter = express.Router();

apiRouter.get('/', async(req, res, next) => {
    res.send({message: "You've reached /api"});

    next();
});

const productsRouter = require('./products');
apiRouter.use('/products', productsRouter);

const userRouter = require('./user');
apiRouter.use('/users', userRouter);

const categoryRouter = require('./categories');
apiRouter.use('/categories', categoryRouter);

const reviewRouter = require('./reviews');
apiRouter.use('/reviews', reviewRouter);

const imagesRouter = require('./images');
apiRouter.use('/images', imagesRouter);

const orderItemsRouter = require('./orderItems');
apiRouter.use('/orderItems', orderItemsRouter);

const ordersRouter = require('./orders');
apiRouter.use('/orders', ordersRouter);


apiRouter.use((error, req, res, next) => {
    res.send(error);
});

module.exports = apiRouter;

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
apiRouter.use('/user', userRouter);

const categoryRouter = require('./categories');
apiRouter.use('/categories', categoryRouter);

const reviewRouter = require('./reviews');
apiRouter.use('/reviews', reviewRouter);

const imagesRouter = require('./images');
apiRouter.use('/images', imagesRouter);

module.exports = apiRouter;
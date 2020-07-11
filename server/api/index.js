// require('dotenv').config();

const express = require('express');
const apiRouter = express.Router();

apiRouter.get('/', async(req, res, next) => {
    res.send({message: "You've reached /api"});
    
    next();
})


const productsRouter = require('./products');
apiRouter.use('/products', productsRouter);

const userRoute = require('./user');
apiRouter.use('/users', userRoute);

apiRouter.use((error, req, res, next) => {
    res.send(error);
}) 


module.exports = apiRouter;
require('dotenv').config();

const express = require('express');
const apiRouter = express.Router();

apiRouter.get('/', async(req, res, next) => {
    res.send({message: "You've reached /api"});
    
    next();
})

const userRouter = require('./user');
apiRouter.use('/user', userRouter);

module.exports = apiRouter;
const express = require('express');
const reviewsRouter = express.Router();
const {getAllReviews, getReviewById, getReviewsByUserId, createReview, updateReview} = require('../db');

const bodyParser = require('body-parser');
reviewsRouter.use(bodyParser.json());

reviewsRouter.use((req, res, next) => {
    console.log('A request is being made to /reviews');

    next();
});

reviewsRouter.get('/', async(req, res, next) => {
    try {
        const reviews = await getAllReviews();

        res.send({
            message: 'successfully retrieved all reviews',
            data: reviews,
            status: true
        })
    } catch (error) {
        next(error);
    }
});

module.exports = reviewsRouter;
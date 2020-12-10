const express = require('express');
const reviewsRouter = express.Router();

const { getAllProductReviews } = require('../db/reviews');



/* ------------------------------------------------------------ */
/* THIS IS THE GET/reviews ROUTER */

reviewsRouter.get('/', async (req, res, next ) => {
    try {
        const reviews = await getAllProductReviews();
        console.log('Here are the reviews:', reviews)
        res.send(reviews);
        return reviews;

    } catch (error) {
        next(error)
    }
} )


/* ------------------------------------------------------------ */
/* THIS IS THE POST /reviews ROUTER TO MAKE NEW REVIEWS */
/* productsRouter.post('/', async (req, res, next) => {
    try {     
            const creatingProduct = await createProduct({...req.body});
            res.send(creatingProduct); 
    } catch (error) {
        next(error);
    }
  }); */



module.exports = reviewsRouter;
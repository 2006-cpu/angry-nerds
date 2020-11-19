const express = require('express');
const productsRouter = express.Router();

const {
    getAllProducts,
    getProductById,
    createProduct
} = require('../db/products')

/* ------------------------------------------------------------ */
/* THIS IS THE GET/products ROUTER */

    productsRouter.get('/', async (req, res, next ) => {
        try {
            const products = await getAllProducts();
            res.send(products);
            return products;

        } catch (error) {
            next(error)
        }
    } )


/* ------------------------------------------------------------ */
/* THIS IS THE GET/product/:productId ROUTER */

    /* looks up product by id and sends back */
    productsRouter.get('/product/:productId', async ( req, res, next ) => {
        const { productId } = req.params;
        try {
            const productById = await getProductById({productId} );
            res.send(productById);

        } catch(error) {
            next(error);
        }
    });
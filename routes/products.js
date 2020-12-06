const express = require('express');
const productsRouter = express.Router();

const {
    getAllProducts,
    getProductById,
    getProductsByCategory,
    createProduct,
} = require('../db/products')

const {
    getUserById
} = require('../db/users');

const {
    destroyProduct
} = require('../db/admin');

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
    productsRouter.get('/:productId', async ( req, res, next ) => {
        const { productId } = req.params;
        try {
            const productById = await getProductById(productId);
            res.send(productById);

        } catch(error) {
            next(error);
        }
    });


/* ------------------------------------------------------------ */
/* THIS IS THE GET/product/:category ROUTER */

    /* looks up product by category and sends back */
    productsRouter.get('/:category', async ( req, res, next ) => {
        const { category } = req.params;
        try {
            console.log('this is the params ', category)
            const productById = await getProductsByCategory({category});
            res.send(productById);

        } catch(error) {
            next(error);
        }
    });

/* ------------------------------------------------------------ */
/* THIS IS THE GET /products/:productId/orders ROUTER for Admins */

productsRouter.get('/:productId/orders', async (req,res,next) => {
    try {
      const {productId} = req.params;
      const prefix = 'Bearer ';
      const auth = req.header('Authorization');
      if (auth.startsWith(prefix)) {
      const token = auth.slice(prefix.length);
      if (token){
      const { id } = jwt.verify(token, JWT_SECRET);
      const user = await getUserById(id);
        if (id && user.isAdmin===true) {
          const orders = await getOrdersByProduct({id})
          res.send(orders)
        } else {
          res.send({message:'You must be an admin to view these orders'})
          }
      }
    }
    } catch (error) {
      console.log(error);
      next(error);
    }
});

/* ------------------------------------------------------------ */
/* THIS IS THE DELETE/products/:productId ROUTER for admins only */
productsRouter.delete('/:productId', async (req,res,next) => {
    try {
      const productById = await getProductById(productId)
      const {productId} = req.params;
      const prefix = 'Bearer ';
      const auth = req.header('Authorization');
      if (auth.startsWith(prefix)) {
      const token = auth.slice(prefix.length);
      if (token){
      const { id } = jwt.verify(token, JWT_SECRET);
      const user = await getUserById(id);
        if (id && user.isAdmin===true) {
          const deletedProduct = await destroyProduct({id})
          res.send(deletedProduct)
        } else {
          res.send({message:'Only admins can delete products'})
          }
      }
    }
    } catch (error) {
      console.log(error);
      next(error);
    }
});

module.exports = productsRouter;

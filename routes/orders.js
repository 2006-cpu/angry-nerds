const express = require('express');
const ordersRouter = express.Router();

const { requireAdmin, requireUser } = require("./utils");

const {
    getAllOrders,
    getCartByUser,
    createOrder,
    getOrdersByUser
} = require('../db/orders');
const { addProductToOrder } = require('../db/order_products');

//fix requireAdmin
    ordersRouter.get('/', async (req, res, next ) => {
        try {
            const orders = await getAllOrders();
            res.send(orders);
            // return orders;

        } catch (error) {
            next(error)
        }
    } )


    ordersRouter.get('/cart', async ( req, res, next ) => {
        // const { userId } = req.params;
        //getCartByUser(req.user.id)
        try {
            const cart = await getCartByUser(1);
            console.log("user req", req.user)
            res.send(cart);

        } catch(error) {
            next(error);
        }
    });

    //fix requireUser
    ordersRouter.post('/', async (req, res, next ) => {
        const { status, userId, datePlaced } = req.body;
        try {
            const newOrder = await createOrder({status, userId, datePlaced});
            res.send(newOrder);

        } catch (error) {
            next(error)
        }
    } )

    //fix requireUser
    ordersRouter.post('/:orderId/products', async (req, res, next ) => {
        const { orderId } = req.params
        const { productId, price, quantity } = req.body;
        try {
            const newOrderProduct = await addProductToOrder({orderId, productId, price, quantity});
            res.send(newOrderProduct);

        } catch (error) {
            next(error)
        }
    } )


module.exports = ordersRouter;

const express = require('express');
const ordersRouter = express.Router();

const { requireAdmin, requireUser } = require("./utils");

const {
    getAllOrders,
    getCartByUser,
    createOrder,
    getOrdersByUser
} = require('../db/orders')

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
        const { userId } = req.params;
        try {
            const cart = await getCartByUser(userId);
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
            // return newOrder;

        } catch (error) {
            next(error)
        }
    } )

    ordersRouter.get('/users/:userId/orders', async (req, res, next ) => {
        const { userId } = req.params;
        try {
            const orders = await getOrdersByUser(userId);
            res.send(orders)
            // if(req.user.id === userId){
            //     res.send(orders);
            // }

        } catch (error) {
            next(error)
        }
    } )

module.exports = ordersRouter;

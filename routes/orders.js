const express = require('express');
const ordersRouter = express.Router();

const { requireAdmin, requireUser } = require("./utils");

const {
    getAllOrders,
    getCartByUser,
    createOrder,
    getOrdersByUser
} = require('../db/orders')

    ordersRouter.get('/', requireAdmin, async (req, res, next ) => {
        try {
            const orders = await getAllOrders();
            res.send(orders);
            return orders;

        } catch (error) {
            next(error)
        }
    } )


    ordersRouter.get('/cart', requireUser, async ( req, res, next ) => {
        const { userId } = req.params;
        try {
            const data = await getCartByUser(userId);
            res.send(data);

        } catch(error) {
            next(error);
        }
    });

    ordersRouter.post('/', requireUser, async (req, res, next ) => {
        const { status, userId } = req.params;
        try {
            const newOrder = await createOrder(status, userId);
            res.send(newOrder);
            return orders;

        } catch (error) {
            next(error)
        }
    } )

    ordersRouter.get('/users/:userId/orders', requireUser, async (req, res, next ) => {
        const { username } = req.params;
        try {
            const orders = await getOrdersByUser();
            
            if(username === userId){
                res.send(orders);
            }

        } catch (error) {
            next(error)
        }
    } )

module.exports = ordersRouter;

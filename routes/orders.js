const express = require('express');
const ordersRouter = express.Router();

const { requireAdmin, requireUser } = require('./utils');

const {
    getAllOrders,
    getCartByUser,
    createOrder,
    getOrderById,
    updateOrder,
    completeOrder,
    cancelOrder,
    // getOrdersByUser
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
            // return newOrder;

        } catch (error) {
            next(error)
        }
    } )


//=====PATCH /orders/:orderId (**):Update an order, notably change status
    ordersRouter.patch('/orders:orderId', requireUser, async (req, res, next) => {
        const {getOrderById} = req.params;
        const {id, status, userId} = req.body;

        try{
            const updateOrder = await completeOrder({status, id});
            if(req.user.id !== userId){
                res.send({
                    name: "UnauthorizedUserError",
                    message: "You are not allowed to update the status of the order until you signed in."
                })
            }else {
                const updatedStatus = await updateOrder(status)
                    res.send(updatedStatus)
            }
        } catch({name, message}){
            next({
                name:"updatedOrderMessage",
                message:"Great News! Your order status has been updated!"
            })}
        })


//=====DELETE /orders/:orderId (**):Update the order's status to cancelled
    ordersRouter.delete('/orders/:orderId', requireUser, async (req, res, next) => {
        const {getOrderById} = req.params;

        try{
            const order = await getOrderById(id);

            if(order && order.userId !== req.userId){
                req.send({
                    name: "UnauthorizedUserError",
                    message: "You are not allowed to update the status of the order until you signed in."
                })
            } else {
                const deletedOrder = await cancelOrder(orderId)
                res.send(deletedOrder)
            }
        } catch (error){
            next (error)
        }
    })


module.exports = ordersRouter;

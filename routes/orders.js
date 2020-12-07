const express = require('express');
const ordersRouter = express.Router();

const { requireAdmin, requireUser } = require('./utils');

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


//=====PATCH /orders/:orderId (**):Update an order, notably change status
    ordersRouter.patch('/:orderId', requireUser, async (req, res, next) => {
        const {getOrderById} = req.params;
        const {id, status} = req.body;

        try{
            
            const order = await getOrderById(id);
            if(order && order.user.id !== req.user.id){
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
    ordersRouter.delete('/:orderId', requireUser, async (req, res, next) => {
        const {getOrderById} = req.params;
        const {id, status} = req.body;

        try{
            const order = await getOrderById(id);
            
            if(order && order.user.id !== req.user.id){
                req.send({
                    name: "UnauthorizedUserError",
                    message: "You are not allowed to update the status of the order until you signed in."
                })
            } else {
                const deletedOrder = await cancelOrder(status)
                res.send(deletedOrder)
            }
        } catch (error){
            next (error)
        }
    })


module.exports = ordersRouter;
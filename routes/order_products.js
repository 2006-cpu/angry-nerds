const express = require('express');
const opRouter = express.Router();

const { requireUser } = require("./utils");

const {
    updateOrderProduct,
    destroyOrderProduct
} = require('../db/order_products');

const { getOrderById } = require('../db/orders');

opRouter.patch('/order_products/:orderProductId', requireUser, async ( req, res, next ) => {
    try {
        const { orderProductId: id } = req.params;
        
        const orderProduct = await getOrderProductById(id);
        const order = await getOrderById(orderProduct.orderId)
        
        if(order.userId === req.user.id) {
            const {quantity, price} = req.body;
            const updatedOP = await updateOrderProduct({id, quantity, price})
            res.send(updatedOP);
        } else {
            next({
                message:
                    "user must also be owner"
            })
        }

    } catch(error) {
        next(error);
    }
});

opRouter.delete('/order_products/:orderProductId', requireUser, async ( req, res, next ) => {
    try {
        const { orderProductId: id } = req.params;
        
        const orderProduct = await getOrderProductById(id);
        const order = await getOrderById(orderProduct.orderId)
        
        if(order.userId === req.user.id) {
            const deletedOP = await destroyOrderProduct(id)
            res.send(deletedOP);
        } else {
            next({
                message:
                    "user must also be owner"
            })
        }

    } catch(error) {
        next(error);
    }
});

module.exports = opRouter;
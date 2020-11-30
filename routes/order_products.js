const express = require('express');
const opRouter = express.Router();

const { requireUser } = require("./utils");

const {
    updateOrderProduct,
    destroyOrderProduct
} = require('../db/order_products');

const { getOrderById } = require('../db/orders');

opRouter.patch('/:orderProductId', async ( req, res, next ) => {
    try {
        const { orderProductId } = req.params;
        
        const orderProduct = await getOrderProductById(orderProductId);
        const order = await getOrderById(orderProduct.orderId)
        
        const {id, quantity, price} = req.body;
        const updatedOP = await updateOrderProduct({id: orderProductId, quantity, price})
       
        if(order.userId !== req.user.id) {
            next({
                message:
                    "user must also be owner"
            })
        } else {
            res.send(updatedOP);
        }

    } catch(error) {
        next(error);
    }
});

opRouter.delete('/:orderProductId', requireUser, async ( req, res, next ) => {
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
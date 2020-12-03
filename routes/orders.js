const express = require('express');
const ordersRouter = express.Router();

const { requireAdmin, requireUser } = require("./utils");
const {JWT_SECRET} = process.env
const jwt = require('jsonwebtoken');

const {
    getAllOrders,
    getCartByUser,
    createOrder,
    getOrdersByUser
} = require('../db/orders');
const { addProductToOrder } = require('../db/order_products');
const { getUserById } = require('../db/users');




ordersRouter.use(async (req, res, next) => {
    const prefix = 'Bearer ';
    const auth = req.header('Authorization');
  
    if (!auth) {
        next();
    } else if (auth.startsWith(prefix)) {
        const token = auth.slice(prefix.length);
  
        try {
            const { id } = jwt.verify(token, JWT_SECRET);
    
            if (id) {
                req.user = await getUserById(id);
                next();
            }
        } catch ({ name, message }) {
            next({ name, message });
        }
    } else {
      next({
        name: 'AuthorizationHeaderError',
        message: `Authorization token must start with ${ prefix }`
        });
    }
  
  });
  
  ordersRouter.use((req, res, next) => {
    if(req.user) {
        console.log("User is set:", req.user)
    }
    next();
  })


//fix requireAdmin
    ordersRouter.get('/', async (req, res, next ) => {
        try {
            const orders = await getAllOrders();
            res.send(orders);

        } catch (error) {
            next(error)
        }
    } )


    ordersRouter.get('/cart', requireUser, async ( req, res, next ) => {
        // const { userId } = req.user;
        //getCartByUser(req.user.id)
        // console.log('requser', req.user)
        try {
            const cart = await getCartByUser(req.user.id);
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

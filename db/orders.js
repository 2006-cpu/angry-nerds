const {client} = require("./index")

/* THIS IS FOR THE getAllOrders ADAPTER */

    async function getAllOrders() {
        try {
            const { rows } = await client.query(`
                SELECT * FROM orders;
            `)
            return rows;
        } catch (error) {
            throw error
        }
    }

/* THIS IS FOR THE getOrderById ADAPTER */

    async function getOrderById(id) {
        try {
            const { rows: [ order ] } = await client.query(`
            SELECT * FROM orders
            Where id = $1;
            `, [id])
            return order;
        } catch (error) {
            throw error;
        }
    }
   
/* THIS IS FOR THE getOrdersByUser ADAPTER */

    async function getOrdersByUser({ username }) {
        try {
            const { rows: order }  = await client.query(`
            SELECT orders.*, users.id
            AS "userId"
            JOIN users ON users.id = orders."userId"
            WHERE users.id = $1
            `, [username]);

            return order;
        } catch (error) {
            throw error;
        }
    }

/* THIS IS FOR THE getOrdersByProductId ADAPTER */
    async function getOrdersByProductId({ id }) {
        try {
            const { rows: order } = await client.query(`
            SELECT orders.*
            FROM orders
            JOIN order_products ON
            order_products."orderId" = 
            orders.id
            WHERE order_products."productId" = $1
            `, [ id ])

            return order;

        } catch (error) {
            throw error;
        }
    }

/* THIS IS FOR THE getCartByUser ADAPTER */
    async function getCartByUser({id}) {
        try {
            const { rows: [ order ] } = await
            client.query(`
            SELECT orders.*
            WHERE orders.status = "created"
            WHERE order."userId" = $1
            `, [ id ])

            return order;
        } catch (error) {
            throw error;
        }
    }

/* THIS IS FOR THE createOrder ADAPTER */
    async function createOrder({ status, userId }) {
        try {
            const { rows: [ order ] } = await client.query(`
                INSERT INTO orders
                (status, "userId")
                VALUES($1, $2)
                RETURNING *;
            `, [status, userId]);

            return order;
        } catch (error) {
            throw error;
        }
    }

module.exports = {
    getOrderById,
    getAllOrders,
    getOrdersByUser,
    getOrdersByProductId,
    getCartByUser,
    createOrder
}


const {client} = require("./index")

/* THIS IS FOR THE getAllOrders ADAPTER */

    async function getAllOrders() {
        try {
            const { rows } = await client.query(`
                SELECT * FROM orders
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
            Where id = $1
            `, [id])
            return order;
        } catch (error) {
            throw error;
        }
    }
   
/* THIS IS FOR THE getOrdersByUser ADAPTER */

    async function getOrdersByUser({ id }) {
        try {
            const { rows: order }  = await client.query(`
            SELECT orders.*, users.id
            AS "userId"
            JOIN users ON users.id = orders."userId"
            WHERE users.id = $1
            `, [id]);

            return order;
        } catch (error) {
            throw error;
        }
    }

    /* THIS IS FOR THE createOrder ADAPTER */
    async function createOrder({ status, userId, datePlaced }) {
        try {
            const { rows: [ order ] } = await client.query(`
                INSERT INTO orders
                (status, "userId", "datePlaced")
                VALUES($1, $2, $3)
                RETURNING *
            `, [status, userId, datePlaced]);

            return order;
        } catch (error) {
            throw error;
        }
    }

module.exports = {
    getOrderById,
    getAllOrders,
    getOrdersByUser,
    createOrder
}


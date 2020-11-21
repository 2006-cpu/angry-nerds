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


module.exports = {
    getOrderById,
    getAllOrders,
    getOrdersByUser
}


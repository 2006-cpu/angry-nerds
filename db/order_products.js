const {client} = require("./index")

/* THIS IS FOR THE getOrderProductById ADAPTER */

    async function getOrderProductById(id) {
        try {
            const { rows: [ orderProduct ] } = await client.query(`
            SELECT * FROM order_products
            WHERE id = $1;
            `, [ id ])
            return orderProduct;
        } catch (error) {
            throw error
        }
    }


/* THIS IS FOR THE addProductToOrder ADAPTER */

    async function addProductToOrder({ orderId, productId, price, quantity }) {
        try {
            const { rows } = await client.query(`
                
            `)
            return rows;
        } catch (error) {
            throw error
        }
    }


/* THIS IS FOR THE updateOrderProduct ADAPTER */
    async function updateOrderProduct({ id, price, quantity }) {
        try {
            const { rows } = await client.query(`
                
            `)
            return rows;
        } catch (error) {
            throw error
        }
    }


/* THIS IS FOR THE destroyOrderProduct ADAPTER */

    async function destroyOrderProduct(id) {
        try {
            const { rows: [ orderProduct ] } = await client.query(`
            DELETE FROM order_products WHERE id = $1
            RETURNING *;
            `, [ id ] );

            return orderProduct;
        } catch (error) {
            throw error
        }
    }


module.exports = {
    getOrderProductById,
    addProductToOrder,
    updateOrderProduct,
    destroyOrderProduct
}

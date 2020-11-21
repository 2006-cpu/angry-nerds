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

    /* async function getOrdersByUser({ username }) {
        try {
            const { rows: order }  = await client.query(`
            SELECT 
            
            `)
        } catch (error) {
            throw error;
        }
    }
 */



/* async function getAllProducts() {
    try{
        const { rows } = await client.query(`
            SELECT *
            FROM products
        `)

        return rows;
    } catch (error) {
        throw error;
    }
}

async function getProductById(id) {
    try{
        const { rows: [product] } = await client.query(`
            SELECT *
            FROM products
            WHERE id=$1
        `, [id]);

        return product;
    } catch (error) {
        throw error;
    }
}

async function createProduct(product) {
    const {name, description, price, inStock, imageURL, category} = product;
    try{
        const { rows: [product] } = await client.query(`
            INSERT INTO products(name, description, price, inStock, imageURL, category)
            VALUES($1, $2, $3, $4, $5, $6)
            RETURNING *
        `, [name, description, price, inStock, imageURL, category]);

        return product;
    } catch (error) {
        throw error;
    }
} */

module.exports = {
    getOrderById,
    getAllOrders,
    getOrdersByUser
}


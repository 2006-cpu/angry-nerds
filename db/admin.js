const {client} = require("./index")
const { getOrderById } = require('../db/orders');

/* THIS IS FOR THE updateProduct ADAPTER */
/* async function updateProduct(product) {
    const {name, description, price, inStock, imageURL, category} = product;

    try {
        const { rows: [product] } = await client.query(`
            UPDATE products
            SET name = $2, description = $3, price = $4, inStock = $5, imageURL = $6, category = $7
            WHERE id = $1
            RETURNING *;
        `, [name, description, price, inStock, imageURL, category])

        return product;
    } catch (error) {
        throw error;
    }
} */

/* THIS IS FOR THE destroyProduct ADAPTER */
async function destroyProduct({id}) {
    try {
        const order = await getOrderById(id);
        if(order.status === 
            'completed'){
                console.log("The order has a status of completed")
                return;
            }
        await client.query(`
        DELETE from order_products
        WHERE "productId"=$1
        RETURNING *;
        `, [id]);

        const { rows: [product] } = await client.query (`
        DELETE from products
        WHERE id=$1
        RETURNING *;
        `, [id]);
        return product;
    } catch (error) {
        throw error;
    }
};

/* THIS IS FOR THE updateUser ADAPTER */
const updateUser = async ({id, ...fields})=>{
    const setString = Object.keys(fields).map(
        (key, index) => `"${ key }"=$${ index + 1}`
    ).join(', ');
    
    const objVal = Object.values(fields)
    if( setString.length === 0){
        return;
    }
    
    objVal.push(id);

    try {
        const {rows: [user]} = await client.query(`
            UPDATE users
            SET ${setString}
            WHERE id = $${objVal.length}
            RETURNING *;
        `, objVal);
        return user;
    } catch (error) {
        throw error;
    }
};

module.exports = {
    destroyProduct,
    updateUser
}
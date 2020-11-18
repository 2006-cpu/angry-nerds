// code to build and initialize DB goes here
const {
  client
  // other db methods 
} = require('./index');

async function dropTables() {
  console.log('Dropping All Tables...');

  try {
    client.query(`
    DROP TABLE IF EXISTS orders;
    DROP TABLE IF EXISTS order__products;
    DROP TABLE IF EXISTS users;
    DROP TABLE IF EXISTS products;
    `)
  } catch(error) {
    console.log('Error Dropping Tables');
  }
}

async function buildTables() {
  console.log('Starting to build tables...');

  try {
    client.connect();
    `CREATE TABLE order_products(
      id SERIAL PRIMARY KEY,
      "productId" INTEGER REFERENCES products(id),
      "orderId" INTEGER REFERENCES orders(id),
      price INTEGER NOT NULL,
      quantity INTEGER NOT NULL DEFAULT (0)

    )`

    // drop tables in correct order
    
    // build tables in correct order

  } catch (error) {
    throw error;
  }
}

async function populateInitialData() {
  try {
    // create useful starting data
  } catch (error) {
    throw error;
  }
}

buildTables()
  .then(populateInitialData)
  .catch(console.error)
  .finally(() => client.end());
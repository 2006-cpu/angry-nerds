// code to build and initialize DB goes here
const {
  client
  // other db methods 
} = require('./index');

async function buildTables() {
  try {
    client.connect();
    console.log('Dropping All Tables...');
    // drop tables in correct order

    client.query(`
      DROP TABLE IF EXISTS order_products;
      DROP TABLE IF EXISTS orders;
      DROP TABLE IF EXISTS users;
      DROP TABLE IF EXISTS products;
    `);
    console.log('Finished dropping tables!')
    // build tables in correct order
    
    console.log("Starting to build tables...")
    
    await client.query(`
      CREATE TABLE products(
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description VARCHAR(255) NOT NULL,
        price VARCHAR(255) NOT NULL,
        imageURL DEFAULT NULL,
        inStock NOT NULL DEFAULT false,
        category NOT NULL
      );

       CREATE TABLE users(
            id SERIAL PRIMARY KEY,
            firstName VARCHAR(255) NOT NULL,
            lastName VARCHAR (255) NOT NULL,
            email VARCHAR (255) UNIQUE NOT NULL,
            imageURL DEFAULT NULL,
            username VARCHAR (255) UNIQUE NOT NULL,
            password VARCHAR (255) UNIQUE NOT NULL,
            "isAdmin" BOOLEAN DEFAULT false
          );

     CREATE TABLE orders(
      id SERIAL PRIMARY KEY,
      status VARCHAR(255) DEFAULT 'created',
      "userId" INTEGER REFERENCES users(id),
      "datePlaced" TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
    );
    `);
    console.log("Finished building tables!")
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
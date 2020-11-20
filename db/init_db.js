// code to build and initialize DB goes here
const {
  client
  // other db methods 
} = require('./index');

async function dropTables() {
  console.log('Dropping All Tables...');

//drop tables in correct order
  try {
    client.query(`
    DROP TABLE IF EXISTS order_products;
    DROP TABLE IF EXISTS orders;
    DROP TABLE IF EXISTS users;
    DROP TABLE IF EXISTS products;
    `)
    console.log('finished doing stuff')
  } catch(error) {
    console.log('Error Dropping Tables');
  }
}

async function createTables() {

  try {
    //client.connect();
    //await dropTables()

    // build tables in correct order
    
    console.log("Starting to build tables...")
    
    await client.query(`
      CREATE TABLE products(
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description VARCHAR(255) NOT NULL,
        price VARCHAR(255) NOT NULL,
        imageURL VARCHAR(255) DEFAULT NULL,
        inStock BOOLEAN DEFAULT false,
        category VARCHAR(255) NOT NULL
      );
     CREATE TABLE users(
          id SERIAL PRIMARY KEY,
          firstName VARCHAR(255) NOT NULL,
          lastName VARCHAR (255) NOT NULL,
          email VARCHAR (255) UNIQUE NOT NULL,
          imageURL VARCHAR(255) DEFAULT NULL,
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
    CREATE TABLE order_products(
        id SERIAL PRIMARY KEY,
        "productId" INTEGER REFERENCES products(id),
        "orderId" INTEGER REFERENCES orders(id),
        price INTEGER NOT NULL,
        quantity INTEGER NOT NULL DEFAULT (0)
      );
    `);


    console.log("Finished building tables!")
  } catch (error) {
    console.log('error here ', error)
  }
}

async function populateInitialData() {
  try {
    // create useful starting data
    console.log('helpless func please help us')
  } catch (error) {
    throw error;
  }
}
async function buildTables(){
  try{
client.connect()
await dropTables()
await createTables()
  }catch(error){
    throw error
  }
}

buildTables()
  //.then(buildTables)
  .then(populateInitialData)
  .catch(console.error)
  .finally(() => client.end());

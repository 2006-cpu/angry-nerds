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
  } catch(error) {
    console.log('Error Dropping Tables');
  }
}

async function buildTables() {
  console.log('Starting to build tables...');

  try {
    client.connect();

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
    throw error;
  }
}


async function populateInitialData() {
  console.log('Starting to create products...');
  try {
    // creating default dummy data for products
    const productsToCreate = [
      { id: 1, name: 'Les Paul Tribute Plus', description: 'A high-end Epiphone', price: 800, inStock: true },
      { id: 2, name: 'Meris: Enzo', description: 'A synthesizer for your guitar!', price: 299, inStock: true},
      { id: 3, name: 'Gibson Custom 1965 Les Paul Standard', description: 'A solid body electric guitar', price: 500, inStock: true},
      { id: 4, name: 'Fender American Professional II', description: '3-Tone Sunburst', price: 2200, inStock: true},
      { id: 5, name: 'Fender American Professional II', description: 'Jazz Bass roasted pine', price: 2200, inStock: true},
      { id: 6, name: 'Fender American Professional II', description: '3-Tone Sunburst', price: 2200, inStock: true},
      { id: 7, name: 'Marshall Reverse Jubilee 20W Head', description: '20W 2525H has two footswitchable channels', price: 1500, inStock: true},
      { id: 8, name: 'Tone King Imperial MKII 20W 1x12 Combo Lacquered Tweed', description: 'all tube circuitry, traditional spring reverb and a highly resonant cabinet', price: 3500, inStock: true},
    ]
    const products = await Promise.all(productsToCreate.map(createProduct));
    console.log('Products Created');
    console.log(products);
  } catch (error) {
    console.error('Error creating products!!!')
    throw error;
  }
}

dropTables()
  .then(buildTables)
  .then(populateInitialData)
  .catch(console.error)
  .finally(() => client.end());

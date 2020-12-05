// code to build and initialize DB goes here
const {client} = require('./index');

const {createProduct, getAllProducts} = require('./products')
const {createUser} = require('./users')
const {createOrder, getAllOrders} = require('./orders');
// const { getAllProducts } = require('../src/api');
const {addProductToOrder} = require('./order_products')

async function dropTables() {
  console.log('Dropping All Tables...');

//drop tables in correct order
  try {
    await client.query(`
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
        imageURL VARCHAR(255) DEFAULT 'https://icon-library.com/images/no-image-available-icon/no-image-available-icon-8.jpg',
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

async function populateInitialUsers() {
  try {
    const seedUsers = [
      {firstName:'cecilia', lastName:'lam', email:'cecilia@example.com', username:'cecilia', password:'cecilia123', isAdmin: false},
      {firstName:'katiana', lastName:'CV', email:'kati-cv@example.com', username:'kati', password:'katicv123', isAdmin: true},
      {firstName:'trin', lastName:'padilla', email:'trinp@example.com', username:'trin', password:'padilla123', isAdmin: true},
      {firstName:'nicholas', lastName:'lopez', email:'nicholas@example.com', username:'nicholas', password:'nicholas123', isAdmin: true},
    ]
    const users = await Promise.all(seedUsers.map(createUser));
    console.log('users created');
    console.log(users);
  }catch(error) {
    console.error('Error populating users!!')
    throw error;
  }
}


async function populateInitialData() {
  console.log('Starting to create products...');
  try {
    // creating default dummy data for products
    const productsToCreate = [
      { name: 'Les Paul Tribute Plus', description: 'A high-end Epiphone', price: 800, inStock: true , category: 'guitar'},
      { name: 'Meris: Enzo', description: 'From Meris: Enzo is a multi-voice synthesizer that will track your guitar for tight monosynth leads, complex chord polyphony, or multi-note sequenced arpeggiation... ', price: 299, inStock: true , category: 'piano'},
      { name: 'Gibson Custom 1965 Les Paul Standard', description: 'A solid body electric guitar', price: 500, inStock: true , category: 'drums'},
      { name: 'Fender American Professional II', description: '3-Tone Sunburst', price: 2200, inStock: true , category: 'guitar'},
      { name: 'Fender American Professional II', description: 'Jazz Bass roasted pine', price: 2200, inStock: true , category: 'guitar'},
      { name: 'Fender American Professional II', description: '3-Tone Sunburst', price: 2200, inStock: true , category: 'guitar'},
      { name: 'Marshall Reverse Jubilee 20W Head', description: '20W 2525H has two footswitchable channels', price: 1500, inStock: true , category: 'drums'},
      { name: 'Tone King Imperial MKII 20W 1x12 Combo Lacquered Tweed', description: 'all tube circuitry, traditional spring reverb and a highly resonant cabinet', price: 3500, inStock: true , category: 'microphone'},
    ]
    const products = await Promise.all(productsToCreate.map(createProduct));
    console.log('Products Created');
    console.log(products);
  } catch (error) {
    console.error('Error creating products!!!')
    throw error;
  }
}

async function populateInitialOrders() {
  console.log("creating orders...")
  try {
    const seedOrders = [
      {status:'created', userId:'1', datePlaced:'2020-06-22 18:10:25-07'},
      {status:'created', userId:'2', datePlaced:'2011-06-22 10:10:25-07'},
      {status:'created', userId:'3', datePlaced:'2019-06-22 11:10:25-07'}
    ]
    const orders = await Promise.all(seedOrders.map(createOrder));
    console.log('orders created');
    console.log(orders);
  }catch(error) {
    console.error('Error populating orders!!')
    throw error;
  }
}

async function populateInitialOrderProducts() {
  try {
    console.log('starting to create order products...');
    const [order1, order2, order3] = await getAllOrders();
    const [prod1, prod2, prod3, prod4, prod5, prod6, prod7, prod8] = await getAllProducts();

    const orderProductsToCreate = [
      {
        productId: prod1.id,
        orderId: order1.id,
        price: prod1.price,
        quantity: 2
      },
      {
        productId: prod2.id,
        orderId: order1.id,
        price: prod2.price,
        quantity: 5 
      },
      {
        productId: prod3.id,
        orderId: order1.id,
        price: prod3.price,
        quantity: 1 
      },
      {
        productId: prod1.id,
        orderId: order2.id,
        price: prod1.price,
        quantity: 7 
      },
      {
        productId: prod5.id,
        orderId: order2.id,
        price: prod5.price,
        quantity: 2 
      }
    ]
    const orderProducts = await Promise.all(orderProductsToCreate.map(addProductToOrder));
    console.log('order_products created: ', orderProducts)
    console.log('Finished creating order_products!')
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
  .then(populateInitialUsers)
  .then(populateInitialData)
  .then(populateInitialOrders)
  .then(populateInitialOrderProducts)
  .catch(console.error)
  .finally(() => client.end());

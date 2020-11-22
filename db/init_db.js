// code to build and initialize DB goes here
const {client} = require('./index');

const {createProduct} = require('./products')

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


async function populateInitialData() {
  console.log('Starting to create products...');
  try {
    // creating default dummy data for products
    const productsToCreate = [
      { name: 'Les Paul Tribute Plus', description: 'A high-end Epiphone', price: 800, inStock: true , category: 'guitar'},
      { name: 'Meris: Enzo', description: 'A synthesizer for your guitar!', price: 299, inStock: true , category: 'piano'},
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

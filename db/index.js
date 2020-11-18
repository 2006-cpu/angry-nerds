// Connect to DB
const { Client } = require('pg');
const DB_NAME = 'localhost:5432/mandalore'
const DB_URL = process.env.DATABASE_URL || `postgres://${ DB_NAME }`;
const client = new Client(DB_URL);

// database methods

// export
module.exports = {
  client,
  // db methods
}

async function createTables(){
  try{
    await client.query(`
      CREATE TABLE users(
        id SERIAL PRIMARY KEY,
        firstName VARCHAR(255) NOT NULL,
        lastName VARCHAR (255) NOT NULL,
        email VARCHAR (255) UNIQUE NOT NULL,
        imageURL DEFAULT NULL,
        username VARCHAR (255) UNIQUE NOT NULL,
        password VARCHAR (255) UNIQUE NOT NULL,
        "isAdmin" BOOLEAN DEFAULT false
      )
    `);
  }catch (error){
    console.error()
    throw error;
  }
}
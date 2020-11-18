// code to build and initialize DB goes here
const {
  client
  // other db methods 
} = require('./index');

async function buildTables() {
  try {
    client.connect();

    // drop tables in correct order


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
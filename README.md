

GETTING STARTED:

npm i
createdb mandalore

Run npm run server:dev to start the web server. In a second terminal navigate back to the local repo and run npm run client:dev to start the react server. Run db:build which rebuilds the database, all the tables, and ensures that there is meaningful data present.

______________________________________________________________________________

Deployed URL: 

https://fathomless-retreat-94739.herokuapp.com/

______________________________________________________________________________

Environment Variables:

const DB_NAME = 'localhost:5432/mandalore'

______________________________________________________________________________

Tech Stack:
Backend: Node.js, Express.js, PostgreSQL
It all starts in the root index.js file. This is the express server. The routing middleware is handled in this file as well.

Frontend: React.js, Stripe, Bootstrap
The root React code starts in the src/index.js file.
______________________________________________________________________________

Project Structure:
├── db
│   ├── index.js
│   └── init_db.js
├── index.js
├── package.json
├── public
│   └── index.html
├── routes
│   └── index.js
└── src
    ├── api
    │   └── index.js
    ├── auth
    │   └── index.js
    ├── components
    │   ├── App.js
    │   └── index.js
    └── index.js

Top level index.js is our Express Server. This is responsible for setting up our API, starting our server, and connecting to our database.

Inside /db we have index.js which is responsible for creating all of our database connection functions.

Inside /routes we have index.js which is responsible for building the apiRouter, which is attached in the express server. This will build all routes that our React application will use to send/receive data via JSON.

Lastly /public and /src are the two puzzle pieces for our React front-end. /public contains any static files necessary for our front-end, and /src is our React source code.

______________________________________________________________________________
Contributors:
Trinidad Padilla, Katiana Janea Camacho-Villalon, Nicholas Lopez, and Cecilia Lam. You can see all of their gitHub profiles here:

Trinidad Padilla: https://github.com/tpadilla10117
Katiana Janea Camacho-Villalon: https://github.com/kati-unu
Nicholas Lopez: https://github.com/Nrlopez16
Cecilia Lam: https://github.com/Zezlita
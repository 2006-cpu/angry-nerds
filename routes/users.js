const express = require('express');
const usersRouter = express.Router();

const jwt = require('jsonwebtoken');
//remember to remove testing secret at submission
const {JWT_SECRET} = process.env || 'notSoSecret';
const bcrypt = require('bcrypt');

const {
    getUserByUsername, 
    createUser,
    getAllUsers
} = require('../db/users');

usersRouter.use((req, res, next) => {
    console.log("A request is being made to /users");
    next();
});

const {getOrdersByUser} = require('../db/orders')


usersRouter.get('/', async (req, res) => {
    const users = await getAllUsers();
    res.send(users)
});



//==== REQUIRE USER 
function requireUser(req, res, next) {
    if(!req.user) {
        next ({
            name: "Missing user error",
            message: "You must be logged in to perform this action"
        })
    }
    next();
}



//====Users -- POST/REGISTER API route
usersRouter.post('/register', async (req, res, next) => {

    const {firstName, lastName, email, username, password, isAdmin, imageURL} = req.body;

    try{
        const _user = await getUserByUsername(username);
        if (_user) {
            res.send({message: 'Error: The Requested Username Already Exists.  Please Enter A Valid Username'});
        } else if (password.length < 8) {
            res.send({message: 'Error: Your Password Must Be At Least 8 Characters In Length!'})
        } else {
            const user = await createUser({
                firstName, 
                lastName, 
                email, 
                username, 
                password, 
                isAdmin, 
                imageURL
            })
            let token = jwt.sign(user, JWT_SECRET);
    
            res.send({user, token})
        }
    } catch (error) {
        next (error);
    }
});


//====Users -- POST/USER LOGIN  API route
usersRouter.post('/login', async (req, res, next) => {
    const {username, password} = req.body;

    if(!username || !password) {
        next({
            name: "you are not registered error",
            message: "Username or Password are not matching.  Please try again"
        })
    } 
    
    try {
        const user = await getUserByUsername(username);

        const isMatch = await bcrypt.compare(password, user.password);

        if (isMatch === true) {

            let token = jwt.sign(user, JWT_SECRET);

            res.send({ message: "You Have Successfully Logged In!", token});
         
            return user;

        } else if (isMatch === false) {
            res.send({message: "Username or Password Does Not Match"})

        }

    } catch (error) {
        next (error);
    }
})

//====Users -- GET/users/me (*) API route
usersRouter.get('/me', async(req, res, next) => {
    const {id} = req.user;
    
    try {
        res.send({id})
    }catch (error) {
        next (error);
    }
})

usersRouter.get('/:userId/orders', requireUser, async (req, res, next ) => {
    const { userId } = req.params;
    try {
        const orders = await getOrdersByUser(1);
        console.log("user order", orders)
        res.send(orders)
        

    } catch (error) {
        next(error)
    }
} )

module.exports = usersRouter;



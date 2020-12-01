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
            res.send({message: 'A user by that username already exists'});
        } else if (password.length < 8) {
            res.send({message: 'Password Too Short!'})
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
    
            res.send({user})
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
            message: "Username or Password are not matching, please try again"
        })
    }
    try {
        const user = await getUserByUsername(username);
        console.log('getUserByUsername', user )

        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch === true) {
            console.log('matching password!!');
            let token = jwt.sign(user, JWT_SECRET);

            res.send({ message: "you're logged in!", token});
            // delete user.password;
            return user;
        }else if ([isMatch === false]) {
            console.log('username or password does not match');
        }
    } catch (error) {
        next (error);
    }
})

//====Users -- GET/users/me (*) API route
usersRouter.get('/me', /* requireUser,  */async(req, res, next) => {
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
        // if(req.user.id === userId){
        //     res.send(orders);
        // }

    } catch (error) {
        next(error)
    }
} )

module.exports = usersRouter;

const express = require('express');
const usersRouter = express.Router();

const jwt = require('jsonwebtoken');
const {JWT_SECRET} = process.env;

const {
    getUserByUsername, 
    getUser,
    getAllUsers
} = require('../db/users');


usersRouter.get('/', async (req, res) => {
    const users = await getAllUsers();
    res.send(users)
});

usersRouter.use((req, res, next) => {
    console.log("A request is being made to /users");
    next();
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

    const {firstName, lastName, email, username, password} = req.body;

    try{
        const newUser = await getUserByUsername(username);
        if(newUser){
            return next ({
                name:'Throws errors for duplicate username',
                message: 'A user with that username already exists'
            });
        }
        if(password.length < 8) {
            return next({
                name:'Throw errors for password too short',
                message: 'Password is less than 8 characters, please create a longer password'
            })
        }

        const user = await createUser({firstName, lastName, email,username, password});
        const token = jwt.sign({
            id: user.id,
            username,
        }, JWT_SECRET,{
        });
        res.send({
            user,
            message: "Thank you for signing up",
            token
        })
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
        const user = await getUser({username, password});
        if(user) {
            const token = jwt.sign({id: user.id, username: user.username}, JWT_SECRET);
            res.send({user, message: "Welcome back to Codalorians!", token})
        } else {
            next ({
                name: "your un/pw is incorrect error",
                message: "Username or Password are not matching, please try again"
            })
            return user;
        }
    } catch (error) {
        next (error);
    }
})

//====Users -- GET/users/me (*) API route
usersRouter.get('/me', requireUser, async(req, res, next) => {
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

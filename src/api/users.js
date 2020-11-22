const express = require('express');
const usersRouter = express.Router();

const jwt = require('jsonwebtoken');
const {JWT_SECRET} = process.env;

const {getUserByUsername, getUser} = require('../db/users');


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



//====Users -- REGISTER API route
usersRouter.post('/users/register', async (req, res, next) => {

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


//====Users -- USER LOGIN  API route
usersRouter.post('/users/login', async (req, res, next) => {
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
            return;
        }
    } catch (error) {
        next (error);
    }
})

//====Users -- GET/users/me (*) API route
usersRouter.get('/users/me', requireUser, async(req, res, next) => {
    const {id} = req.user;
    
    try {
        res.send({id})
    }catch (error) {
        next (error);
    }
})


module.exports = usersRouter;

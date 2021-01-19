//mainly to authenticate user credentials
//to use routers, we need express
const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');

//Load input validation
const validateRegisterInput = require('../../validation/register');

//Login input validation
const validateLoginInput = require('../../validation/login');

//Load user model
const User = require('../../models/User');

//This /test is appended to /api/users (mentioned in server.js)
// @route   GET api/users/test
// @desc    Tests user route
// @access  Public
router.get('/test', (req, res) => res.json({msg: "User works"})); //response being sent is a JSON here

/*
The reason we need private routes because we want some things for only logged in users to do
Example: you login and then create a profile
So, create profile should be part of private route

We don't want any public access to API which can create profile or edit it. They shouldn't be
able to do things just via POSTMAN. They should get "unauthorized error". That's why we 
have JSON web tokens. In order to access a private route, you need to send JSON web token along with it,
The way you get JSON web toke is when you log in and you get it. When trying to access a private route,
you send this token back to authorize.

Difference between authentication and authorization?
->We can add

*/

// @route   GET api/users/register
// @desc    Register a user
// @access  Public
router.post('/register', (req, res) => {
    const {errors, isValid} = validateRegisterInput(req.body);

    if(!isValid) {
        return res.status(400).json(errors);
    }

    User.findOne({email: req.body.email})
        .then(user => {
            if(user) {
                //return res.status(400).json({email: 'Email already exists'});   
                //use errors object from validation module
                errors.email = 'Email already exists';
                return res.status(400).json(errors);
            }
            else {

                const avatar = gravatar.url(req.body.email, {
                    s: '200', //size
                    r: 'pg', //rating
                    d: 'mm' //default: avatar icon image if no image is uploaded by user
                });

                const newUser = new User({
                    name: req.body.name,
                    email: req.body.email,
                    avatar: avatar,
                    password: req.body.password
                });

                //encrypt the password save in mongodb
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) throw error;
                        newUser.password = hash;
                        newUser.save()
                            .then(user => res.json(user))
                            .catch(err => console.log(err));
                    });
                })
            }
        })
});

// @route   GET api/users/login
// @desc    Login User / Return JWT token
// @access  Public
router.post('/login', (req, res) => {

    const {errors, isValid} = validateLoginInput(req.body);

    if(!isValid) {
        return res.status(400).json(errors);
    }

    const email = req.body.email;
    const password = req.body.password;
    console.log(email);

    //find user by email
    User.findOne({email: email})
        .then(user => {
            console.log(user);
            if(!user) {
                //if there is no such user
                //return res.status(404).json({email: 'User not found'}); //404: Resource NOT FOUND
                errors.email = 'User not found';
                return res.status(404).json(errors);
            }

            //found user email: validate password
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if(isMatch) {
                        //correct password: user matched
                        //now, generate JWT token
                        
                        const payload = {
                            id: user.id,
                            nam: user.name,
                            avatar: user.avatar
                        };
                        //Sign token
                        jwt.sign(payload, keys.secretOrKey, {expiresIn: 3600}, (err, token) => { ////3600 seconds is 1 hour: validity of key before it expires
                            res.json({
                                success: true,
                                token: 'Bearer ' + token
                            });
                        }); 
                        
                        //res.json({msg: 'Success'});
                    }
                    else {
                        //wrong password entered
                        //return res.status(400).json({password: 'Incorrect password'});
                        errors.password = 'Incorrect password';
                        return res.status(400).json(errors);
                    }
                })
        })
});

// @route   GET api/users/current
// @desc    Return current user
// @access  private
router.get('/current', passport.authenticate('jwt', {session: false}), (req, res) => {
    //res.json({msg: 'Success'});
    //res.json(req.user);
    res.json({
        id: req.user.id,
        name: req.user.name,
        email: req.user.email
    });
});

//export router so that server.js can pick it up
module.exports = router;
//mainly to authenticate user credentials
//to use routers, we need express
const express = require('express');
const router = express.Router();

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

//export router so that server.js can pick it up
module.exports = router;
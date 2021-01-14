//mainly to authenticate user credentials
//to use routers, we need express
const express = require('express');
const router = express.Router();

//This /test is appended to /api/users (mentioned in server.js)
// @route   GET api/users/test
// @desc    Tests user route
// @access  Public
router.get('/test', (req, res) => res.json({msg: "User works"})); //response being sent is a JSON here

//export router so that server.js can pick it up
module.exports = router;
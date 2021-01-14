//user details like bio, name, gender, experience, etc
//to use routers, we need express
const express = require('express');
const router = express.Router();

// @route   GET api/profile/test
// @desc    Tests profile route
// @access  Public
router.get('/test', (req, res) => res.json({msg: "Profile works"}));

//export router so that server.js can pick it up
module.exports = router;
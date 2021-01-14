//to use routers, we need express
const express = require('express');
const router = express.Router();

router.get('/test', (req, res) => res.json({msg: "Post works"}));

//export router so that server.js can pick it up
module.exports = router;
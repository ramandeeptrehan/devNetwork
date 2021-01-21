//user details like bio, name, gender, experience, etc
//to use routers, we need express
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

//Load profile model
const Profile = require('../../models/Profile');

//Load user profile
const User = require('../../models/User');

// @route   GET api/profile/test
// @desc    Tests profile route
// @access  Public
router.get('/test', (req, res) => res.json({msg: "Profile works"}));

// @route   GET api/profile
// @desc    get current user profile
// @access  private
router.get('/', passport.authenticate('jwt', { session: false}), (req, res) => { //means path is: /api/profile (check server.js file)
    //req.user has the current user: check passport.js file
    errors = {};
    Profile.findOne({user: req.user.id})
        .then(profile => {
            if(!profile) {
                errors.noProfile = 'There is no profile for the user';
                return res.status(404).json(errors);
            }

            res.json(profile);
        })
        .catch(err => res.status(404).json(err));
})  


//export router so that server.js can pick it up
module.exports = router;
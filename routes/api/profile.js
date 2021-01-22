//user details like bio, name, gender, experience, etc
//to use routers, we need express
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

//Load validation
const validateProfileInput = require('../../validation/profile');

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
});

// @route   POST api/profile
// @desc    create or update user profile
// @access  private
router.post('/', passport.authenticate('jwt', {session: false}), (req, res) => {

    const {errors, isValid} = validateProfileInput(req.body);

    if(!isValid) {
        //return errors with 400 status
        res.status(400).json(errors);
    }

    //get fields from post body
    const profileFields = {};
    profileFields.user = req.user.id; //match with id, but gives out user object
    if(req.body.handle) profileFields.handle = req.body.handle;
    if(req.body.company) profileFields.company = req.body.company;
    if(req.body.website) profileFields.website = req.body.website;
    if(req.body.location) profileFields.location = req.body.location;
    if(req.body.bio) profileFields.bio = req.body.bio;
    if(req.body.status) profileFields.handle = req.body.status;
    if(req.body.githubUserName) profileFields.githubUserName = req.body.githubUserName;
    
    //Skills - split into array
    if(typeof req.body.skills !== 'undefined') {
        profileFields.skills = req.body.skills.split(','); //gives us an array of Strings
    }

    //Social
    profileFields.social = {};
    if(req.body.youtube) profileFields.social.youtube = req.body.youtube;
    if(req.body.twitter) profileFields.social.twitter = req.body.twitter;
    if(req.body.facebook) profileFields.social.facebook = req.body.facebook;
    if(req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
    if(req.body.instagram) profileFields.social.instagram = req.body.instagram;

    Profile.findOne({user: req.user.id})
        .then(profile => {
            if(profile) {
                //update profile path
                Profile.findOneAndUpdate(
                    {user: req.user.id}, 
                    {$set: profileFields}, 
                    {new: true}
                    )
                    .then(profile => res.json(profile));
            }
            else {
                //create profile
                //check if handle exists
                Profile.findOne({handle: profileFields.handle}
                    )
                    .then(profile => {
                        if(profile) {
                            errors.handle = 'This handle already exists';
                            res.status(400).json(errors);
                        }
                        else {
                            //can create profile with this handle

                            //save profile
                            new Profile(profileFields).save()
                                .then(profile => res.json(profile));
                        }
                    })

            }
        });
});


//export router so that server.js can pick it up
module.exports = router;
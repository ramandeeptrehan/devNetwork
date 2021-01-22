const Validator = require('validator');
const isEmpty = require('./is-empty'); 

module.exports = function validateProfileInput(data) {
    let errors = {};

    data.handle = !isEmpty(data.handle) ? data.handle:'';
    data.status = !isEmpty(data.status) ? data.status:'';
    data.skills = !isEmpty(data.skills) ? data.skills:'';

    //Required attributes: handle,status and skills
    if(!Validator.isLength(data.handle, {min: 2, max: 16})) {
        errors.handle = 'Handle needs to be between 2 and 4 characters';
    }

    if(Validator.isEmpty(data.handle)) {
        errors.handle = 'Profile handle is required';
    }

    if(Validator.isEmpty(data.status)) {
        errors.status = 'Status is required';
    }

    if(Validator.isEmpty(data.skills)) {
        errors.skills = 'Skills is required';
    }

    if(!isEmpty(data.website)) { //check only if website is non-null
        if(!Validator.isURL(data.website)) {
            errors.website = 'Not a valid URL';
        }
    }

    //do same URL check for all social media links
    if(!isEmpty(data.facebook)) { //check only if website is non-null
        if(!Validator.isURL(data.facebook)) {
            errors.facebook = 'Not a valid URL';
        }
    }
    if(!isEmpty(data.youtube)) { //check only if website is non-null
        if(!Validator.isURL(data.youtube)) {
            errors.youtube = 'Not a valid URL';
        }
    }
    if(!isEmpty(data.linkedin)) { //check only if website is non-null
        if(!Validator.isURL(data.linkedin)) {
            errors.linkedin = 'Not a valid URL';
        }
    }
    if(!isEmpty(data.twitter)) { //check only if website is non-null
        if(!Validator.isURL(data.twitter)) {
            errors.twitter = 'Not a valid URL';
        }
    }
    if(!isEmpty(data.instagram)) { //check only if website is non-null
        if(!Validator.isURL(data.instagram)) {
            errors.instagram = 'Not a valid URL';
        }
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
};
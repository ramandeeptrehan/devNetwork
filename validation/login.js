const Validator = require('validator');
const isEmpty = require('./is-empty'); //we wrote this

module.exports = function validateLoginInput(data) {
    let errors = {};

    data.email = !isEmpty(data.email) ? data.email:'';
    data.password = !isEmpty(data.password) ? data.password:'';

    if(Validator.isEmpty(data.email)) {
        errors.email = 'Email field is required';
    }

    if(!Validator.isEmail(data.email)) { //Validator has this utility to check if a string is a valid email or not
        errors.email = 'Email is invalid';
    }

    if(Validator.isEmpty(data.password)) {
        errors.password = 'Password field is empty';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }


};
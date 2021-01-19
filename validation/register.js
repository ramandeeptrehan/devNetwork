const Validator = require('validator');
const isEmpty = require('./is-empty'); //we wrote this

module.exports = function validateRegisterInput(data) {
    let errors = {};

    data.name = !isEmpty(data.name) ? data.name:'';
    data.email = !isEmpty(data.email) ? data.email:'';
    data.password = !isEmpty(data.password) ? data.password:'';
    data.confirmPassword = !isEmpty(data.confirmPassword) ? data.confirmPassword:'';

    if(!Validator.isLength(data.name, {min: 2, max: 30})) {
        errors.name = 'Name must be between 2 to 30 characters';
    }

    //Validator methods expect strings. So, make it a string before using this method
    if(Validator.isEmpty(data.name)) {
        errors.name = 'Name field is required';
    }

    if(Validator.isEmpty(data.email)) {
        errors.email = 'Email field is required';
    }

    if(!Validator.isEmail(data.email)) { //Validator has this utility to check if a string is a valid email or not
        errors.email = 'Email is invalid';
    }

    if(Validator.isEmpty(data.password)) {
        errors.password = 'Password field is empty';
    }

    if(!Validator.isLength(data.password, {min: 6, max: 30})) {
        errors.password = 'Password must be 6 char long and atmost 30 char long'
    }

    if(Validator.isEmpty(data.confirmPassword)) {
        errors.confirmPassword = 'Confirm password field is required';
    }

    if(!Validator.equals(data.password, data.confirmPassword)) {
        errors.confirmPassword = 'Passwords must match';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }


};
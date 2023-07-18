
const User = require('../Model/signUpModel')

//------------------------------------------------  Name Validation ----------------------------------------------------------

const nameInValid = (name) => {
    if (!name || name.trim().length == 0) {
        return true
    } else {
        return false
    }
}




//------------------------------------------------  Email Validation ----------------------------------------------------------

const emailInValid = (email) => {
    if (!email || email.trim().length == 0) {
        return true;
    }
    var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (!validRegex.test(email)) {
        return true;
    }
    else {
        return false
    }
}




//------------------------------------------------  Password Validation ----------------------------------------------------------

const passwordInValid = (password) => {
    if (!password || password.trim().length == 0) {
        return true
    }
    else {
        return false;
    }
}

module.exports = { nameInValid, emailInValid, passwordInValid }


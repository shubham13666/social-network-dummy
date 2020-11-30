const { validate } = require("graphql");

module.exports.validateUserInput = (
    username,
    email,
    password,
    confirmPassword
) => {
    let errors = {};

    // username validation
    if (username.trim() === '') {
        errors["username"] = "Username can't be empty.";
    }

    // email validation
    if (email.trim() === '') {
        errors["email"] = "Email can't be empty."
    } else {
        const regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const validEmail = regEx.test(email);
        if (!validEmail) {
            errors["email"] = "Invalid email id.";
        }
    }

    // password validation
    if (password === '') {
        errors["password"] = "Password can't be empty.";
    } else if (password !== confirmPassword) {
        errors["password"] = "Password and Confirm Password don't match."
    }

    return {
        errors: errors,
        valid: Object.keys(errors).length < 1
    }
}

module.exports.validateLoginInpput = (username, password) => {
    let errors = {}
    // validate the username and password
    if (username.trim() === '') {
        errors["username"] = "Username can't be empty.";
    }
    if (password === '') {
        errors["password"] = "Password can't be empty.";
    }

    return {
        errors: errors,
        valid: Object.keys(errors).length < 1
    }
}
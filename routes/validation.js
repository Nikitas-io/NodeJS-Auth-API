// Import Data Validation package.
const Joi = require('@hapi/joi');

// Function to validate User for registration.
const registerValidation = (data) => {
    // Data Validation Schema.
    const schema = Joi.object({
        name: Joi.string().min(1).required(),
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required()
    });
    // Validate the data before making a User.
    return schema.validate(data);
}

// Function to validate User for login.
const loginValidation = (data) => {
    // Data Validation Schema.
    const schema = Joi.object({
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required()
    });
    // Validate the data before logging in.
    return schema.validate(data);
}

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;

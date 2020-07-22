const router = require('express').Router();
// Import User model.
const User = require('../models/User');
// Import Validation funcions.
const { registerValidation, loginValidation } = require('./validation');
// Import Password hashing.
const bcrypt = require('bcryptjs');
// Import the JWT module.
const jwt = require('jsonwebtoken');


// Asynchronous POST request to add user to the db.
router.post('/register', async (req, res) => {
    // Validate the User data.
    const {error} = registerValidation(req.body);
    // Check if there was an error in validation.
    if(error){
        return res.status(400).send(error.details[0].message);
    }

    // Check if the user is already in the database.
    const emailExists = await User.findOne({email: req.body.email});
    if(emailExists){
        return res.status(400).send('Email already exists.');
    }

    // Generate a salt with a complexity of 10.
    const salt = await bcrypt.genSalt(10);
    // Hash the password by mashing it with the salt. 
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    // Create a new user based on the User model.
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashPassword
    })
    try{
        // Save the user to the database.
        await user.save();
        // Only send back the user ID for security reasons.
        res.send({user: user._id});
    }catch(err){
        res.status(400).send(err);
    }
})

// Asynchronous POST request to login user.
router.post('/login', async (req, res) => {
    // Validate the User data.
    const {error} = loginValidation(req.body);
    // Check if there was an error in validation.
    if(error){
        return res.status(400).send(error.details[0].message);
    }

    // Try to find the email in the database.
    const user = await User.findOne({email: req.body.email});
    // Check if email doesn't exist.
    if(!user){
        return res.status(400).send('Email or password is wrong.');
    }
    // Check if email doesn't exist.
    const validPass = await bcrypt.compare(req.body.password, user.password);
    // Validate the password.
    if(!validPass){
        return res.status(400).send('Email or password is wrong.');
    }

    /*
    - Create and assign a token. 
    - 1st argument: send the user ID back with the token to the client.
    - 2nd argument: sign the token using the secret from the .env file. 
    */
    const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
    // Add the token to the 'auth-token' header of the response headers. Note 
    // that we could have named the 'auth-token' header whatever we wanted.
    res.header('auth-token', token).send(token);
});

module.exports = router; 
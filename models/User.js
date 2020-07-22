const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true,
        min: 1,
        max: 50
    },
    email: {
        type: String,
        required: true,
        max: 100,
        min: 6
    },
    password:{
        type: String,
        required: true,
        max: 1024,
        min: 6
    },
    date: {
        type: Date,
        default: Date.now
    }
})

// Compile schema to model and export it. 
// Note that we have specified the 'users' collection for this model. 
module.exports = mongoose.model('User', userSchema, 'users');
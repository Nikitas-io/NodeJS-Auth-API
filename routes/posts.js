const router = require('express').Router();
// Import the token verification middlewear.
const verify = require('./verifyToken');
// Import User model.
const User = require('../models/User');

// This is the '.../api/posts/' route.
// Note the *verify* token-verification middlewear in the get() function.
router.get('/', verify, async (req, res) => {
    // Access information that belongs to the JWT verified user.
    // res.send(req.user);

    // Get the user specified in the verified token. 
    const theUser = await User.findOne({_id: req.user._id});
    res.send(theUser);
});

module.exports = router;
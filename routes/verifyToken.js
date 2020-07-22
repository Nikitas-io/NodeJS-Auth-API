const jwt = require('jsonwebtoken');

// Token Validation Middlewear to protect specified routes.
function auth(req, res, next) {
    // Get the auth token.
    const token = req.header('auth-token');
    // Check if the request doesn't have a token in its headers.
    if(!token){
        // 401 response for the resource that cannot be accessed
        // because it doesn't exist in the headers.
        return res.status(401).send('Access Denied');
    }
    try{
        // Attempt to verify the Token using the Token Secret.
        const verified = jwt.verify(token, process.env.TOKEN_SECRET)
        // Verify the User.
        req.user = verified;
        // Continue to the route.
        next();
    }catch(err){
        // Unable to verify the Token.
        res.status(400).send('Invalid Token');
    }
}

// Export the function as the module.
module.exports = auth;
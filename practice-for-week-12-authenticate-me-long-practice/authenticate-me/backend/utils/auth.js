const jwt = require('jsonwebtoken');
const { jwtConfig } = require('../config');
const { User } = require('../db/models');

const { secret, expiresIn } = jwtConfig;


// Function to set the JWT cookie after a user is logged in or signed up.
// It takes in the response and the session user and generates a JWT using the imported secret.
// It has an expiry set to the value defined by the JWT_EXPIRES_IN key in .env.
// The payload will be the returned value of the .toSafeObject instance method from the User model.
// After the JWT is created, it's set to an HTTP-only cookie on the response as a token cookie
const setTokenCookie = (res, user) => {
    // generate the token
    const token = jwt.sign(
        {data: user.toSafeObject()},  // payload
        secret,     // secret imported from /config/index.js
        {expiresIn: parseInt(expiresIn)} // e.g. 604,800 sec = 1 week. Actual value imported from /config/index.js
    );

    const isProduction = process.env.NODE_ENV === 'production';

    // set the token cookie
    res.cookie('token', token, {
        maxAge: expiresIn * 1000, // note that maxAge is in milliseconds
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction && 'Lax'
    });

    return token;
};

// Middleware function to restore the session user based upon the contents of the JWT cookie.
// Certain authenticated routes will require the identity of the current session user.
// 1. Verifies and parses the JWT payload and searches the database for a User with the id in the payload
//    (uses the currentUser scope as the hashedPassword is not required for this operation).
// 2. If there is an error verifying the JWT or a User cannot be found with the specified id,
//    clear the token cookie from the response.
// 3. If a user is found, save the user to a key of user onto the request.
// ----> This will be added as a pre-middleware for route handlers and for the following requireAuth middleware
const restoreUser  = (req, res, next) => {

    const { token } = req.cookies;

    // jwt.verify syntax: jwt.verify(token, secretOrPublicKey, [options, callback])
    // (Asynchronous) If a callback is supplied, function acts asynchronously.
    // The callback is called with the decoded payload if the signature is valid and optional expiration, audience, or issuer are valid. If not, it will be called with the error.
    // In this case, no options are used, so a null is passed in for options

    // 1. - Verify / Parse JWT payload
    return jwt.verify(token, secret, null, async (err, jwtPayload) => {
        // 2. Handle the case where the token couldn't be verified
        if (err) {
            return next();  // why not next(err)? Because nothing would be returned and the route / middleware calling this would handle it?
        }

        try {
            const { id } = jwtPayload.data;
            req.user = await User.scope('currentUser').findByPk(id);
        }
        catch (e) {
            // 2. Handle the case where user with specified ID was not found in the database
            res.clearCookie('token');
            return next();  // same question regarding next() vs next(e)
        }

        if (!req.user) res.clearCookie('token');

        return next();

    });
};

// Authentication middleware for requiring a session user to be authenticated before accessing a route
// Defined as an array with the restoreUser middleware function.
// Ensures that if a valid JWT cookie exists, the session user will be loaded into the req.user attribute.
// The second middleware (in the array) will check req.user and will go to the next middleware if there is a session user present.
// If there is no session user, an error will be created and passed along to the error handling middlewares.
const requireAuth = [
    restoreUser,                         // restoreUser will restore a user session based upon the existence of a valid JWT cookie
    function (req, _res, next) {         // perform req.user check and return error if it doesn't exist
        if (req.user) return next();

        const err = new Error('Unauthorized');
        err.title = 'Unauthorized';
        err.errors = ['Unauthorized'];
        err.status = 401;
        return next(err);

    }
];

module.exports = { setTokenCookie, restoreUser, requireAuth};

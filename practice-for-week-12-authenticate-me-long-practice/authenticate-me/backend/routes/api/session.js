// SESSION ROUTES:
// Login: POST /api/session
// Logout: DELETE /api/session
// Get session user: GET /api/session

const express = require('express');

// Attach auth middleware and Users model class
const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { User } = require('../../db/models');

const router = express.Router();

// Login route:
// Using an asynchronous route handler, call the login static method from the User model.
// If a user is returned from the login static method, call setTokenCookie and return a JSON response with the user info
// If no user is returned, create a "Login Failed" error and invoke the next error-handling middleware with it
router.post('/', async (req, res, next) => {
    // retrieve credential and password from request body
    const { credential, password } = req.body;

    // call User model class static method login, providing credential and password deconstructed from the request body
    const user = await User.login({ credential, password });

    // error handling - if login fails, generate error and call next error handling middleware
    if (!user) {
        const err = new Error('Login failed');
        err.status = 401;
        err.title = 'Login failed';
        err.errors = ['The provided credentials were invalid.'];
        return next(err);
    }

    // set session token (jwt) cookie if error doesn't occur
    await setTokenCookie(res, user);
    // return logged in user
    return res.json({ user });
});

// Logout route:
// The DELETE /api/session logout route will remove the token cookie from the response (i.e. ending the session and removing auth)
// and return a JSON success message
router.delete('/', (_req, res) => { // underscore prefix on request to mean that it is unused?
    res.clearCookie('token');
    return res.json({message: 'success'});
});

// Get Session User route:
// Uses the restoreUser middleware and will return the session user as JSON under the key of user.
// If there is not a session (i.e. no JWT session cookie), it will return a JSON with an empty object.
router.get('/', restoreUser, (req, res) => {
    const { user } = req;
    if (user) {
        return res.json({
            user: user.toSafeObject()
        });
    } else return res.json({});
});


module.exports = router;

// ----------------------------------------------------------------------------------
// Login Route Tests:
// ----------------------------------------------------------------------------------
// Test the login route by navigating to the http://localhost:8000/api/csrf/restore route and making a fetch request from the browser's DevTools console.
// In devtools, perform the following fetch requests:
// Remember to replace the <value of XSRF-TOKEN cookie> with the value of the XSRF-TOKEN cookie found in your browser's DevTools.
// If you don't have the XSRF-TOKEN cookie anymore, access the http://localhost:8000/api/csrf/restore route to add the cookie back.

// ----------------------------------------------------------
// TEST DEMO USER USING USERNAME CREDENTIAL:
// ----------------------------------------------------------
// fetch('/api/session', {
//     method: 'POST',
//     headers: {
//       "Content-Type": "application/json",
//       "XSRF-TOKEN": `<value of XSRF-TOKEN cookie>`
//     },
//     body: JSON.stringify({ credential: 'Demo-lition', password: 'password' })
//   }).then(res => res.json()).then(data => console.log(data));

// ----------------------------------------------------------
// TEST DEMO USER USING EMAIL CREDENTIAL:
// ----------------------------------------------------------
// fetch('/api/session', {
//     method: 'POST',
//     headers: {
//       "Content-Type": "application/json",
//       "XSRF-TOKEN": `<value of XSRF-TOKEN cookie>`
//     },
//     body: JSON.stringify({ credential: 'demo@user.io', password: 'password' })
//   }).then(res => res.json()).then(data => console.log(data));

// ----------------------------------------------------------
// TEST DEMO USER USING INVALID CREDENTIAL / PASSWORD COMBO:
// ----------------------------------------------------------
// fetch('/api/session', {
//     method: 'POST',
//     headers: {
//       "Content-Type": "application/json",
//       "XSRF-TOKEN": `<value of XSRF-TOKEN cookie>`
//     },
//     body: JSON.stringify({ credential: 'Demo-lition', password: 'Hello World!' })
//   }).then(res => res.json()).then(data => console.log(data));

// ----------------------------------------------------------------------------------
// Logout Route Test:
// ----------------------------------------------------------------------------------
// Start by navigating to the http://localhost:8000/api/csrf/restore route and making a fetch request from the browser's DevTools console to test the logout route.
// Check that you are logged in by confirming that a token cookie is in your list of cookies in the browser's DevTools.
// Remember, you need to pass in the value of the XSRF-TOKEN cookie as a header in the fetch request because the logout route has a DELETE HTTP verb.

// fetch('/api/session', {
//     method: 'DELETE',
//     headers: {
//       "Content-Type": "application/json",
//       "XSRF-TOKEN": `<value of XSRF-TOKEN cookie>`
//     }
//   }).then(res => res.json()).then(data => console.log(data));

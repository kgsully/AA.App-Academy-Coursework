// SESSION ROUTES:
// Login: POST /api/session
// Logout: DELETE /api/session
// Get session user: GET /api/session

const express = require('express');
const asyncHandler = require('express-async-handler');  // The asyncHandler function from express-async-handler will wrap asynchronous route handlers and custom middlewares.

// Attach auth middleware and Users model class
const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { User } = require('../../db/models');

const router = express.Router();

// Login route:
// Using an asynchronous route handler, call the login static method from the User model.
// If a user is returned from the login static method, call setTokenCookie and return a JSON response with the user info
// If no user is returned, create a "Login Failed" error and invoke the next error-handling middleware with it
// NOTE ---> USES validateLogin MIDDLEWARE TO VALIDATE REQUEST BODY. SEE COMMENTS / CODE FOR MORE INFORMATION
router.post(
    '/',
    asyncHandler(async (req, res, next) => {
      const { credential, password } = req.body;
      console.log(password);

      const user = await User.login({ credential, password });

      if (!user) {
        const err = new Error('Login failed');
        err.status = 401;
        err.title = 'Login failed';
        err.errors = ['The provided credentials were invalid.'];
        return next(err);
      }

      await setTokenCookie(res, user);

      return res.json({
        user
      });
    })
  );



// router.post('/', asyncHandler(async(req, res, next) => {
//     // retrieve credential and password from request body
//     const { credential, password } = req.body;

//     // call User model class static method login, providing credential and password deconstructed from the request body
//     const user = await User.login({credential, password});

//     // error handling - if login fails, generate error and call next error handling middleware
//     if(!user) {
//         const err = new Error('Login Failed');
//         err.title = 'Login Failed';
//         err.errors = ['Login Failed'];
//         err.status = 401;
//         next(err);
//     }

//     // set session token (jwt) cookie if error doesn't occur
//     await setTokenCookie(res, user);    // not sure why this uses await... setTokenCookie doesn't appear to behave async...

//     // return logged in user
//     return res.json(user);
// }));








module.exports = router;

// -------------------------------------------------------------------------------------------------
// Testing Notes:
// -------------------------------------------------------------------------------------------------

// ---------------------------
// Login Route
// ---------------------------
/*
Test the login route by navigating to the http://localhost:5000/hello/world test route and making a fetch request from the browser's DevTools console. Remember, you need to pass in the value of the XSRF-TOKEN cookie as a header in the fetch request because the login route has a POST HTTP verb.

If at any point you don't see the expected behavior while testing, then check your backend server logs in the terminal where you ran npm start. Also, check the syntax in the session.js as well as the login method in the user.js model file.

Try to login the demo user with the username first.

fetch('/api/session', {
  method: 'POST',
  headers: {
    "Content-Type": "application/json",
    "XSRF-TOKEN": `<value of XSRF-TOKEN cookie>`
  },
  body: JSON.stringify({ credential: 'Demo-lition', password: 'password' })
}).then(res => res.json()).then(data => console.log(data));

Remember to replace the <value of XSRF-TOKEN cookie> with the value of the XSRF-TOKEN cookie found in your browser's DevTools. If you don't have the XSRF-TOKEN cookie anymore, access the http://localhost:5000/hello/world route to add the cookie back.

Then try to login the demo user with the email next.

fetch('/api/session', {
  method: 'POST',
  headers: {
    "Content-Type": "application/json",
    "XSRF-TOKEN": `<value of XSRF-TOKEN cookie>`
  },
  body: JSON.stringify({ credential: 'demo@user.io', password: 'password' })
}).then(res => res.json()).then(data => console.log(data));

Now test an invalid user credential and password combination.

fetch('/api/session', {
  method: 'POST',
  headers: {
    "Content-Type": "application/json",
    "XSRF-TOKEN": `<value of XSRF-TOKEN cookie>`
  },
  body: JSON.stringify({ credential: 'Demo-lition', password: 'Hello World!' })
}).then(res => res.json()).then(data => console.log(data));

You should get a Login failed error back with an invalid password for the user with that credential.

Commit your code for the login route once you are done testing!
*/

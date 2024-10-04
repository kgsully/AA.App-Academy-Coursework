// USERS ROUTES
// Signup: POST /api/users

const express = require('express');

// Not sure why the asyncHandler is necessary, previous exercise just used async instead of the async handler...
// const asyncHandler = require('express-async-handler');  // The asyncHandler function from express-async-handler will wrap asynchronous route handlers and custom middlewares.

// Attach auth middleware and Users model class
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');

const router = express.Router();

// Signup API route (asynchronous)
// Calls the signup static method on the User model.
// If the user is successfully created, call setTokenCookie and return a JSON response with the user information.
// If the creation is unsuccessful, a sequelize validation error will be passed onto the next error-handling middleware
// NOTE ---> USES validateSignup MIDDLEWARE TO VALIDATE REQUEST BODY. SEE COMMENTS / CODE FOR MORE INFORMATION
router.post(
    '/',
    async (req, res) => {
        const { username, email, password } = req.body;
        const user = await User.signup({username, email, password});

        await setTokenCookie(res, user);

        return res.json({user});
    }
);

module.exports = router;

// -------------------------------------------------------------------------------------------------
// Testing Notes:
// -------------------------------------------------------------------------------------------------

// ---------------------------
// Signup Route
// ---------------------------
/*
Test the signup route by navigating to the http://localhost:5000/hello/world test route and making a fetch request from the browser's DevTools console. Remember, you need to pass in the value of the XSRF-TOKEN cookie as a header in the fetch request because the login route has a POST HTTP verb.

If at any point you don't see the expected behavior while testing, check your backend server logs in the terminal where you ran npm start. Also, check the syntax in the users.js route file as well as the signup method in the user.js model file.

Try to signup a new valid user.

fetch('/api/users', {
  method: 'POST',
  headers: {
    "Content-Type": "application/json",
    "XSRF-TOKEN": `<value of XSRF-TOKEN cookie>`
  },
  body: JSON.stringify({
    email: 'spidey@spider.man',
    username: 'Spidey',
    password: 'password'
  })
}).then(res => res.json()).then(data => console.log(data));

Remember to replace the <value of XSRF-TOKEN cookie> with the value of the XSRF-TOKEN cookie found in your browser's DevTools. If you don't have the XSRF-TOKEN cookie anymore, access the http://localhost:5000/hello/world route to add the cookie back.

Next, try to hit the Sequelize model validation errors by testing the following which should give back a Validation error:

    email is not unique (signup with an existing email)
    username is not unique (signup with an existing username)

If you don't see the Validation error for any of these, check the syntax in your backend/db/models/user.js model file.
*/

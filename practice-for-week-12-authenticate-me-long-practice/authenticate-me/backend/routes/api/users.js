// USERS ROUTES
// Signup: POST /api/users

const express = require('express');

// Attach auth middleware and Users model class
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');

const router = express.Router();


// Signup API route (asynchronous)
// Calls the signup static method on the User model.
// If the user is successfully created, call setTokenCookie and return a JSON response with the user information.
// If the creation is unsuccessful, a sequelize validation error will be passed onto the next error-handling middleware
router.post('/', async (req, res) => {
    const { email, password, username } = req.body;
    const user = await User.signup({ email, username, password });

    await setTokenCookie(res, user);

    return res.json({ user });
});


module.exports = router;

// ----------------------------------------------------------------------------------
// Signup Route Test:
// ----------------------------------------------------------------------------------
// Test the signup route by navigating to the http://localhost:8000/api/csrf/restore route and making a fetch request from the browser's DevTools console.
// Remember, you need to pass in the value of the XSRF-TOKEN cookie as a header in the fetch request because the login route has a POST HTTP verb.

// Next, try to hit the Sequelize model validation errors by testing the following which should give back a Validation error:
//      email is not unique (signup with an existing email)
//      username is not unique (signup with an existing username)

// fetch('/api/users', {
//     method: 'POST',
//     headers: {
//       "Content-Type": "application/json",
//       "XSRF-TOKEN": `<value of XSRF-TOKEN cookie>`
//     },
//     body: JSON.stringify({
//       email: 'spidey@spider.man',
//       username: 'Spidey',
//       password: 'password'
//     })
//   }).then(res => res.json()).then(data => console.log(data));

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

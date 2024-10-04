const express = require('express');
const router = express.Router();

// Connect api router endpoints
const apiRouter = require('./api');
router.use('/api', apiRouter);

// Test route
// GET route for endpoint /hello/world
// This endpoint will set a cookie on the response with the name of `XSRF-TOKEN` to the value of the req.csrfToken method's return.
//   (required as app.js is using CSURF to prevent cross-site-request-forgery)
// Then it will send the text 'Hello World!' as the response body.

// Test route removed by comment-out
// router.get('/hello/world', function(req, res) {
//     res.cookie('XSRF-TOKEN', req.csrfToken());
//     res.send('Hello World!');
// });

// GET /api/csrf/restore
// Allows any developer to re-set the CSRF token cookie XSRF-TOKEN
// In this route, a cookie is set on the response with the name of `XSRF-TOKEN` to the value of `req.csrfToken` method's return
// Then send the token as the response for easy retrieval
// This route should not be available in production, but it will not be exclusive to the development application until you
// implement the frontend of the application later. So for now, it will remain available to both the development and production environments.
router.get('/api/csrf/restore', (req, res) => {
    const csrfToken = req.csrfToken();
    res.cookie("XSRF-TOKEN", csrfToken);
    res.status(200).json({
        'XSRF-TOKEN': csrfToken
    });
});


module.exports = router;

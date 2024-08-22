const express = require('express');
const router = express.Router();

// Test route
// GET route for endpoint /hello/world
// This endpoint will set a cookie on the response with the name of `XSRF-TOKEN` to the value of the req.csrfToken method's return.
//   (required as app.js is using CSURF to prevent cross-site-request-forgery)
// Then it will send the text 'Hello World!' as the response body.
router.get('/hello/world', function(req, res) {
    res.cookie('XSRF-TOKEN', req.csrfToken());
    res.send('Hello World!');
});

module.exports = router;

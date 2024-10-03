// Import express package and router function from express
const express = require('express');
const router = express.Router();

// Import and connect api routes
const apiRouter = require('./api');

router.use('/api', apiRouter);


// Test Route - Sets a cookie on the response with the name of XSRF-TOKEN to the value of the req.csrfToken method's return
router.get('/hello/world', function (req, res) {
    res.cookie('XSRF-TOKEN', req.csrfToken());
    res.send('Hello World!');
});

module.exports = router;

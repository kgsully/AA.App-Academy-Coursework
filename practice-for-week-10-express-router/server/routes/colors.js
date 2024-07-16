const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
    res.status(200).json("GET /colors");
});

router.get('/:name', (req, res) => {
    res.status(200).json(`GET /colors/:name`);
});

router.post('/:name/css-styles', (req, res) => {
    res.status(200).json("POST /colors/:name/css-styles");
});

router.delete('/:name/css-styles/:style', (req, res) => {
    res.status(200).json("DELETE /colors/:name/css-styles/:style");
});

module.exports = router;



// ## Expand your Express router

// Add the following endpoints to the router for the `colors` resource:

// - `POST /colors/:name/css-styles` - send a JSON of `"POST /colors/:name/css-styles"`
// - `DELETE /colors/:name/css-styles/:style` - send a JSON of `"DELETE /colors/:name/css-styles/:style"`

// Refer to the `people` router if you get stuck.

// Test the endpoints using Postman, the browser, or the console in the browser.

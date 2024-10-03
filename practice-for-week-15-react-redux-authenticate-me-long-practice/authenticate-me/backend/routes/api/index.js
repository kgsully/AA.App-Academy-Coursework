const router = require('express').Router();

// api Router test route - Returns JSON formatted request body that was sent with the POST request (echo)
router.post('/test', function (req, res) {
    res.json({message: req.body});
});




module.exports = router;

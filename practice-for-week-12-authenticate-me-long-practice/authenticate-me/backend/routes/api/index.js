const router = require('express').Router();

// Test route to verify api connection is working
// The API test route is accepting requests with the URL path of /api/test with the HTTP verb of POST.
// It sends a JSON response containing whatever is in the body of the request.

/* Example fetch request to test the /api/test endpoint
fetch('/api/test', {
    method: "POST",
    headers: {
    "Content-Type": "application/json",
    "XSRF-TOKEN": `<value of XSRF-TOKEN cookie>`
    },
    body: JSON.stringify({ hello: 'world' })
    }).then(res => res.json()).then(data => console.log(data));

Replace the <value of XSRF-TOKEN cookie> with the value of the XSRF-TOKEN cookie.
If you don't have the XSRF-TOKEN cookie anymore, access the http://localhost:8000/api/csrf/restore route to add the cookie back.
*/

router.post('/test', (req, res) => {
    res.json({requestBody: req.body});
});

// USER AUTH MIDDLEWARE TESTING ROUTES - COMMENT-IN FOR TESTING PURPOSES
// // TEST ROUTE - GET /api/set-token-cookie - For testing the setTokenCookie middleware defined in utils
// const { setTokenCookie } = require('../../utils/auth.js'); // need to connect the middleware function for setTokenCookie
// const { User } = require('../../db/models');            // need to connect the class User model / class
// router.get('/set-token-cookie', async (_req, res) => {
//     const user = await User.findOne({
//         where: {
//             username: 'Demo-lition'
//         }
//     });
//     setTokenCookie(res, user);
//     return res.json({ user });
// });

// // TEST ROUTE - GET / api/restore-user (middleware call added between route and callback)
// const { restoreUser } = require('../../utils/auth.js');
// router.get('/restore-user', restoreUser, (req, res) => {
//     return res.json(req.user);
// });


// //TEST ROUTE - GET /api/require-auth
// const { requireAuth } = require('../../utils/auth.js');
// router.get('/require-auth', requireAuth, (req, res) => {
//     return res.json(req.user);
// });

module.exports = router;

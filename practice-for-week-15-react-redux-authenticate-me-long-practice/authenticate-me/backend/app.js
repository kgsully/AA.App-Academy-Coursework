// Import express and express middleware packages
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const csurf = require('csurf');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');

// Import express router exported by index.js in the routes directory
const routes = require('./routes');

// Determine whether environment is production and set variable value to true if so
const { environment } = require('./config');
const isProduction = environment === 'production';

// Initialize the express application
const app = express();

// Connect the `morgan` middleware for loggin information about requests and responses:
app.use(morgan('dev'));

// Use the `cookie-parser` middleware for parsing cookies and `express.json` middleware for parsing JSON bodies of requests with `Content-Type` of `application/json`
app.use(cookieParser());
app.use(express.json());

// Add several security middlewares:
// 1. Only allow CORS (Cross-Origin Resource Sharing) in development using the cors middleware because the React frontend will be served from a different server than the Express server.
//    CORS isn't needed in production since all of our React and Express resources will come from the same origin.
// 2. Enable better overall security with the helmet middleware (for more on what helmet is doing, see helmet on the npm registry).
//    React is generally safe at mitigating XSS (i.e., Cross-Site Scripting) attacks, but do be sure to research how to protect your users from such attacks in React when deploying a large production application.
//    Now add the crossOriginResourcePolicy to the helmet middleware with a policy of cross-origin. This will allow images with URLs to render in deployment.
// 3. Add the csurf middleware and configure it to use cookies.

// Security middleware
// CORS -
if (!isProduction) {
    // enable cors only in development
    app.use(cors());
}

// Helmet helps set a variety of headers to better secure your app
app.use(
    helmet.crossOriginResourcePolicy({
        policy: "cross-origin"
    })
);

// Set the _csrf token and create req.csrfToken method
app.use(
    csurf({
        cookie: {
            secure: isProduction,
            sameSite: isProduction && "Lax",
            httpOnly: true
        }
    })
);

// Connect all routes from the express router
app.use(routes);

module.exports = app;

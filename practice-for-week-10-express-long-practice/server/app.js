const express = require('express');

// Phase 4 - Allow the application to load environment variables from a .env file:
require('dotenv').config();
const environment = process.env.NODE_ENV;
console.log(environment);

// Phase 1 - express-async-errors used to handle async function errors within express
require('express-async-errors');

// Phases 1 & 2 - Require / import middleware functions
const logger = require('./middleware/logger.js');
const { error, errorHandler } = require('./middleware/error.js');

// Phase 3 - Import / require the dogs router
const dogs = require('./routes/dogs.js');

const app = express();

// Phase 1 - Use express.json
app.use(express.json());

// Phase 1 - Server static assets with express.static()
app.use('/static', express.static('./assets'));

// Phase 2 - Logger Middleware
app.use(logger);

// Phase 3 - Connect the dogs router using the endpoint /dogs
app.use('/dogs', dogs);

// For testing purposes, GET /
app.get('/', (req, res) => {
  res.json("Express server running. No content provided at root level. Please use another route.");
});

// For testing express.json middleware
app.post('/test-json', (req, res, next) => {
  // send the body as JSON with a Content-Type header of "application/json"
  // finishes the response, res.end()
  res.json(req.body);
  next();
});

// For testing express-async-errors
app.get('/test-error', async (req, res) => {
  throw new Error("Hello World!")
});

// Phases 2 & 4 - Attach error handling middleware to app for error handling
// Phase 2 - Resource not found error generation / next(err)
app.use(error);
// Phase 4 - Error handling middleware
app.use(errorHandler);


const port = 5000;
app.listen(port, () => console.log('Server is listening on port', port));

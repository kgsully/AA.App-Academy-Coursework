// Phase 2 - Logger Middleware:
// Create a middleware function that will log the method and URL path
// of the request to the terminal for ALL requests to the server

const logger = (req, res, next) => {
    res.on('finish', () => {
        console.log(req.method, req.url, "Status Code:", res.statusCode);
    });
    next();
}

module.exports = logger;

// Phase 2 - Generate Error for resource not found
const error = (res, req, next) => {
    const error = new Error("The requested resource couldn't be found");
    error.statusCode = 404;
    next(error);
}

// Phase 4 - Error Handling Middleware
const errorHandler = (err, req, res, next) => {
    console.log(err);

    const statusCode = err.statusCode || 500;
    const message = err.message || "Something Went Wrong...";

    const errorResponse = {
        status: statusCode,
        message: message,
    }

    // Only send the stack trace as part of the JSON response if the environment is NOT production
    if(process.env.NODE_ENV !== "production") {
        errorResponse.stack = err.stack;
    }

    res.status(statusCode)
       .json(errorResponse);
}

module.exports = { error, errorHandler};

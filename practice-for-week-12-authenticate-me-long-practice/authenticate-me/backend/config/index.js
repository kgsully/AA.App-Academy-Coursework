// Each environment variable will be read and exported as a key from this file.

module.exports = {
    environment: process.env.NODE_ENV || 'development',  // if a NODE_ENV variable is not set when run, it will default to 'development'
    port: process.env.PORT || 8000,
    dbFile: process.env.DB_FILE,
    jwtfConfig: {
        secret: process.env.JWT_SECRET,
        expiresIn: process.env.JWT_EXPIRES_IN
    }
};

const config = require('./index');

module.exports = {
  development: {
    storage: config.dbFile, // This comes from index.js. Configuration environment variables in index.js come from the .env file
    dialect: "sqlite",
    seederStorage: "sequelize",
    logQueryParameters: true,
    typeValidation: true
  },
  production: {
    use_env_variable: 'DATABASE_URL',
    dialect: 'postgres',
    seederStorage: 'sequelize',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    }
  }
};

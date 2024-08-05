'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Color extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Color.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      // Step 4 - Modify the model file:
      // - length should be between 2 and 20 characters. Include a custom error message "name must be between 2 and 20 characters"
      // - A custom function should throw an error if the name ends in the letter 'y'. The error should indicate name must not end in 'y', or similar.
      validate: {
        // Length validation with custom message - turn the key into an object, use 'args' to define what the value of the key would have been, then add the msg
        len: {
          args: [2, 20],
          msg: "name must be between 2 and 20 characters"
        },
        // Not ending in Y validation
        noEndingInY(value) {
          if (value.slice(-1) === 'y') {
            throw new Error('name must not end in \'y\'');
          }
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Color',
  });
  return Color;
};

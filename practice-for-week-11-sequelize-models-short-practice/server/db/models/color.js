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
    // Step 3 - modify the model to add model-level validations for not null & unique
    // name: DataTypes.STRING  // Original attribute from model generation
    name: {   // updated for model level validations
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: true
    }
  }, {
    sequelize,
    modelName: 'Color',
  });
  return Color;
};

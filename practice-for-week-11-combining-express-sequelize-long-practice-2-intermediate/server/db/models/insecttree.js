'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class InsectTree extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // InsectTree.hasMany ( models.Insect, { foreignKey: 'insectId', onDelete: 'CASCADE', hooks: true } );
      // InsectTree.hasMany ( models.Tree, { foreignKey: 'treeId', onDelete: 'CASCADE', hooks: true } );
    }
  }
  InsectTree.init({
    insectId: DataTypes.INTEGER,
    treeId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'InsectTree',
  });
  return InsectTree;
};

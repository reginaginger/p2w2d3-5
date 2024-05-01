'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Likes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User, Initiative }) {
      this.belongsTo (User, { foreignKey: 'userId' }),
      this.belongsTo (Initiative , { foreignKey: 'initiativeId' })
    }
  }
  Likes.init({
    userId: DataTypes.INTEGER,
    initiativeId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Likes',
  });
  return Likes;
};
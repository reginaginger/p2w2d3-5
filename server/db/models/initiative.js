'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Initiative extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User, Likes, UnLikes }) {
      this.hasMany (Likes, { foreignKey: 'initiativeId' }),
      this.hasMany (UnLikes, { foreignKey: 'initiativeId' }),
      this.belongsTo (User, { foreignKey: 'userId' })
    }
  }
  Initiotive.init({
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    status: DataTypes.BOOLEAN,
    level: DataTypes.STRING,
    image: DataTypes.STRING,
    data: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Initiative',
  });
  return Initiative;
};
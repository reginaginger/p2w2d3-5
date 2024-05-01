'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Likes, UnLikes, Initiative }) {
      this.hasMany (Likes, { foreignKey: 'userId' }),
      this.hasMany (UnLikes, { foreignKey: 'userId' }),
      this.hasMany (Initiative, { foreignKey: 'userId' })
    }
  }
  User.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    adress: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};
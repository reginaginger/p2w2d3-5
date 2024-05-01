'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Meetup extends Model {
    static associate({User}) {
      this.belongsTo(User, { foreignKey: 'userId' });
    }
  }
  Meetup.init({
    description: DataTypes.TEXT,
    address: DataTypes.STRING,
    maxAmount: DataTypes.INTEGER,
    counter: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Meetup',
  });
  return Meetup;
};
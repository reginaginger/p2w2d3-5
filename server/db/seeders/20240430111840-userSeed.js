'use strict';
const bcrypt = require('bcrypt');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [{
      name: 'Alex',
      email: 'alex@mail.ru',
      password: await bcrypt.hash('123', 10),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Adam',
      email: 'adam@mail.ru',
      password: await bcrypt.hash('1234', 10),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Anton',
      email: 'anton@mail.ru',
      password: await bcrypt.hash('12345', 10),
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};

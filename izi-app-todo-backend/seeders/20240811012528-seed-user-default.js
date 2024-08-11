'use strict';
const bcrypt = require('bcryptjs');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const hashedPassword = await bcrypt.hash('iziapp123', 10);
    return queryInterface.bulkInsert('User', [{
      name: 'izi-app-adm',
      email: 'izi@adm.com',
      password: hashedPassword,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('User', { email: 'izi@adm.com' }, {});
  }
};
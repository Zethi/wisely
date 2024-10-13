'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Priority', [
      {
        name: 'Baja',
        weight: 1,
      },
      {
        name: 'Media',
        weight: 2,
      },
      {
        name: 'Alta',
        weight: 3,
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Priority', null, {});
  },
};

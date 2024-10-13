'use strict';

export async function up(queryInterface, Sequelize) {
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
}
export async function down(queryInterface, Sequelize) {
  await queryInterface.bulkDelete('Priority', null, {});
}
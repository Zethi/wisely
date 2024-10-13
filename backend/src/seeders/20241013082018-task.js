'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const lists = await queryInterface.sequelize.query(
      `SELECT id, name FROM \`List\` WHERE name IN ('Por hacer', 'En curso', 'Finalizado');`
    );

    const listIds = lists[0];

    const priority = await queryInterface.sequelize.query(
      `SELECT id FROM \`Priority\` WHERE name = 'Baja' LIMIT 1;`
    );
    const priorityId = priority[0][0]?.id;

    if (listIds.length && priorityId) {
      await queryInterface.bulkInsert('Task', [
        {
          name: 'Tarea ejemplo 1',
          description: 'Descripción de ejemplo para la tarea 1',
          list_id: listIds.find(list => list.name === 'Por hacer').id,
          priority_id: priorityId,
          order: 0,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          name: 'Tarea ejemplo 2',
          description: 'Descripción de ejemplo para la tarea 2',
          list_id: listIds.find(list => list.name === 'En curso').id,
          priority_id: priorityId,
          order: 0,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          name: 'Tarea ejemplo 3',
          description: 'Descripción de ejemplo para la tarea 3',
          list_id: listIds.find(list => list.name === 'Finalizado').id,
          priority_id: priorityId,
          order: 0,
          created_at: new Date(),
          updated_at: new Date()
        }
      ], {});
    }
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Task', {
      name: ['Tarea ejemplo 1', 'Tarea ejemplo 2', 'Tarea ejemplo 3']
    }, {});
  }
};

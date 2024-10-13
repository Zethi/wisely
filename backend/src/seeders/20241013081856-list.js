'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const board = await queryInterface.sequelize.query(
      `SELECT id FROM \`Board\` LIMIT 1;`
    );
    const boardId = board[0][0]?.id;

    if (boardId) {
      await queryInterface.bulkInsert('List', [
        {
          name: 'Por hacer',
          order: 0,
          board_id: boardId,

        },
        {
          name: 'En curso',
          order: 1,
          board_id: boardId,

        },
        {
          name: 'Finalizado',
          order: 2,
          board_id: boardId,

        }
      ], {});
    }
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('List', {
      name: ['Por hacer', 'En curso', 'Finalizado']
    }, {});
  }
};

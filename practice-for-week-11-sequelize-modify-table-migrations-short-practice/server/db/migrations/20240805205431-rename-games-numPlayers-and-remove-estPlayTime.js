'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    // public async renameColumn(tableName: string, attrNameBefore: string, attrNameAfter: string, options: object): Promise
    await queryInterface.renameColumn('Games', 'numPlayers', 'maxPlayers');

    // public async removeColumn(tableName: string, attributeName: string, options: object): *
    await queryInterface.removeColumn('Games', 'estPlayTime');

  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */

    await queryInterface.renameColumn('Games', 'maxPlayers', 'numPlayers');
    await queryInterface.addColumn('Games', 'estPlayTime', Sequelize.INTEGER);

  }
};

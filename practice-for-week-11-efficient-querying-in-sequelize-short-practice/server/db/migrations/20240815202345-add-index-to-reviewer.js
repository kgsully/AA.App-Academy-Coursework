'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addIndex('Reviewers', ['firstName']);
    await queryInterface.addIndex('Reviewers', ['lastName']);
    await queryInterface.addIndex('Reviewers', ['firstName', 'lastName']);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeIndex('Reviewers', ['firstName']);
    await queryInterface.removeIndex('Reviewers', ['lastName']);
    await queryInterface.removeIndex('Reviewers', ['firstName', 'lastName']);
  }
};

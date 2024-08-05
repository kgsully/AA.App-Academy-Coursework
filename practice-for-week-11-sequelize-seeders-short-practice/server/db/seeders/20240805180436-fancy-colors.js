'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    // Bonus step 6
    await queryInterface.bulkInsert('Colors', [
      {
        name: 'aquamarine',
        createdAt: '2023-07-01 12:48:41',
        updatedAt: '2024-08-05 16:48:41'
      },
      {
        name: 'indigo',
        createdAt: '2022-02-19 18:48:41',
        updatedAt: '2023-07-01 12:48:41'
      }
    ], {});

  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    // Bonus step 6
    await queryInterface.bulkDelete('Colors', [
      {
        name: ['aquamarine', 'indigo']
      }

    ], {});

  }
};

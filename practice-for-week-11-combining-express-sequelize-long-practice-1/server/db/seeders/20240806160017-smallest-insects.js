'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('Insects', [
      {
        name: 'Western Pygmy Blue Butterfly',
        description: 'The smallest member of the butterfly family is thought to be the pygmy blue butterfly (Brephidium exilis).',
        territory: ' North America and as far west as Hawaii and the middle east',
        fact: 'It can be recognized by the copper brown and dull blue pattern at the bases of both wings',
        millimeters: 12,
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Insects', {
      name: ['Western Pygmy Blue Butterfly']
    })
  }
};

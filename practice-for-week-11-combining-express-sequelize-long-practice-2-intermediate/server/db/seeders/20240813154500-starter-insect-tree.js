'use strict';

// 1. Import the models into the seeder file
const { Insect, Tree, InsectTree } = require('../models');

// 2. Establish a single data source for the seeds
const insectTrees = [
  {
    insect: { name: "Western Pygmy Blue Butterfly" },
    trees: [
      { tree: "General Sherman" },
      { tree: "General Grant" },
      { tree: "Lincoln" },
      { tree: "Stagg" },
    ],
  },
  {
    insect: { name: "Patu Digua Spider" },
    trees: [
      { tree: "Stagg" },
    ],
  },
];

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
   for ( let insectIdx = 0; insectIdx < insectTrees.length; insectIdx++ ) {
      const { insect, trees } = insectTrees[insectIdx];
      const dbInsect = await Insect.findOne( { where: {name: insect.name} });

      for ( let treeIdx = 0; treeIdx < trees.length; treeIdx++ ) {
        const tree = trees[treeIdx];
        const dbTree = await Tree.findOne({ where: { tree: tree.tree}});

        await InsectTree.create({ insectId: dbInsect.id, treeId: dbTree.id});
      }
    }
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    for ( let insectIdx = 0; insectIdx < insectTrees.length; insectIdx++ ) {
      const { insect, trees } = insectTrees[insectIdx];
      const dbInsect = await Insect.findOne( { where: { name: insect.name } });

      for ( let treeIdx = 0; treeIdx < trees.length; treeIdx++ ) {
        const tree = trees[treeIdx];
        const dbTree = await Tree.findOne({ where: { tree: tree.tree}});

        await InsectTree.destroy({ where: { insectId: dbInsect.id, tree: tree.tree}});
      }
    }
  }
};

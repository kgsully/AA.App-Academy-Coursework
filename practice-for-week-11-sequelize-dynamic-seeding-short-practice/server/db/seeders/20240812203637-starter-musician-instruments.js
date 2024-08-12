'use strict';
const { Op } = require("sequelize");

const { Musician, Instrument } = require('../models');

const musicianInstruments = [
  {
    musician: { firstName: 'Adam', lastName: 'Appleby' },
    instruments: [{ type: 'piano' }, { type: 'guitar' }]
  },
  {
    musician: { firstName: 'Anton', lastName: 'Martinovic' },
    instruments: [{ type: 'piano' }, { type: 'bass' }]
  },
  {
    musician: { firstName: 'Wilson', lastName: 'Holt' },
    instruments: [{ type: 'cello' }]
  },
  {
    musician: { firstName: 'Marine', lastName: 'Sweet' },
    instruments: [{ type: 'saxophone' }]
  },
  {
    musician: { firstName: 'Georgette', lastName: 'Kubo' },
    instruments: [{ type: 'drums' }, { type: 'trumpet' }, { type: 'saxophone' }]
  },
  {
    musician: { firstName: 'Aurora', lastName: 'Hase' },
    instruments: [{ type: 'violin' }, { type: 'cello' }]
  },
  {
    musician: { firstName: 'Trenton', lastName: 'Lesley' },
    instruments: [{ type: 'piano' }]
  },
  {
    musician: { firstName: 'Camila', lastName: 'Nenci' },
    instruments: [{ type: 'piano' }]
  },
  {
    musician: { firstName: 'Rosemarie', lastName: 'Affini' },
    instruments: [{ type: 'piano' }, { type: 'violin' }]
  },
  {
    musician: { firstName: 'Victoria', lastName: 'Cremonesi' },
    instruments: [{ type: 'violin' }]
  },
];

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

    for (let musicianIdx = 0; musicianIdx < musicianInstruments.length; musicianIdx++) {

      // For each object, destructure the musician and instruments keys
      const { musician, instruments} = musicianInstruments[musicianIdx];
      const { firstName, lastName } = musician;

      // Query for a reference to the Musician instance with matching attributes
      const dbMusician = await Musician.findOne({ where: {firstName, lastName}});

      //  Query for a reference to the collection of Instrument instances with corresponding matching records
      const dbInstruments = await Instrument.findAll({
        where: {
          [Op.or]: instruments
        }
      });

      // With these references, use the addInstruments method provided by the belongsToMany association to create the necessary records.
      await dbMusician.addInstruments(dbInstruments);

    }

  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    for (let musicianIdx = 0; musicianIdx < musicianInstruments.length; musicianIdx++) {

      // For each object, destructure the musician and instruments keys
      const { musician, instruments} = musicianInstruments[musicianIdx];
      const { firstName, lastName } = musician;

      // Query for a reference to the Musician instance with matching attributes
      const dbMusician = await Musician.findOne({ where: {firstName, lastName}});

      //  Query for a reference to the collection of Instrument instances with corresponding matching records
      const dbInstruments = await Instrument.findAll({
        where: {
          [Op.or]: instruments
        }
      });

      // With these references, use the addInstruments method provided by the belongsToMany association to create the necessary records.
      await dbMusician.removeInstruments(dbInstruments);

    }
  }
};

/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

// Need char, mongoose, and model for these tests
const chai = require('chai');
const mongoose = require('mongoose');

const { expect } = chai;
const Player = require('../models/Player');

// object id used in tests
const id = new mongoose.Types.ObjectId();

describe('Database Tests', () => {
  // Before the tests, connect to the db
  before((done) => {
    mongoose.connect('mongodb://localhost:27017/test');
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error'));
    db.once('open', () => {
      done();
    });
  });

  // Mongoose tests
  describe('Mongoose Model', () => {
    it('Should save data to the database (regardless of fields)', (done) => {
      // Create a new player
      const player = new Player({
        _id: id,
        first_name: 'Chris',
      });
      // Yry to save that player
      player.save(done);
    });

    it('Should retrieve data from the database', (done) => {
      // Find a player with that object ID
      Player.findById(id, (err, player) => {
        if (err) throw err;
        if (!player) throw new Error('No data!');
        // Make sure proper player found
        expect(player.first_name).to.equal('Chris');
        done();
      });
    });

    it('Should delete data from the database', (done) => {
      Player.findOneAndDelete({ first_name: 'Chris' }, (err, player) => {
        if (err) throw err;
        if (!player) throw new Error('No data');
        expect(player.first_name).to.equal('Chris');
        done();
      });
    });
  });

  // Delete all database insertions and close the db when done with tests.
  after((done) => {
    mongoose.connection.db.dropDatabase(() => {
      mongoose.connection.close(done);
    });
  });
});

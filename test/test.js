/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

// Even though I'm not using chai for these database tests, for future tests
const chai = require('chai');
const mongoose = require('mongoose');

const { expect } = chai;
const Player = require('../models/Player');

const id = new mongoose.Types.ObjectId();

describe('Database Tests', () => {
  before((done) => {
    mongoose.connect('mongodb://localhost:27017/test');
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error'));
    db.once('open', () => {
      console.log('We are connected to test database!');
      done();
    });
  });

  describe('Mongoose Model', () => {
    it('Should save data to the database (regardless of fields)', (done) => {
      const player = new Player({
        _id: id,
        first_name: 'Chris',
      });
      player.save(done);
    });

    it('Should retrieve data from the database', (done) => {
      Player.findById(id, (err, player) => {
        if (err) throw err;
        if (!player) throw new Error('No data!');
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

  after((done) => {
    mongoose.connection.db.dropDatabase(() => {
      mongoose.connection.close(done);
    });
  });
});

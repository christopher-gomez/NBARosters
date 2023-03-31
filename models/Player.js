const mongoose = require('mongoose');

// eslint-disable-next-line prefer-destructuring
const Schema = mongoose.Schema;

const playerSchema = new Schema({
  first_name: String,
  last_name: String,
  full_name: String,
  position: String,
  height_feet: Number,
  height_inches: Number,
  weight_pounds: Number,
  team: {
    id: Number,
    abbreviation: String,
    city: String,
    conference: String,
    division: String,
    full_name: String,
    name: String,
  },
  additional_facts: Array,
});

const Player = mongoose.model('Player', playerSchema, 'NBAPlayers');
module.exports = Player;

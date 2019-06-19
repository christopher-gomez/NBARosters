const express = require('express');
const request = require('request');
const mongoose = require('mongoose');
const Player = require('../models/Player');

const nbaRoutes = express.Router();

// Get all teams (From external API)
nbaRoutes.route('/teams').get((req, res) => {
  // API access point + we want JSON
  const options = {
    url: 'https://www.balldontlie.io/api/v1/teams',
    json: true,
  };
  request.get(options, (error, response, body) => {
    // Everything went well, return the response
    if (!error && response.statusCode === 200) {
      return res.status(200).send({
        teams: body.data,
      });
    }
    // Something went wrong
    return res.status(500).send();
  });
});

// Get a specific team by ID (From external API)
nbaRoutes.route('/teams/:id').get((req, res) => {
  const options = {
    url: `https://www.balldontlie.io/api/v1/teams/${req.params.id}`,
    json: true,
  };
  request.get(options, (error, response, team) => {
    if (!error && response.statusCode === 200) {
      return res.status(200).send({
        team,
      });
    }
    return res.status(500).send();
  });
});

// Get all players on a specific team
nbaRoutes.route('/teams/:team/players/').get((req, res) => {
  // Mongoose queries make things easy
  Player.find({ 'team.name': req.params.team }, (error, players) => {
    // something went wrong
    if (error) {
      return res.status(500).send();
    }
    // Return query results
    return res.status(200).send({
      players,
    });
  });
});

// Check if players have been downloaded from external API into db
nbaRoutes.route('/players/check').get((req, res) => {
  // Count the players in the collection, probably not the best way to do it
  /* What if user deletes all official players and only custom players remain?
     Still returns true. Maybe don't let users delete official players?
     Include a flag in player schema: Official vs Custom
  */
  mongoose.connection.collection('players').countDocuments((err, count) => {
    if (err) {
      return res.status(500).send();
    }
    if (count > 0) {
      return res.status(200).send({
        exist: true,
      });
    }
    return res.status(200).send({
      exist: false,
    });
  });
});

// Get all players in db
nbaRoutes.route('/players').get((req, res) => {
  Player.find({}, (error, players) => {
    if (error) {
      return res.status(500).send();
    }
    return res.status(200).send({
      players,
    });
  });
});

// Get a specific player by ID
nbaRoutes.route('/players/:id').get((req, res) => {
  Player.findById(req.params.id, (err, player) => {
    if (err) {
      return res.status(500).send();
    }
    return res.status(200).send({
      player,
    });
  });
});

// Create a new player
nbaRoutes.route('/players').post((req, res) => {
  const newPlayer = new Player({
    first_name: req.body.player.first_name,
    last_name: req.body.player.last_name,
    full_name: `${req.body.player.first_name} ${req.body.player.last_name}`,
    position: req.body.player.position,
    height_feet: req.body.player.height_feet,
    height_inches: req.body.player.height_inches,
    weight_pounds: req.body.player.weight_pounds,
    team: {
      id: req.body.player.team.id,
      abbreviation: req.body.player.team.abbreviation,
      city: req.body.player.team.city,
      conference: req.body.player.team.conference,
      division: req.body.player.team.division,
      full_name: req.body.player.team.full_name,
      name: req.body.player.team.name,
    },
    additional_facts: [],
  });
  newPlayer.save((err) => {
    if (err) {
      return res.status(500).send();
    }
    return res.status(200).send();
  });
});

// Update a player
nbaRoutes.route('/players/:id').put((req, res) => {
  Player.findByIdAndUpdate(req.params.id, req.body.player, { new: true }, (err, player) => {
    if (err) {
      return res.status(500).send();
    }
    if (!player) {
      return res.status(500).send();
    }
    return res.status(200).send();
  });
});

// Delete a specific player
nbaRoutes.route('/players/:id').delete((req, res) => {
  Player.findByIdAndDelete(req.params.id, (err, player) => {
    if (err) {
      return res.status(500).send();
    }
    if (!player) {
      return res.status(500).send();
    }
    return res.status(200).send();
  });
});

// Download players from external API
/*
  External API returns max 100 players in a response and utilizes
  pagination.
  Easy Solution: Have client recurse or loop through pages until no more pages to download.
  Pass the current page from the client, to us, then external API
*/
nbaRoutes.route('/players/download/:page').get((req, res) => {
  const options = {
    url: `https://www.balldontlie.io/api/v1/players?page=${req.params.page}&per_page=100`,
    json: true,
  };
  // Get the response
  request.get(options, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      for (let i = 0; i < body.data.length; i += 1) {
        // IF player has incomplete data, we don't even want him. Useless
        if (body.data[i].height_feet === null || body.data[i].position === '') {
          // Continue to the next player
          // eslint-disable-next-line no-continue
          continue;
        }
        // Create the player with the response data
        const player = new Player({
          first_name: body.data[i].first_name,
          last_name: body.data[i].last_name,
          full_name: `${body.data[i].first_name} ${body.data[i].last_name}`,
          position: body.data[i].position,
          height_feet: body.data[i].height_feet,
          height_inches: body.data[i].height_inches,
          weight_pounds: body.data[i].weight_pounds,
          team: {
            id: body.data[i].team.id,
            abbreviation: body.data[i].team.abbreviation,
            city: body.data[i].team.city,
            conference: body.data[i].team.conference,
            division: body.data[i].team.division,
            full_name: body.data[i].team.full_name,
            name: body.data[i].team.name,
          },
          additional_facts: [],
        });
        // Save him
        player.save();
      }
      // Return the current page we just downloaded so client
      // can continue to the next.
      return res.status(200).send({
        meta: body.meta,
      });
    }
    return res.status(500).send();
  });
});

module.exports = nbaRoutes;

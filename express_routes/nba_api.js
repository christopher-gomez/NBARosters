/* eslint-disable no-console */
const express = require('express');
const request = require('request');
const mongoose = require('mongoose');
const Player = require('../models/Player');

const nbaRoutes = express.Router();

nbaRoutes.route('/teams').get((req, res) => {
  const options = {
    url: 'https://www.balldontlie.io/api/v1/teams',
    json: true,
  };
  request.get(options, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      return res.status(200).send({
        teams: body.data,
      });
    }
    return res.status(500);
  });
});

nbaRoutes.route('/teams/:id').get((req, res) => {
  const options = {
    url: `https://www.balldontlie.io/api/v1/teams/${req.params.id}`,
    json: true,
  };
  request.get(options, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      return res.status(200).send({
        team: body,
      });
    }
    return res.status(500);
  });
});

nbaRoutes.route('/players/check').get((req, res) => {
  console.log('checking players\n\n');
  mongoose.connection.collection('players').countDocuments((err, count) => {
    if (err) {
      return res.status(500);
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

nbaRoutes.route('/players').get((req, res) => {
  Player.find({}, (error, players) => {
    if (error) {
      return res.status(500);
    }
    return res.status(200).send({
      players,
    });
  });
});

nbaRoutes.route('/players/:id').get((req, res) => {
  Player.find({ id: req.params.id }, (err, player) => {
    if (err) {
      return res.status(500);
    }
    return res.status(200).send({
      player,
    });
  });
});

nbaRoutes.route('/players/:team').get((req, res) => {
  Player.find({ 'team.name': req.params.team }, (error, players) => {
    if (error) {
      return res.status(500);
    }
    return res.status(200).send({
      players,
    });
  });
});

nbaRoutes.route('/players').post((req, res) => {
  const newPlayer = new Player({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    position: req.body.position,
    height_feet: req.body.height_feet,
    height_inches: req.body.height_inches,
    weight_pounds: req.body.weight_pounds,
    team: {
      id: req.body.team.id,
      abbreviation: req.body.team.abbreviation,
      city: req.body.team.city,
      conference: req.body.team.conference,
      division: req.body.team.division,
      full_name: req.body.team.full_name,
      name: req.body.team.name,
    },
  });
  newPlayer.save((err) => {
    if (err) {
      return res.status(500);
    }
    return res.status(200);
  });
});

nbaRoutes.route('/players/:id').put((req, res) => {
  Player.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, player) => {
    if (err) {
      return res.status(500);
    }
    if (!player) {
      return res.status(500);
    }
    return res.status(200);
  });
});

nbaRoutes.route('/players/:id').delete((req, res) => {
  Player.findByIdAndDelete(req.params.id, (err, player) => {
    if (err) {
      return res.status(500);
    }
    if (!player) {
      return res.status(500);
    }
    return res.status(200);
  });
});

nbaRoutes.route('/players/download/:page').get((req, res) => {
  const options = {
    url: `https://www.balldontlie.io/api/v1/players?page=${req.params.page}&per_page=100`,
    json: true,
  };
  request.get(options, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      for (let i = 0; i < body.data.length; i += 1) {
        if (body.data[i].height_feet === null || body.data[i].position === '') {
          // eslint-disable-next-line no-continue
          continue;
        }
        const player = new Player({
          id: body.data[i].id,
          first_name: body.data[i].first_name,
          last_name: body.data[i].last_name,
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
        });
        player.save();
      }
      return res.status(200).send({
        meta: body.meta,
      });
    }
    return res.status(500);
  });
});

module.exports = nbaRoutes;

const express = require('express');
const request = require('request');

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

nbaRoutes.route('/players/:page').get((req, res) => {
  const options = {
    url: `https://www.balldontlie.io/api/v1/players?page=${req.params.page}&per_page=100`,
    json: true,
  };
  request.get(options, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      return res.status(200).send({
        players: body.data,
        meta: body.meta,
      });
    }
    return res.status(500);
  });
});

module.exports = nbaRoutes;

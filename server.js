const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const serveStatic = require('serve-static');
const path = require('path');

const app = express();
const server = require('http').createServer(app);
const mongoose = require('mongoose');

app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false,
}));
app.use(cors());

mongoose.connect('mongodb://localhost:27017/NBA');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'mongoose connection error'));
db.once('open', () => {
  console.log('mongoose connection succeeded');
});

const nbaRoutes = require('./express_routes/nba_api.js');

app.use('/nba', nbaRoutes);
app.use('/', serveStatic(path.join(__dirname, '/dist')));
// Catch all routes and redirect to the index file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/dist/index.html'));
});

const port = process.env.PORT || 3000;
server.listen(port);

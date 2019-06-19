// Dependiencies/middleware
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const serveStatic = require('serve-static');
const path = require('path');
const mongoose = require('mongoose');

// Create the app (Express instance, app entrypoint)
const app = express();
const server = require('http').createServer(app);

// Set up middleware
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false,
}));
app.use(cors());

// Determine mongoDB URL
let murl = 'mongodb://localhost:27017/NBA';
if (process.env.NODE_ENV === 'production') {
  murl = process.env.PROD_MONGODB;
}

// Connect to mongo
mongoose.connect(murl);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'mongoose connection error'));
db.once('open', () => {
  console.log('mongoose connection succeeded');
});

// Set up express API routes
const nbaRoutes = require('./express_routes/nba_api.js');

app.use('/nba', nbaRoutes);

// If not accessing the API, serve up the frontend
app.use('/', serveStatic(path.join(__dirname, '/dist')));
// Catch all routes and redirect to the index file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/dist/index.html'));
});


// Determine server port
const port = process.env.PORT || 3000;

// Listen for connections on port
server.listen(port);

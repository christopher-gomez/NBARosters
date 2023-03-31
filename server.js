// Dependiencies/middleware
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const serveStatic = require("serve-static");
const path = require("path");
// const history = require('connect-history-api-fallback');

// Create the app (Express instance, app entrypoint)
const app = express();

// Set up middleware
app.use(morgan("combined"));
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(cors());
// app.use(history());

// Set up express API routes
const nbaRoutes = require("./express_routes/nba_api.js");

app.use("/nba", nbaRoutes);

// If not accessing the API, serve up the frontend
app.use("/", serveStatic(path.join(__dirname, "/dist"), { etag: false, lastModified: false }));
// Catch all routes and redirect to the index file
app.get("*", (req, res) => {
  res.set({ "Content-Type": "text/html" });
  res.sendFile(path.join(__dirname, "/dist/index.html"), { etag: false, lastModified: false });
});

const server = require("http").createServer(app);

module.exports = server;

// // Determine server port
// const port = process.env.PORT || 3000;

// // Listen for connections on port
// server.listen(port);

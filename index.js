require("dotenv").config();

const mongoose = require("mongoose");
const app = require("./server");

// Determine mongoDB URL
let murl = "mongodb://localhost:27017/NBA";
if (process.env.NODE_ENV === "production") {
  murl = process.env.MONGODB_URL;
}

let server;
// Connect to mongo
mongoose.connect(murl);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "mongoose connection error"));
db.once("open", () => {
  console.log("mongoose connection succeeded");

  // Determine server port
  const port = process.env.PORT || 3000;

  // Listen for connections on port
  server = app.listen(port, () => {
    console.log(`Listening to port ${port}`);
  });
});

const exitHandler = () => {
  if (server) {
    server.close(() => {
      console.log("Server closed");
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error) => {
  console.error(error);
  exitHandler();
};

process.on("uncaughtException", unexpectedErrorHandler);
process.on("unhandledRejection", unexpectedErrorHandler);

process.on("SIGTERM", () => {
  console.log("SIGTERM received");
  if (server) {
    server.close();
  }
});

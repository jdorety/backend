const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const server = express();

server.use(cors(), helmet(), express.json());

server.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to build week!" });
});

module.exports = server;

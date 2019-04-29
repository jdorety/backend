const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const userRouter = require("./routers/userRouter.js");
const partiesRouter = require("./routers/partiesRouter.js");
const todosRouter = require("./routers/todosRouter.js");

const server = express();

server.use(cors(), helmet(), express.json());

server.use("/api/user", userRouter);
server.use("/api/party", partiesRouter);
server.use("/api/todos", todosRouter);

server.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to build week!" });
});

module.exports = server;

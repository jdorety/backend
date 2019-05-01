const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const authRouter = require("./routers/authRouter.js");
const userRouter = require("./routers/userRouter.js");
const partiesRouter = require("./routers/partiesRouter.js");
const todosRouter = require("./routers/todosRouter.js");
const entertainmentRouter = require("./routers/entertainmentRouter.js");
const shoppingRouter = require("./routers/shoppingRouter.js");

const server = express();

server.use(cors(), helmet(), express.json()), morgan("tiny");

server.use("/api/auth", authRouter);
server.use("/api/user", userRouter);
server.use("/api/party", partiesRouter);
server.use("/api/todos", todosRouter);
server.use("/api/entertainment", entertainmentRouter);
server.use("/api/shopping", shoppingRouter);

server.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to build week!" });
});

module.exports = server;

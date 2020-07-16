// require("dotenv").config();

const chalk = require("chalk");
const express = require("express");
const { client } = require("./db");
const path = require("path");
const bodyParser = require("body-parser");
const apiRouter = require("./api");

const server = express();
const PORT = process.env.PORT || 3000;

client.connect();

server.use(bodyParser.json());
server.use(express.static(path.join(__dirname, "../dist")));
server.use("/api", apiRouter);

server.listen(PORT, () =>
  console.log(chalk.red(`Big Brother can see you on port ${PORT}`))
);

server.get("/health", (req, res, next) => {
  res.send({
    message: "Server is healthy!"
  });
});

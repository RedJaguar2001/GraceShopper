require("dotenv").config();

const chalk = require("chalk");
const express = require("express");
const { client } = require("./db");
const path = require("path");
const BodyParser = require("body-parser");
const apiRouter = require("./api");

const server = express();
const { PORT = 3000 } = process.env;

client.connect();

server.use(BodyParser.json());
server.use(express.static(path.join(__dirname, "./dist")));
server.use("/graceshopper", apiRouter);
server.listen(PORT, () =>
  console.log(chalk.red(`Big Brother can see you on port ${PORT}`))
);

server.get("/health", (req, res, next) => {
  res.send("Server is active");
});

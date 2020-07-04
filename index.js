require("dotenv").config();

const express = require("express");
const { client } = require("./src/db");
const path = require("path");
const BodyParser = require("body-parser");
const apiRouter = require("./src/api");
const server = express();
const { PORT = 3000 } = process.env;

client.connect();

server.use(BodyParser.json());
server.use(express.static(path.join(__dirname, "./dist")));
server.use("/api", apiRouter);

server.listen(PORT, () =>
  console.log(`Big Brother can see you on port ${PORT}`)
);

server.get("/health", (req, res, next) => {
  res.send("Server is active");
});

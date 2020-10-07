const express = require("express");
// const fileUpload = require('express-fileupload');
const helmet = require("helmet");
const cors = require("cors");
const bodyParser = require('body-parser')

const posts = require("../posts/posts-router");
const admin = require("../admin-router");
const authLogReg = require("../auth/auth-log-reg");
const authenticate = require("../auth/auth-middleware");

// const users = require("../users/users-router.js");

const server = express();

server.use(helmet());
server.use(express.json());
// server.use(bodyParser.urlencoded({ extended: false }));
// server.use(bodyParser.json());
// server.use(fileUpload());
server.use(cors());

server.use("/api/auth", authLogReg);
server.use("/api/posts", posts);
server.use("api/admin", admin)
// server.use("/api/users", users);

server.get("/", (req, res) => {
  res.send(`<h1>Doggo Botto</h1>`);
});

module.exports = server;
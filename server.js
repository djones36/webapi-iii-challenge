const express = require('express');

const server = express();

//logger here
server.use(logger)// <= logger

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`)
});

server.use(errorHandler)

//custom middleware

function logger(req, res, next) {
  console.log(`${req.method} to ${req.path} at ${new Date().toISOString()}`)
  next()
};

function errorHandler(err, req, res, next) {
  console.log(err)
}

module.exports = server;

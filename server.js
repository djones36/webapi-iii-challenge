const express = require('express');

const server = express();

const userRoute = require('./users/userRouter')

server.use(express.json());


//logger here
server.use(logger)// <= logger
server.use('/api/user', userRoute)

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

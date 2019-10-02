// code away!

//Import server
const server = require('./server')
const PORT = 8000

server.listing(PORT, () => console.log(`Running on port${PORT}`))
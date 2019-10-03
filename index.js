// code away!

//Import server
const server = require('./server')
const PORT = 8000

server.listen(PORT, () => console.log(`Running on port ${PORT}`))
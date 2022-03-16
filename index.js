const server = require('./staticsiteserver/staticsiteserver')
const app = new server()
app.start(3000)

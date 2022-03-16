const http = require('http')
const fs = require('fs')
const path = require('path')

class StaticSiteServer {
  constructor() {
    this.contentTypeHeader = {'Content-Type': 'text/html'}
    this.server = null
    this.staticFolder = path.join(process.cwd(), '/static')
    this.errorPagePath = path.join(this.staticFolder, '/404.html')
  }

  start(port = 3000) {
    let errorPage;

    fs.readFile(this.errorPagePath, (err, data) => {
      if (err) {
        errorPage = '<h1>404 Page not found!</h1>'
        return
      }
      errorPage = data
    })

    this.server = http.createServer((req, res) => {
      let filePath;
      if (req.url === '/') {
        filePath = path.join(this.staticFolder, `/index.html`)
      } else {
        filePath = path.join(this.staticFolder, `${req.url}.html`)
      }

      fs.readFile(filePath, (err, data) => {
        if (err) return this.respond(res, 404, errorPage)

        return this.respond(res, 200, data)
      })

    })

    this.server.listen(port, () => {
      console.log(`[StaticSiteServer] - Server is running at http://localhost:${port}`)
    })
  }

  respond(res, code, fileData) {
    res.writeHead(code, this.contentTypeHeader)
    res.end(fileData)
  }

}

module.exports = StaticSiteServer

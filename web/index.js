require(`dotenv-flow`).config()
const express = require (`express`)
const fs = require (`fs`)
const http = require (`http`)
const path = require (`path`)
const app = express()

const DIST_DIR = `dist`
const HTML_FILE = path.join (DIST_DIR, `index.html`)

app.use (express.static (DIST_DIR, {maxAge: `1d`}))

app.use(`*`, (req, res) => {
  fs.createReadStream (HTML_FILE).pipe (res)
})

const server = http.createServer(app)
const port = process.env.PORT || 3000

server.listen(port, () => {
  console.info(`🚀 Server ready at ${port}`)
})

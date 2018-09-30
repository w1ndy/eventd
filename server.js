const app = require('express')()
const { json, urlencoded } = require('body-parser')
const server = require('http').Server(app)
const io = require('socket.io')(server)

const API_KEY = process.env.API_KEY || 'CHANGE_THIS_KEY'

const host = process.env.HOST || 'localhost'
const port = process.env.PORT || 8999
server.listen(port, host)

console.log(`eventd server has started on http://${host}:${port}.`)

app.use(urlencoded())
app.use(json())

app.post('/invoke/:name', (req, res) => {
  if (!req.body || !req.body.key || req.body.key !== API_KEY) {
    res.sendStatus(401)
  } else {
    console.log(`emitting event ${req.params.name}...`)
    io.emit(req.params.name)
    res.sendStatus(200)
  }
})

io.on('connection', socket => {
  console.log('slave accepted')
  socket.on('disconnect', () => {
    console.log('slave left')
  })
})


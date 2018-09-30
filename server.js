const app = require('express')()
const { json, urlencoded } = require('body-parser')
const server = require('http').Server(app)
const io = require('socket.io')(server)

const API_KEY = 'z2fMqa8mt44A'

server.listen(process.env.PORT || 8999)
console.log('eventd server has started.')

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


const host = process.env.HOST || 'localhost'
const port = process.env.PORT || 8999
const uri = `http://${host}:${port}`

const socket = require('socket.io-client')(uri, {
  'reconnection': true,
  'reconnectionDelay': 1000,
  'reconnectionDelayMax' : 5000
})

const EVENTS = {
  sleep: () => {
    const { spawn } = require('child_process')
    const proc = spawn('pmset', ['sleepnow'])
    proc.on('close', code => {
      console.log(`sleep invoked with ret code ${code}`)
    })
  }
}

console.log(`connecting to master at ${uri}...`)

socket.on('connect', () => {
  console.log(`successfully connected to ${uri}`)
})

socket.on('reconnecting', () => {
  console.log('reconnecting...')
})

socket.on('disconnect', () => {
  console.log(`disconnected!`)
})

for (const eventName in EVENTS) {
  socket.on(eventName, EVENTS[eventName])
}

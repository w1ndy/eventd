const host = process.env.HOST || 'localhost'
const port = process.env.PORT || 8999
const uri = `http://${host}:${port}`

const socket = require('socket.io-client')(uri, {
  'reconnection': true,
  'reconnectionDelay': 1000,
  'reconnectionDelayMax' : 5000,
  'reconnectionAttempts': 5
})

const EVENTS = {
  displaysleep: () => {
    const { spawn } = require('child_process')
    const proc = spawn('pmset', ['displaysleepnow'])
    proc.on('close', code => {
      console.log(`displaysleep invoked with ret code ${code}`)
    })
  }
}

console.log(`connecting to master at ${uri}...`)

socket.on('connect', () => {
  console.log(`successfully connected to ${uri}`)
})

socket.on('disconnect', () => {
  console.log(`disconnected!`)
})

for (const eventName in EVENTS) {
  socket.on(eventName, EVENTS[eventName])
}
const host = process.env.HOST || 'localhost:8999'
const socket = require('socket.io-client')(`http://${host}`, {
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

console.log(`connecting to http://${host}...`)

socket.on('connect', () => {
  console.log(`successfully connected to http://${host}`)
})

socket.on('disconnect', () => {
  console.log(`disconnected!`)
})

for (const eventName in EVENTS) {
  socket.on(eventName, EVENTS[eventName])
}
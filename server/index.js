const express = require('express')
const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const host = process.env.HOST || '127.0.0.1'
const port = process.env.PORT || 3000

app.set('port', port)

// Import and Set Nuxt.js options
let config = require('../nuxt.config.js')
config.dev = !(process.env.NODE_ENV === 'production')

async function start() {
  // Init Nuxt.js
  const nuxt = new Nuxt(config)

  //init mongodb
  let dev_db_url =
    'mongodb+srv://lolclanapp:IxpbwIc54AORq5lF@cluster0-ielix.mongodb.net/lolclanapp'
  const mongoDB = dev_db_url

  mongoose.connect(mongoDB)
  mongoose.Promise = global.Promise

  const db = mongoose.connection
  db.on('error', console.error.bind(console, 'MongoDB connection error:'))

  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  }
  //use body parser
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: false }))

  //set api route
  setApiRoute(app)

  // Give nuxt middleware to express
  app.use(nuxt.render)

  // Listen the server
  let server = app.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })

  socketStart(server)
  console.log('Socket.IO Start')
}

function setApiRoute(app) {
  const userRoute = require('./../routes/user.route')
  app.use('/api/user', userRoute)
}

let messageQueue = []
let userList = []

function socketStart(server) {
  const io = require('socket.io').listen(server)

  //listening server
  io.on('connection', socket => {
    console.log('id : ' + socket.id + ' is connected !')

    //send all message queue
    if (messageQueue.length > 0) {
      messageQueue.forEach(message => {
        socket.emit('new-message', message)
      })
    }

    //on send message event
    socket.on('send-message', message => {
      console.log('On send message : ' + message)
      messageQueue.push(message)
      socket.broadcast.emit('new-message', message)

      //clear message queue if length > 20
      if (messageQueue.length > 20) {
        messageQueue = messageQueue.slice(-20)
      }
    })

    //on add new user to online member list
    socket.on('add-user', username => {
      //send all user online
      if (userList.length > 0) {
        userList.forEach(user => {
          if (user.username != username)
            socket.emit('user-joined', {
              username: user.username,
              numUsers: userList.length
            })
        })
      }

      if (isUserOnline(userList, username)) {
        //push new user to array
      } else {
        userList.push({ username: username })
        socket.username = username
        socket.broadcast.emit('user-joined', {
          username,
          numUsers: userList.length
        })
      }
      socket.emit('count-users', { numUsers: userList.length })
    })

    //on disconect
    socket.on('disconnect', function() {
      console.log('disconnect : userlist')
      console.log(userList)
      let username = socket.username

      //if this user already logged in and exist in array then remove it
      // and sub numUsers
      if (isUserOnline(userList, socket.username)) {
        //remove user from userlist
        userList.splice(getUserIndex(userList, username), 1)

        console.log('disconnect 2 : userlist')
        console.log(userList)
      }

      //send broadcast emit to all user
      socket.broadcast.emit('user-disconnected', {
        username,
        numUsers: userList.length
      })
      console.log('USer : ' + socket.id + ' is disconnected !')
    })
  })
}

function isUserOnline(userList, username) {
  let currentIndex = getUserIndex(userList, username)

  if (currentIndex > -1) return true

  return false
}

function getUserIndex(userList, username) {
  return userList.findIndex(data => data.username == username)
}

start()

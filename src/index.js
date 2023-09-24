const express = require('express')
const db = require('./db/dbase')
const userRouter = require('./routers/user')
const quizRouter = require('./routers/quiz')
const adminRouter = require('./routers/admin')
const bodyParser = require('body-parser')
const hbs = require('hbs')
const cookieParser = require('cookie-parser')
const path = require('path')
const { generateMessage, } = require('./utils/messages')
const { addUser, removeUser, getUser, getUsersInRoom } = require('./utils/users')
const Filter = require('bad-words')
require('dotenv')


hbs.registerHelper('ifCond', function(v1, options) {
    if(v1 === '1') {
        return options.fn(this);
    }
    return options.inverse(this);
});

hbs.registerHelper('ifCond2', function(v1, v2, options) {
    console.log(v1, v2);
    if(true) {
        return options.fn(this);
    }
    return options.inverse(this);
});




const app = express()

app.set('view engine', 'hbs')
app.use(express.static(path.join(__dirname, "../public")));

app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(adminRouter)
app.use(userRouter)
app.use(quizRouter)


//Socket
const http = require('http')
const socket = require('socket.io')
const server = http.createServer(app)
const io = socket(server)

// const io = require('socket.io')(3001)


io.on('connection', async (socket) => {
    console.log('New WebSocket connection')

    socket.on('join', async (options, callback) => {
        
        var users = await addUser( socket.id, userRouter.username_var )
        
        socket.emit('message', generateMessage('Admin', 'Welcome!'))
        socket.broadcast.emit('message', generateMessage('Admin', `${userRouter.username_var} has joined!`))
        io.emit('roomData', {
            room: 'People Online',
            users: getUsersInRoom()
        })

       callback()
    })

    socket.on('sendMessage', (message, callback) => {
        const user = getUser(socket.id)
        const filter = new Filter()

        if (filter.isProfane(message)) {
            return callback('Profanity is not allowed!')
        }

        io.emit('message', generateMessage(user.username, message))
        callback()
    })

    // socket.on('sendLocation', (coords, callback) => {
    //     const user = getUser(socket.id)
    //     io.to(user.room).emit('locationMessage', generateLocationMessage(user.username, `https://google.com/maps?q=${coords.latitude},${coords.longitude}`))
    //     callback()
    // })

    socket.on('disconnect', () => {
        const user = removeUser(socket.id)

        if (user) {
            io.emit('message', generateMessage('Admin', `${user.username} has left!`))
            io.emit('roomData', {
                room: 'People Online',
                users: getUsersInRoom()
            })
        }
    })
})


server.listen(3000, () => {
  console.log("Server is up on port " + 3000);
});

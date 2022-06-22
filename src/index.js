const path = require('path')
const express = require('express')
const http = require('http')
const socketIo = require('socket.io')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const validate = require('./middleware/validation')
const userRouter = require('./routers/users.js')
const messageRouter = require('./routers/messages.js')
const fileRouter = require('./routers/files')
const { readFile } = require('./utils/utils')



let app = express()
let server = http.createServer(app)



// MIDDLEWARES
app.use(express.json())
app.use(cors());
app.use(fileUpload())
app.use(validate)
app.use(express.static(path.join(__dirname, 'uploads')))



//ROUTES
app.use(userRouter)
app.use(messageRouter)
app.use(fileRouter)



//HANDLE ERROR
app.use((err, req, res, next) => {
    if(err.status >= 400 && err.status < 500){
        return res.status(err.status).send({
            status : err.status,
            message: err.message
        })
    }  
    res.status(500).send({
        status: 500,
        message: err.message
    })
})



let io = socketIo(server)



io.on('connection', client => {
    client.on('new', (data) => {
        
        let messages = readFile('messages')
        let date = new Date()

        if(data.file){
            data.file = messages.at(-1).file
            data.type = 'file'
        } else {
            data.type = "text"
        }
        
        data.date = date.toLocaleDateString()
        data.time = `${date.getHours()}:${date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()}`
        data.messageId = +messages.at(-1).messageId + 1 || 1
        
        client.broadcast.emit('send message', data)
    })

})



const PORT = process.env.PORT || 3000

server.listen(PORT, () => console.log(`Server is runing on ${PORT} port`))

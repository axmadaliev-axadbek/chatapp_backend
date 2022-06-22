const path = require('path')
const { readFile, writeFile } =  require('../utils/utils')


const PostMessage = (req, res) => {
    let body = req.body
    let file = req.files
    let date = new Date()
    let messages = readFile("messages")

    if(file){
        let fileName = Date.now() + file.file.name.replace(/\s/g, "") 
        file.file.mv(path.join(__dirname, "../", 'uploads', 'files', fileName))
        body.file = {
            view : `https://new-chat-najot-talim.herokuapp.com/view/${fileName}`,
            download : `https://new-chat-najot-talim.herokuapp.com/download/${fileName}`
        }
        body.type = 'file'
        body.file.name = file.file.name
    } else {
        delete body.file
        body.type = "text"
    }


    body.date = date.toLocaleDateString()
    body.time = `${date.getHours()}:${date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()}`
    body.messageId = +messages.at(-1).messageId + 1 || 1

    messages.push(body)
    writeFile('messages', messages)

    res.status(201).send({
        status: 201,
        message : "message is added",
        data: body
    })
}


const GetMessages = (req, res) => {
    let messages = readFile('messages')
    res.status(200).send(messages)
}


module.exports = {
    PostMessage,
    GetMessages
}
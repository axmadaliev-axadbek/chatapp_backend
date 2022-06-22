const express = require('express')
const checkToken = require('../middleware/checkToken')
const { PostMessage, GetMessages } = require('../controllers/message')


let router = express.Router()


router.post('/message', checkToken, PostMessage)
router.get('/messages', checkToken, GetMessages)


module.exports = router
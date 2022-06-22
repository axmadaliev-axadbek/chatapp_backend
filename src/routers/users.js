const express = require('express')
const checkToken = require('../middleware/checkToken.js')
const { Register, Login, GetUsers } = require('../controllers/users.js')

let router = express.Router()

router.post('/register', Register)
router.post('/login', Login)
router.get('/users',  GetUsers)
// router.get('/users', checkToken , GetUsers)


module.exports = router
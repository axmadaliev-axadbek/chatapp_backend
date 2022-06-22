const express = require('express')
const { DownloadFile, GetFile } = require('../controllers/files')

let router = express.Router()


router.get('/view/:fileName', GetFile)
router.get('/download/:fileName', DownloadFile)

module.exports =  router
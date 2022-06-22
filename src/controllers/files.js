const path = require('path')


const GetFile = (req, res) => {
    let {fileName} = req.params
    res.sendFile(path.join(__dirname, '../', 'uploads', 'files', fileName))
}

const DownloadFile = (req, res) => {
    let {fileName} = req.params
    res.download(path.join(__dirname, '../', 'uploads', 'files', fileName))
}


module.exports = { 
    GetFile,
    DownloadFile
}
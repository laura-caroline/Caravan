const multer = require('multer')
const path = require('path')
const crypto = require('crypto')

const storage = multer.diskStorage({
    destination: (request,file, callback)=>{
        callback(null, path.resolve(__dirname, '..','..', 'uploads'))
    },
    filename: (request,file, callback)=>{
        console.log('filename'+ file)
        const hash = crypto.randomBytes(6).toString('hex')
        const file_name = `${hash}-${file.originalname}`
        
        callback(null, file_name)
    }
})

module.exports = storage
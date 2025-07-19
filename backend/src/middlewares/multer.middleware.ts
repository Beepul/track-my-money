import multer from 'multer'
import path from 'path'
import fs from 'fs'

const upload = multer({
    storage: multer.diskStorage({
        destination(req, file, callback) {
            if(!fs.existsSync('uploads/profile/')){
                fs.mkdirSync('uploads/profile/', {
                    recursive: true
                })
            }
            callback(null, 'uploads/profile/')
        },
        filename(req, file, callback) {
            const ext = path.extname(file.originalname);
            const uniqueName = Date.now() + '-' + Math.round(Math.random()*1e9) + ext;
            callback(null, uniqueName)
        },
    }),
    fileFilter(req, file, callback) {
        const allowedTypes = /jpeg|jpg|png|webp/;
        const isAllowed = allowedTypes.test(path.extname(file.originalname).toLowerCase())

        if(isAllowed){
            callback(null, isAllowed)
        }else {
            callback({message: "Image format not supported", name: "Invalid file format"})
        }
    },
    limits: {
        fileSize: 5 * 1024 * 1024
    }
})

export default upload
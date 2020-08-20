const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, 'assets/uploads')
    },
    filename: function (req, file, callback) {
        callback(null, file.fieldname + '-' + Date.now() + `${path.extname(file.originalname)}`);
    }
})

const uploadPicture = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 },
    fileFilter: function (req, file, callback) {
        if (file.mimetype === 'image/gif' || file.mimetype === 'image/png' || file.mimetype === 'image/jpeg')  {
            return callback(null, true);
        } else return callback(new Error('Only Images with gif, png or jpeg are allowed'))
    }
}).single('avatar')

module.exports = uploadPicture

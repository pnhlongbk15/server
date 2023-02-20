const multer = require('multer');
const upload = multer({
        storage: multer.memoryStorage(),
        fileFilter: (req, file, cb) => {
                // console.log('filter', file)
                // cb(new Error('file filter'), false)

                cb(null, true)
        },
        limits: 4000000
})

module.exports = upload



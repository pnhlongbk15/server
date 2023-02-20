const adminRouter = require('express').Router();

const admin = require('../controllers/admin.controller')
const authMiddleware = require('../middlewares/auth.middleware')
const upload = require('../middlewares/uploadFile')


adminRouter.get('/', admin.showLoginForm)
adminRouter.post('/upload',upload.single('imageTest'),admin.upload)
adminRouter.post('/login', authMiddleware.checkIsUserExist, admin.login)

adminRouter.get('/home', authMiddleware.isAdmin, admin.showHome)


module.exports = adminRouter;
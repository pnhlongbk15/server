const authRouter = require('express').Router()

const auth = require('../controllers/auth.controller')
// const authMiddleware = require('../middlewares/auth.middleware')
// const upload = require('../middlewares/uploadFile')


// authRouter.post('/signUp', authMiddleware.checkIsUserExist, auth.signUp);
// authRouter.post('/signIn', authMiddleware.checkIsUserExist, auth.signIn);

authRouter.get('/user/account/profile', (req, res) => {
        res.json({message: 'hi'})
})
// authRouter.post('/user/account/profile/update', auth.updateProfile)
// authRouter.get('/user/account/profile/address', auth.address)
// authRouter.post('/user/account/profile/address/add', auth.addAddress)
// authRouter.post('/user/account/profile/address/update', auth.updateAddress)

// authRouter.post('/user/account/profile/avatar/update', upload.single('avatar'), auth.updateAvatar)
// authRouter.get('/user/account/profile/avatar', auth.avatar)

module.exports = authRouter;
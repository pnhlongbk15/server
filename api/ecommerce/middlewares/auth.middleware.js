const { User } = require('../services/user.service');
const tokenUtil = require('../utils/token');
const passwordUtil = require('../utils/password');

module.exports = {
    checkIsUserExist: (req, res, next) => {
        const info = { email: req.body.email };
        User.find(info, (error, data) => {
            if (error) {
                res.status(400).json({ error: error.message });
                return;
            }
            // check data which database return
            if (data.length) {
                res.locals.check = data[0];
            }
            next();
        })
    },
    isAuth: (req, res, next) => {
        // if (req.session.accessToken) {
        //     res.redirect('/api/ecommerce/admin/home')
        // } else {
        //     next()
        // }
        const accessToken = req.headers.authorization?.split(' ')[1];
        if (accessToken) {
            tokenUtil.decodeToken(accessToken)
                .then(info => {
                    console.log(info)
                    User.find({ id: info.userId }, (error, data) => {
                        console.log(data)
                        if (error) {
                            res.status(400).json({ error: error.message });
                        }
                        if (data.length) {
                            res.locals.isAdmin = info.isAdmin;
                            req.body.userId = info.userId;
                            next()

                        } else {
                            res.status(400).json({ status: 'fail', message: "user doesn't exists." });
                        }
                    })
                }).catch(error => {
                    // token không đúng
                    res.status(400).json({ error: error.message });
                })
        } else {
            res.status(400).json({ status: 'fail', message: "You have to 'sign in' to do that." })
        }
    },
    isAdmin: (req, res, next) => {
        if (res.locals.isAdmin) {
            next()
        }
    }
}
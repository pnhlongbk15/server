module.exports = {
        isAdmin: (req, res, next) => {
                if (req.session.accessToken) {
                        const accessToken = req.session.accessToken.split(' ')[1];
                        tokenUtil.decodeToken(accessToken)
                                .then(info => {
                                        if (info.isAdmin) {
                                                User.find({ username: info.username }, (error, data) => {
                                                        if (error) {
                                                                res.status(400).json({ error: error.message });
                                                        }
                                                        if (data.length) {
                                                                if (data[0].password === info.password) {
                                                                        next()
                                                                } else {
                                                                        // password token không đúng.
                                                                        res.redirect('/api/ecommerce/admin')
                                                                }
                                                        } else {
                                                                res.status(400).json({ status: 'fail', message: "user doesn't exists." });
                                                        }
                                                })
                                        } else {
                                                res.status(400).json({ status: 'fail', message: "you don't have permission to access." });
                                        }
                                }).catch(error => {
                                        // token không đúng
                                        res.status(400).json({ error: error.message });
                                })
                } else {
                        res.redirect('/api/ecommerce/admin')
                }
        },
}
const { v4: uuidv4 } = require('uuid')

const { User, Address } = require('../services/user.service')
const Token = require('../services/token.service')
const passwordUtil = require('../helpers/password')
const tokenUtil = require('../helpers/token')

module.exports = {
    signUp: async (req, res) => {
        // create a user
        if (!res.locals?.check) {
            passwordUtil.encode(req.body.password)
                .then(hash => {
                    const user = new User({
                        id: uuidv4(),
                        username: req.body.username,
                        email: req.body.email,
                        password: hash,
                        image: process.env.AVATAR_DEFAULT
                    });
                    // save user in the database
                    User.create(user, (error, data) => {
                        if (error) {
                            res.status(400).json({ error: error.message });
                            return;
                        }
                        //success for register
                        res.status(201).json(data)
                    })
                }).catch(error => {
                    res.status(400).json({ error: error.message });
                })
        } else {
            res.status(400).json({ status: 'fail', message: 'user already exists.' })
        }
    },
    signIn: (req, res) => {
        if (res.locals?.check) {
            const hash = res.locals.check.password
            const userId = res.locals.check.id
            const username = res.locals.check.username
            console.log(res.locals.check)
            passwordUtil.verify(req.body.password, hash)
                .then(result => {
                    if (result) {
                        const accessToken = tokenUtil.generateAccessToken(res.locals.check);
                        const refreshToken = tokenUtil.generateRefreshToken(res.locals.check);

                        const token = new Token({
                            id: uuidv4(),
                            value: refreshToken,
                            userId: userId
                        })
                        // kiểm tra token có tồn tại k
                        tokenUtil.checkRefreshToken(userId).then(isValid => {
                            if (isValid) {
                                tokenUtil.storeRefreshToken(token).then(result => {
                                    if (result.status == 'success') {
                                        res.cookie('refreshToken', refreshToken, {
                                            httpOnly: true,
                                            secure: false,
                                            path: '/user',
                                            sameSite: 'strict'
                                        })
                                        // success for login
                                        res.status(201).json({ status: 'success', username, accessToken: `Bearer ${accessToken}` });
                                    }
                                })
                            } else {
                                // database has refresh token but drop it unsuccessful.
                                res.status(403).json({ status: 'fail', message: 'login unsuccesful.' });
                            }
                        }).catch(error => {
                            res.status(400).json({ error: error.message });
                        })
                    } else {
                        res.status(403).json({ status: 'fail', message: 'incorrect password' })
                    }
                }).catch(error => {
                    res.status(400).json({ error: error.message });
                })
        } else {
            res.status(404).json({ status: 'fail', message: "user doesn't exists." });
        }
    },
    removeAccount: (req, res) => {
        const info = { email: req.body.email }
        User.drop(info, (error, data) => {
            if (error) {
                res.status(400).json({ error: error.message });
                return;
            }
            res.status(201).json(data)
        })
    },
    profile: (req, res) => {
        const userId = { id: req.body.userId }
        User.profile(userId, (error, data) => {
            if (error) {
                console.error(error)
                res.status(400).json({ error: error.error });
                return;
            }

            res.status(200).json({ status: 'success', profile: data[0] })
        })
    },
    updateProfile: (req, res) => {
        const profile = req.body;
        const userId = {
            id: res.locals.id || "163e94cc-2888-4d37-b7cb-0c5611568b3a"
        }
        User.update(profile, userId, (error, data) => {
            if (error) {
                console.error(error)
                res.status(400).json({ error: error.error });
                return;
            }
            res.status(201).json({ status: 'success', message: data.message })
        })
    },
    address: (req, res) => {
        const userId = {
            userId: res.locals.id || "f4922e10-7db8-4414-b41d-633577f9a884"
        }
        User.address(userId, (error, data) => {
            if (error) {
                console.error(error)
                res.status(400).json({ error: error.error });
                return;
            }
            res.status(201).json({ status: 'success', address: data.address })
        })
    },
    addAddress: (req, res) => {
        console.log(req.body, 'addAddress')
        const data = { ...req.body };
        data.userId = res.locals.id || "f4922e10-7db8-4414-b41d-633577f9a884";
        data.id = uuidv4();

        User.addAddress(data, (error, data) => {
            if (error) {
                console.error(error)
                res.status(400).json({ error: error.error });
                return;
            }
            res.status(201).json({ status: 'success', message: data.message })
        })
    },
    updateAddress: (req, res) => {
        const data = { ...req.body }
        const cond = { userId: res.locals.id || "f4922e10-7db8-4414-b41d-633577f9a884" }
        User.updateAddress(data, cond, (error, data) => {
            if (error) {
                console.error(error)
                res.status(400).json({ status: 'error', message: error.error });
                return;
            }
            res.status(200).json({ status: 'success', message: data.message })
        })
    },
    updateAvatar: (req, res) => {
        // console.log(req.file)
        // if (req.file.size < 4000000) {

        const data = [
            { image: req.file.buffer.toString('base64') },
            { id: res.locals.id || "163e94cc-2888-4d37-b7cb-0c5611568b3a" }
        ]
        User.updateAvatar(data, (error, data) => {
            if (error) {
                console.error(error)
                res.status(400).json({ status: 'error', message: error.error });
                return;
            }
            res.status(200).json({ status: 'success', message: data.message })
        })
        // } else {
        //     res.status(400).json({ status: 'fail', message: 'image out size.' })
        // }
    },
    avatar: (req, res) => {
        const userId = {
            id: res.locals.id || "163e94cc-2888-4d37-b7cb-0c5611568b3a"
        }
        User.avatar(userId, (error, data) => {
            if (error) {
                console.error(error)
                res.status(400).json({ error: error.error });
                return;
            }
            res.status(200).json({ status: 'success', avatar: data.avatar })
        })
    }
}
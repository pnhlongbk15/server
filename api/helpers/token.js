const jwt = require('jsonwebtoken')
const Token = require('../services/token.service')

module.exports = {
    generateAccessToken: (user) => {
        console.log(user.userId)
        return jwt.sign(
            {
                userId: user.userId,
                isAdmin: user.isAdmin
            },
            'c04dab6bd71111a83f8dab1b749e5c92',
            { expiresIn: "265d" }
        )
    },
    generateRefreshToken: (user) => {
        return jwt.sign(
            {
                userId: user.userId,
                isAdmin: user.isAdmin
            },
            process.env.REFRESH_SECRET_KEY,
            { expiresIn: "265d" }
        )
    },
    decodeToken: (accessToken) => {
        console.log('decode',accessToken)
        return new Promise((resolve, reject) => {
            jwt.verify(
                accessToken,
                'c04dab6bd71111a83f8dab1b749e5c92',
                (error, payload) => {
                    console.log(error,payload)
                    if (error) reject(error);
                    resolve(payload);
                }
            )
        })
    },
    requestAccessToken: (refreshToken) => {
        return new Promise((resolve, reject) => {
            jwt.verify(
                refreshToken,
                process.env.REFRESH_SECRET_KEY,
                (error, payload) => {
                    if (error) reject(error);
                    resolve(payload);
                }
            )
        })
    },
    storeRefreshToken: (token) => {
        return new Promise((resolve, reject) => {
            Token.create(token, (error, data) => {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(data)
            })
        })
    },
    checkRefreshToken: (userId) => {
        return new Promise((resolve, reject) => {
            Token.find(userId, (error, data) => {
                if (error) {
                    reject(error);
                    return;
                }
                if (data.length) {
                    Token.drop(userId, (error, data) => {
                        if (error) {
                            reject(error);
                            return;
                        }
                        if (data.status == 'success') {
                            resolve(true)
                        } else {
                            resolve(false)
                        }
                    })
                } else {
                    // không có refresh token ton tai
                    resolve(true)
                }
            })
        })
    }
}
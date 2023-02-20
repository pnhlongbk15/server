const bcrypt = require('bcrypt')

module.exports = {
        encode: async (password) => {
                return new Promise((resolve, reject) => {
                        bcrypt.genSalt(10, (error, salt) => {
                                if (error) reject(error);
                                bcrypt.hash(password.toString(), salt, (error, hash) => {
                                        if (error) reject(error);
                                        resolve(hash);
                                })
                        })
                })
        },
        verify: (password, hash) => {
                //compare 1 password chua encode voi password encode
                return new Promise((resolve, reject) => {
                        bcrypt.compare(password.toString(), hash, (error, result) => {
                                if (error) reject(error);
                                resolve(result);
                        })
                })
        }

}
const Token = require('../models/token.model')
const sql = require('../configs/db.connection')

Token.create = (newToken, cb) => {
        sql.query("INSERT INTO Token SET ?", newToken, (error, result) => {
                if (error) {
                        cb(error, null);
                        return;
                }
                if (result.affectedRows > 0) {
                        cb(null, { status: 'success' })
                } else {
                        cb(null, { status: 'fail' })
                }
        })
}

Token.find = (userId, cb) => {
        sql.query("SELECT * FROM Token WHERE ?", { userId }, (error, result) => {
                if (error) {
                        cb(error, null);
                        return;
                }
                cb(null, result);
        })
}

Token.drop = (userId, cb) => {
        sql.query("DELETE FROM Token WHERE ?", { userId }, (error, result) => {
                if (error) {
                        cb(error, null)
                }
                if (result.affectedRows > 0) {
                        cb(null, { status: 'success' })
                } else {
                        cb(null, { status: 'fail' })
                }
        })
}

module.exports = Token;
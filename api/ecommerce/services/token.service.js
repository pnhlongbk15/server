const Token = require('../../../database/mySql/model/token.model')
const sql = require('../../../database/mySql/db.connection')

Token.create = (newToken, cb) => {
        sql.query("INSERT INTO token SET ?", newToken, (error, result) => {
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
        sql.query("SELECT * FROM token WHERE ?", { userId }, (error, result) => {
                if (error) {
                        cb(error, null);
                        return;
                }
                cb(null, result);
        })
}

Token.drop = (userId, cb) => {
        sql.query("DELETE FROM token WHERE ?", { userId }, (error, result) => {
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
const { User, Address } = require('../models/user.model')
const sql = require('../configs/db.connection')

User.create = (newUser, cb) => {
   console.log(newUser)
   sql.query("INSERT INTO User SET ?", newUser, (error, result) => {
      if (error) {
         console.log(error)
         cb(error, null);
         return;
      }
      if (result.affectedRows > 0) {
         cb(null, { status: 'success', message: 'register successful.' })
      } else {
         cb(null, { status: 'fail', message: 'register unsuccessful.' })
      }
   })
}

User.find = (info, cb) => {
   sql.query("SELECT * FROM User WHERE ?", info, (error, result) => {
      if (error) {
         cb(error, null);
         return;
      }
      cb(null, result);
   })
}

User.drop = (info, cb) => {
   sql.query("DELETE FROM User WHERE ?", info, (error, result) => {
      if (error) {
         cb(error, null);
         return;
      }
      if (result.affectedRows > 0) {
         cb(null, { status: 'success', message: 'Drop successful.' })
      } else {
         cb(null, { status: 'fail', message: 'Drop unsuccessful.' })
      }
   })
}

User.profile = (userId, cb) => {
   sql.query("SELECT username, email, phone, sex, birth FROM User WHERE ?", userId, (error, result) => {
      if (error) {
         const message = {
            query: error.sql,
            error: error.sqlMessage
         }
         cb(message, null)
         return;
      }
      cb(null, result)
   })
}

User.updateProfile = (profile, userId, cb) => {
   const statement = `UPDATE User SET ? WHERE userId = '${userId.id}'`
   console.log(statement)
   sql.query(statement, profile, (error, result) => {
      console.log(error, result)
      if (error) {
         const message = {
            query: error.sql,
            error: error.sqlMessage
         }
         cb(message, null)
         return;
      }
      if (result.affectedRows > 0) {
         cb(null, {
            message: 'Update profile success.'
         })
      }
   })
}

User.address = (userId, cb) => {
   sql.query(`SELECT * FROM Address WHERE ?`, userId, (error, result) => {
      if (error) {
         const message = {
            query: error.sql,
            error: error.sqlMessage
         }
         cb(message, null)
         return;
      }
      cb(null, {
         address: result
      })
   })
}

User.addAddress = (data, cb) => {
   sql.query('INSERT INTO Address SET ?', data, (error, result) => {
      if (error) {
         const message = {
            query: error.sql,
            error: error.sqlMessage
         }
         cb(message, null)
         return;
      }
      if (result.affectedRows > 0) {
         cb(null, {
            message: 'Add address success.'
         })
      }
   })
}

User.updateAddress = (data, cond, cb) => {
   sql.query('UPDATE Address SET ? WHERE ?', [data, cond], (error, result) => {
      if (error) {
         const message = {
            query: error.sql,
            error: error.sqlMessage
         }
         cb(message, null)
         return;
      }
      if (result.affectedRows > 0) {
         cb(null, {
            message: 'Update address success.'
         })
      }
   })
}

User.updateAvatar = (data, cb) => {
   sql.query('UPDATE User SET ? WHERE ?', data, (error, result) => {
      if (error) {
         const message = {
            query: error.sql,
            error: error.sqlMessage
         }
         cb(message, null)
         return;
      }
      if (result.affectedRows > 0) {
         cb(null, {
            message: 'Update avatar success.'
         })
      }
   })
}

User.avatar = (userId, cb) => {
   sql.query('SELECT image FROM User WHERE ?', userId, (error, result) => {
      if (error) {
         const message = {
            query: error.sql,
            error: error.sqlMessage
         }
         cb(message, null)
         return;
      }
      cb(null, {
         avatar: result[0]
      })

   })
}

module.exports = { User, Address } 
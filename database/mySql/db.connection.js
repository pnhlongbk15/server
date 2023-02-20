const mysql = require('mysql2');
const dbConfig = require('./db.config');

const conn = mysql.createConnection({
        host: dbConfig.HOST,
        user: dbConfig.USER,
        password: dbConfig.PASSWORD,
        database: dbConfig.DB,
        connectionLimit: 100,
        multipleStatements: true
});

conn.connect(error => {
        if (error) throw error;
        console.log('Successfully connected to the database');
});

module.exports = conn;
const express = require("express");
const router = express.Router();
const mysql = require('mysql2');


const dbConfig = {
  HOST: process.env.DB_HOST,
  USER: process.env.DB_USER,
  PASSWORD: process.env.DB_PASSWORD,
  DB: process.env.DB_NAME
}
console.log(dbConfig)

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

router.get("/", async (req, res, next) => {
  return res.status(200).json({
    number: process.env.PORT,
    title: "Express Testing",
    message: "The app is working properly!",
  });
});

module.exports = router;

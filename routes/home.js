const express = require("express");
const router = express.Router();




router.get("/", async (req, res, next) => {
  return res.status(200).json({
    number: process.env.PORT,
    title: "Express Testing",
    message: " app is working properly!",
  });
});

module.exports = router;

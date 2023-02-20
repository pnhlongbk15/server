const authRoute = require('express').Router()

authRoute.get("/", async (req, res, next) => {
        return res.status(200).json({
          title: "Express Testing",
          message: "The app is working properly!",
        });
      });

module.exports = authRoute
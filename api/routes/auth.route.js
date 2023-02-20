const authRoute = require('express').Router()

authRoute.get('/', (req, res) => {
        res.json({message: 'hi'})
})

module.exports = authRoute
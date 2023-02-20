// Import packages
const express = require("express");
const home = require("./routes/home");

// Middlewares
const app = express();
require('./middleParty')(app)
 

// Routes
// app.use("/home", home);
const routes = require('./api/routes/route');
routes(app)

// connection
const port = process.env.PORT || 9001;
app.listen(port, () => console.log(`Listening to port ${port}`));

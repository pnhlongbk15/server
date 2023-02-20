require('dotenv/config');
// const routes = require('./api/routes/route');

// app
const express = require('express');
const app = express();
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
        console.log(`Server is running on localhost:${PORT}`);
});

// middle-ware
//cors
const cors = require('cors')
app.use(cors({
        origin: '*'
}))
//body-parser
const bodyParser = require('body-parser');
app.use(bodyParser.json()); // dạng truyền lên là json()
app.use(bodyParser.urlencoded({ extended: true })); // dạng truyền lên từ form
// ejs-template
const expressLayouts = require('express-ejs-layouts');
app.use(expressLayouts);
app.set('view engine', 'ejs');
// app.set('layout', 'master') '' default is layout if use other name , need set
app.set('views', 'api/views');
app.use(express.static('api/public'));

// routes
// routes(app);
app.use('/', require('./routes/home'))
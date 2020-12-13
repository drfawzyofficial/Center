// Include all packages
const express = require('express');
const responseTime = require('response-time')
const cors = require('cors')
const morgan = require('morgan')
const dotenv = require('dotenv')
require('./Connection/mongoose')
const path = require('path');
const bodyParser = require('body-parser')
const helmet = require("helmet");
const port = process.env.PORT || 3000;

// Use all packages
const app = express();
app.use(helmet());
app.use(responseTime())
app.use(morgan('dev'))
dotenv.config({path: __dirname + '/.env'})
app.use(cors())
app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// Include All Routes 
const { Admin, Partner, Contact } = require('./routes/index');

// Use All Routes
app.use('/api/admin', Admin);
app.use('/api/partner', Partner);
app.use('/api/contact', Contact);

// App is running on port 3000
app.listen(port, () => {
    console.log('Running on Port: 3000')
})



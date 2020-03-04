const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const winston = require('./config/winston');


const searchCitiesRoutes = require('./api/routes/searchCities');
app.use('*', cors());

app.use('/searchCity', searchCitiesRoutes)

//handle 404 errors

app.use((req, res, next) => {
    const error = new Error('API endpoint not found');
    error.status = 404;
    next(error);
})

//handle other errors
app.use(( error, req, res, next) => {
    winston.error(`${error.status || 500} - ${error.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    }) 
})

module.exports = app;
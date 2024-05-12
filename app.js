const express = require('express');
const morgan = require('morgan');

const { mongooseConnection } = require('./models');
const v1Routes = require('./routes/v1');

const app = express();

app.use(express.json());

// custom token for timestamp
morgan.token('timestamp', () => {
  return new Date().toISOString();
});

// Morgan with custom format including timestamp for console logging
app.use(morgan(':timestamp :method :url :status :response-time ms'));

app.use((req, res, next) => {
    if (mongooseConnection()) {
        next();
    } else {
        res.status(500).json({
            statusCode: 500,
            status: "Mongo is unavailable"
        });
    }
});

app.get('/healthcheck', (req, res) => {
    res.send('Working');
})

//using version for API management and backward compartibality
app.use('/v1', v1Routes);

app.all('*', (req, res) => {
    res.status(404).send('Route not found');
});

module.exports = app;
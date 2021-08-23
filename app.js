const express = require('express');
const helmet = require('helmet');
const router = require('./router');
const errorHandler = require('./utils/errorHandler');
const passport = require('passport');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(helmet());

/**
 * Passport configuration files.
 */
 require('./middleware/auth.middleware');

/**
 * Passport initializations.
 */
 app.use(passport.initialize());
 app.use(passport.session());

/**
 * Route to all endpoints for v1 of API.
 */
app.use('/api/v1', router);

/**
 * Convert every error that is not instance of APIError.
 */
 app.use(errorHandler.converter);

 /**
 * Catch every 404 and forward to error handler
 */
app.use(errorHandler.notFound); // or this app.all('*', error.notFound);

/**
 * Catch every error associated with routes. Send stacktrace only in development mode
 */
app.use(errorHandler.handler);

module.exports = app;
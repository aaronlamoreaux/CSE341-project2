const express = require('express');
const routes = express.Router();

routes.use('/', require('./user'));
routes.use('/quote', require('./quotes'));

module.exports = routes;
const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./db/connection');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const cors = require('cors');

const port = process.env.PORT || 8080;
const app = express();

app
  .use(express.json())
  .use(bodyParser.json())
  .use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
  })
  .use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
  .use(express.urlencoded({
    extended: true
  }))
  .use(bodyParser.urlencoded({
    extended: true
  }))
  .use(cors())
  .use('/', require('./routes'));

process.on('uncaughtException', (err, origin) => {
  console.log(process.stderr.fd, `Caught exception: ${err}\n` + `Exception origin: ${origin}`);
});

mongodb.initDb((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port);
    console.log('Connected to DB and listening on ' + port);
  }
});

module.exports = port;
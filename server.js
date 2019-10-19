const express = require('express');

const routes = require('./routes/pokemons');
const logger = require('./logs/logger');

const app = express();

//call for pokemon routes
app.use("/api/v1", routes);

//starting server
app.listen(process.env.PORT_NUMBER || 3000);
logger.info('Server started at port: ' + (process.env.PORT_NUMBER || 3000));
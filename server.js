const express = require('express');

const routes = require('./routes/pokemons');



const app = express();

/* app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Method", "GET")
}); */

app.use("/api/v1", routes);

// default PORT
app.listen(process.env.PORT || 3000);
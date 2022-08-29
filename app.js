const express = require('express');
const hbs = require('hbs');
const logger = require('morgan');


require("dotenv").config();
require("./config/db.config")

const app = express();

app.use(express.static('public'));

app.use(logger('dev'));

app.set('views', __dirname + '/views');
app.set('view engine', 'hbs');

hbs.registerPartials(__dirname + '/views/partials');

const routes = require('./config/routes.config')
app.use(routes);

app.use((err, req, res, next) => {
  console.log("he ido al error de app.js, ahí lo llevas, pájaro!")
    res.render("error", { err });
  });
  
  app.listen(3000, () => console.log("Listening on port 3000"));
const express = require('express');
const hbs = require('hbs');
const logger = require('morgan');


const app = express();

app.use(express.static('public'));

app.use(logger('dev'));

app.set('views', __dirname + '/views');
app.set('view engine', 'hbs');

hbs.registerPartials(__dirname + '/views/partials');

const routes = require('./config/routes.config')
app.use(routes);

app.use((err, req, res, next) => {
    res.render("error", { err });
  });
  
  app.listen(3000, () => console.log("Listening on port 3000"));
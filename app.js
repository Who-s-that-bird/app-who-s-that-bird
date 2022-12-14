require("dotenv").config();

const express = require("express");
const logger = require("morgan");
const hbs = require("hbs");
const sessionConfig = require("./config/session.config");
const passport = require("passport");



require("./config/db.config");
require("./config/passport.config");


require("./config/db.config");

const app = express();

app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(logger("dev"));

app.use(sessionConfig);

app.set("views", __dirname + "/views");
app.set("view engine", "hbs");

app.use(passport.initialize());
app.use(passport.session());

hbs.registerPartials(__dirname + "/views/partials");

app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  next();
});

const router = require("./config/routes.config");
app.use(router);

app.use((err, req, res, next) => {
  console.log("he ido al error de app.js, ahí lo llevas, pájaro!");
  res.render("error", { err });
});

app.listen(3000, () => console.log("Listening on port 3000"));

require("dotenv").config();
const mongoose = require("mongoose");
const Bird = require("../models/Bird.model");
const BIRDS = require("../data/bird.json");
const User = require("../models/user.model")

require("../config/db.config");

mongoose.connection.once("open", () => {
  mongoose.connection.db
    .dropDatabase()
    .then(() => {
      console.log("DB dropped!");
     

      return User.create({
        name: "Pedro Jurado",
        email: "newbirdsapp@gmail.com",
        password: "registered",
        active: "true",
        isAdmin: "true"
      })
    })
    .then((user) => {
      console.log('user created', user)
      BIRDS.map(bird =>{ 
        bird.user = user._id
        return bird
      })
      console.log(BIRDS)
      return Bird.create(BIRDS)
    })
    .then((Birds) => {
      console.log('Birds wit .user._id created.......................', Birds)
      console.log("connection closed");
      process.exit(1);
    })
    .catch((err) => {
      console.error(err);
      process.exit(0);
    });
});

const User = require("../models/User.model");
const Album = require("../models/Bird.model");


module.exports.profile = (req, res, next) => {
  Album.find({user:req.user._id})
  .then(albums => {
    res.render("users/profile", {albums});
  })
  
};

const User = require("../models/User.model");
const Album = require("../models/album.model");

module.exports.profile = (req, res, next) => {
  Album.find({ user: req.user._id })
    .populate("bird")
    .then((albums) => {
      console.log(albums);
      res.render("users/profile", { albums });
    })
    .catch(next);
};

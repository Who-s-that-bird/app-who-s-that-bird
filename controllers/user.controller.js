const User = require("../models/User.model");
const Album = require("../models/album.model");
const Bird = require("../models/Bird.model");


module.exports.profile = (req, res, next) => {
  Album.find({ user: req.user._id })
    .populate("bird")
    .then((albums) => {
      console.log(albums);
      res.render("users/profile", {albums});
        })
    .catch(next);
};

module.exports.album = (req, res, next) => {
  Album.find({ user: req.user._id, bird: req.params.birdId })
    .populate("bird")
    .then((albums) => {
         res.render("albums/albumDetail", { albums });
    })
    .catch((err)=> next(err));
};

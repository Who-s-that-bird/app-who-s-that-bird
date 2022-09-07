const createError = require("http-errors");
const uploadCloud = require("../config/cloudinary.config");
const Bird = require("../models/Bird.model");

//CRUD
const Album = require("../models/album.model");

//Create
module.exports.create = (req, res, next) => {
  Bird.find().then((birds) => {
    res.render("albums/albumCreate", { birds });
  });
};

module.exports.doCreate = (req, res, next) => {
  console.log(req.body);
  const albumToCreate = req.body;

  if (req.file) {
    albumToCreate.url = req.file.path;
  }
  albumToCreate.user = req.user._id;

  console.log(albumToCreate);

  Album.create(albumToCreate)
    .then((album) => {
      res.redirect(`/profile`); //mirar este redirect!
    })
    .catch((err) => {
      next(err);
    });
};

//Edit

//Delete

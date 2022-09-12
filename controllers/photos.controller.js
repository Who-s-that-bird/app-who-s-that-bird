const uploadCloud = require("../config/cloudinary.config");
const Album = require("../models/album.model");
const Bird = require("../models/Bird.model");

//CRUD

const Photo = require("../models/photo.model");

//CREATE
module.exports.create = (req, res, next) => {
  Album.findById(req.params.id)
    .populate("bird")
    .then((album) => {
      res.render("albums/addPhoto", { album });
    })
    .catch(next);
};

module.exports.doCreate = (req, res, next) => {
  const photoToCreate = req.body;

  if (req.file) {
    photoToCreate.url = req.file.path;
  }

  photoToCreate.album = req.params.id;

  Photo.create(photoToCreate)
    .then((photo) => {
      res.redirect("/profile");
    })
    .catch((err) => {
      next(err);
    });
};

// DELETE
module.exports.delete = (req, res, next) => {
  const { id } = req.params;

  Photo.findByIdAndDelete(id)
    .then(() => {
      res.redirect("/albums/albumDetail");
    })
    .catch(next);
};

const uploadCloud = require("../config/cloudinary.config");
const Album = require("../models/album.model");
const Bird = require("../models/Bird.model");
const createError =require("http-errors")

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
  const photoToDelete = req.params;

  Photo.findByIdAndDelete(photoToDelete)
  .then((photo)=> {
    res.status(204).send(photo)
  })
  .catch ((err)=>{
    console.error(err);
    next(createError(404, "Foto no enocntrada"))
  })
}
const createError = require("http-errors");
const uploadCloud = require("../config/cloudinary.config");
const Album = require ("../models/album.model")



/*module.exports.list =(req, res, next) => {
    res.render(`/albumDetail/${album._id}`);
}*/


module.exports.create = (req, res, next) => {
    res.render("photos/photoCreate");
  };
  
  module.exports.doCreate = (req, res, next) => {
    const photoToCreate = req.body;
  
    if (req.file) {
      photoToCreate.image = req.file.path;
    }
  
   photoToCreate.user = req.user._id;
  
    console.log(photoToCreate);
  
    Photo.create(photoToCreate)
      .then((photo) => {
        res.redirect(`/albumDetail/${album._id}`);
      })
      .catch((err) => {
        next(err);
      });
  };
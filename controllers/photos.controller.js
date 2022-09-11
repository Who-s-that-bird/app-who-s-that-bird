const uploadCloud = require("../config/cloudinary.config");
const Album = require ("../models/album.model");
const Bird = require("../models/Bird.model");


//CRUD

const Photo = require("../models/photo.model")

//READ

module.exports.list = (res, req, next) => {
  Photo.find()
  .then((photos) => {
    res.redirect("albums/albumDetail", {photos})
  })
  .catch ((err) => (next(err)));
}

//CREATE
module.exports.create = (req, res, next) => {
       res.render("photos/photoCreate");
  };

  
module.exports.doCreate = (req, res, next) => {
    const photoToCreate = req.body;
    if (req.file) {
      photoToCreate.url = req.file.path;
      
    }
    
    Photo.create(photoToCreate)
      .then((photo) => {
        console.log("***********************************************");      
        console.log(photo.url); //funciona bien
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
 
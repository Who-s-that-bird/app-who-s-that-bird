const createError = require("http-errors");
const uploadCloud = require("../config/cloudinary.config");
const Bird = require("../models/Bird.model");
const Album = require("../models/album.model");

//CRUD

//DETAIL
module.exports.detail = (req, res, next) => {
  Album.findById(req.params.id)
    .populate("photos")
    .then((album) => {
      res.render("albums/albumDetail", { album });
    })
    .catch(next);
};

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
      res.redirect(`/profile`);
    })
    .catch((err) => {
      next(err);
    });
};

//Edit

//Delete
module.exports.delete = (req, res, next) => {
  const { id } = req.params;

Album.findByIdAndDeleteOne(req.params.id)
    .then(()=> {
      res.redirect("/profile")
    })
    .catch((err) => {
      console.error(err);
      next(createError(404, "Album no encontrado"));
    })
};
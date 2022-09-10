const createError = require("http-errors");
const uploadCloud = require("../config/cloudinary.config");

//CRUD

const Bird = require("../models/Bird.model");

//READ
module.exports.list = (req, res, next) => {
  Bird.find()
    .sort({ name: 1 })
    .then((birds) => {
      res.render("birds/list", { birds });
    })
    .catch((err) => next(err));
};

module.exports.birdDetail = (req, res, next) => {
  const { id } = req.params;

  Bird.findById(id)
    .populate("albums")
    .then((bird) => {
      console.log(id, bird);
      res.render("birds/birdDetails", { bird });
    })
    .catch((err) => {
      console.log(err);
      next(createError(404, " Ave no encontrada"));
    });
};

module.exports.birdDetailTotal = (req, res, next) => {
  const { id } = req.params;
  Bird.findById(id)
    .populate("albums")
    .populate("comments")
    .then((bird) => {
      console.log(id, bird);
      res.render("birds/birdDetailTotal", { bird });
    })
    .catch((err) => next(createError(404, " Ave no encontrada")));
};

//CREATE

module.exports.create = (req, res, next) => {
  res.render("birds/birdCreate");
};

module.exports.doCreate = (req, res, next) => {
  const birdToCreate = req.body;

  if (req.file) {
    birdToCreate.image = req.file.path;
  }

  birdToCreate.user = req.user._id;

  console.log(birdToCreate);

  Bird.create(birdToCreate)
    .then((bird) => {
      res.redirect(`/bird/${bird._id}`);
    })
    .catch((err) => {
      next(err);
    });
};

//UPDATE /EDIT

//DELETE

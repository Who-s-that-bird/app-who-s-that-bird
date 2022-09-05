const createError = require ("http-errors")
const uploadCloud = require("../config/cloudinary.config")

//CRUD

const Bird = require("../models/Bird.model")

//READ
module.exports.list = (req, res, next) => {
    Bird.find()
    .sort({name: 1})
    .then((birds) => {
       res.render("birds/list", {birds})
    })
    .catch((err)=> next(err))
}

module.exports.birdDetail = (req, res, next) => {
    const { id } = req.params;

    Bird.findById(id)
    .populate("albums")
    .then((bird) => {
        console.log( id, bird);
        res.render("birds/birdDetails", {bird})
    })
    .catch((err)=> next (createError ( 404, " Ave no encontrada")
    ))
}

module.exports.birdDetailTotal = (req, res, next) => {
    const { id } = req.params
    Bird.findById(id)
    .then((bird) => {
        console.log( id, bird);
        res.render("birds/birdDetailTotal", {bird})
    })
    .catch((err)=> next (createError ( 404, " Ave no encontrada")
    ))
}


//CREATE

module.exports.create = (req, res, next) => {
    res.render("birds/birdCreate");
  }
  
  module.exports.doCreate = (req, res, next) => {
    // TODO subir imagen a cloudinary, pasando de que pajaro esç
    uploadCloud(req.body.image)
      .then(result => console.log(result))
      .catch(error => console.log(error))
    // recuperar URL de la imagen subida y cambiarlo en req.body.image = URL de la imagen subida
    /*
    Bird.create(req.body)
    console.log(req.body)
      .then((bird) => {
        res.redirect(`birds/birdDetails`);
      })
      .catch((err) => {
        console.error(err);
        next(err);
      });
      */
    }

//UPDATE /EDIT

//DELETE
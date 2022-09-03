const createError = require ("http-errors")

//CRUD

const Bird = require("../models/Bird.model")

//READ
module.exports.list = (req, res, next) => {
    Bird.find()
    .then((birds) => {
        res.render("birds/list", {birds})
    })
    .catch((err)=> next(err))
}

module.exports.birdDetail = (req, res, next) => {
    const { id } = req.params;

    Bird.findById(id)
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
    Bird.create(req.body)
      .then((bird) => {
        res.redirect(`birds/birdDetails`);
      })
      .catch((err) => {
        console.error(err);
        next(err);
      });
    }

//UPDATE /EDIT

//DELETE
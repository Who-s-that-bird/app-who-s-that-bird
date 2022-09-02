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
    .catch((err)=> next (cretaeError ( 404, " Ave no encontrada")
    ))
}


//CREATE

//UPDATE /EDIT

//DELETE
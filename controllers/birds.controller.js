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

module.exports.details = (req, res, next) => {
    const {id} = req.params

    Bird.findById(id);
    console.log({id})
    .then((bird) =>{
        res.render("birds/birdDetails", {bird})
    })
    .catch((err)=>{
        console.error(err)
        next(createError( 404, "Not Found"))
    })
}

module.exports.detailTotal = (req, res, next) => {
    const {id} = req.params

    Bird.findById(id)
    .then((bird) =>{
        res.render("birds/birdDetailTotal", {bird})
    })
    .catch((err)=>{
        console.error(err)
        next(createError( 404, "Not Found"))
    })
}
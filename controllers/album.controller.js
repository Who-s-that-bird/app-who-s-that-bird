const createError = require("http-errors");
const uploadCloud = require("../config/cloudinary.config");

//CRUD

const Album =require("../models/album.model")

//Read
module.exports.list = (req, res, next) => {
    Album.find()
    .then((albums) => {
        { albums }      //no quiero q pinte una vista, sino llamarlo a una vista ya creada
    })
    .catch ((err)=> next(err))
}

//Create
module.exports.create = (req, res, next) => {
    res.render ("albums/albumCreate");
}
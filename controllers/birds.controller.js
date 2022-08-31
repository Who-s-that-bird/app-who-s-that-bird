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
    const { id } = req.params;

    Bird.findById(id)
    console.log(id, "imprime el log del controlador, pero no entra en el then")
    .then((bird) =>{
        console.log("he entrado al then")
        res.render("birds/birdDetails", { bird })
    })
    .catch((err)=>{
        console.error(err)
        next(createError( 404, "Registro no encontrado"))
    })
}


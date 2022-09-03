const mongoose = require("mongoose");

const birdSchema = new mongoose.Schema ({
    name: {
        type: String, 
        required: [true, "Name is required"],
    },
    scifyName: {
        type: String,
        required:  [true, "Scientific Name is required"]
    },
    comment: {
        type: String,
        required: [true, "A comment is required"]
    },
    weight :{
        type : String,
    },
    size: {
        type: String,
    },
    wingspan:{
        type: String,
    },
    longevity: {
       type: String,
    },
    image: {
        type: String,
        required: [true, "A picture is required"]
    },
    albums: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Bird",
        required: [true, "Especie requerida"],
    }
})

const Bird = mongoose.model("Bird", birdSchema);

module.exports = Bird;
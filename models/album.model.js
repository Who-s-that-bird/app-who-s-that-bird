const mongoose = require("mongoose");
const Bird = require("./Bird.model");

const albumSchema = new mongoose.Schema(
  {
    user: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User",
    },
  
  bird:{
       type: mongoose.Schema.Types.ObjectId, 
        ref: "Bird",
  },

  url: {
    type: [String]

  }
},
);

const Album = mongoose.model("Album", albumSchema); 

module.exports = Album;
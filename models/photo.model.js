const mongoose = require ("mongoose")


const photoSchema = new mongoose.Schema({
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  
    bird: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Bird",
    },
  
    url: {
      type: String,
    },
  });
  
  const Photo = mongoose.model("Photo", photoSchema);
  
  module.exports = Photo;
  
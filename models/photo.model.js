const mongoose = require("mongoose");

const photoSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  album: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Album",
  },
  url: {
    type: String,
  },
});

const Photo = mongoose.model("Photo", photoSchema);

module.exports = Photo;

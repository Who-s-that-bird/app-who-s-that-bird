const mongoose = require("mongoose");
const Bird = require("./Bird.model");

const albumSchema = new mongoose.Schema(
  {
    name: {
        type: String, 
        required: [true, "Name is required"],
    },
  },
  {
    toObject: { virtuals: true },
  },
  {
      type: [Bird],
      required: [true, "A picture is required"]
  }
);

const Album = mongoose.model("Album", albumSchema);

module.exports = Album;
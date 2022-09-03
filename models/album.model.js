const mongoose = require("mongoose");

const albumSchema = new mongoose.Schema(
  {
    name: {
        type: String, 
        required: [true, "Name is required"],
    },
  },
  {
    toObject: { virtuals: true },
  }
);

albumSchema.virtual("birds", {
  ref: "Bird",
  localField: "_id",
  foreignField: "image",
  justOne: false,
});

const Album = mongoose.model("Album", albumSchema);

module.exports = Album;
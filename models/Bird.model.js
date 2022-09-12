const mongoose = require("mongoose");
require("./album.model");

const birdSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    scifyName: {
      type: String,
      required: [true, "Scientific Name is required"],
    },
    comment: {
      type: String,
      required: [true, "A comment is required"],
    },
    weight: {
      type: String,
    },
    size: {
      type: String,
    },
    wingspan: {
      type: String,
    },
    longevity: {
      type: String,
    },
    image: {
      type: String,
      required: [true, "A picture is required"],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "An user is required"],
    },
  },
  {
    toObject: {
      virtuals: true,
    },
  }
);

birdSchema.virtual("albums", {
  ref: "Album",
  localField: "_id",
  foreignField: "bird",
  justOne: false,
});

birdSchema.virtual("annotations", {
  ref: "Comment",
  localField: "_id",
  foreignField: "bird",
  justOne: false,
});

const Bird = mongoose.model("Bird", birdSchema);

module.exports = Bird;

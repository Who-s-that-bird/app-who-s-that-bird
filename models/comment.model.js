const mongoose = require("mongoose");


const commentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },

    bird: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Bird",
    },

    annotation: {
        type: String,
        maxLength: [500, "Annotation cannot be longer than 500 characters"],
    }

});

  
  const Comment = mongoose.model("Comment", commentSchema);
  
  module.exports = Comment;

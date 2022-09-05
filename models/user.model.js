const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const EMAIL_PATTERN =
  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
const PASSWORD_PATTERN = /^.{8,}$/i;
const SALT_ROUNDS = 10;

//const { Schema, model } = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Username is required."],
    unique: true,
  },
  email: {
    type: String,
    required: [true, "Email is required."],
    unique: true,
    lowercase: true,
    match: [EMAIL_PATTERN, "Email adress not valid, please try again"]
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    match: [PASSWORD_PATTERN, "Password must contain 8 characters"],
  },
  googleID: {
    type: String,
  },
  active: {
    type: Boolean,
    default: false
  },
  activationToken: {
    type: String,
    default: () => {
      return Math.random().toString(36).substring(7) +
      Math.random().toString(36).substring(7) +
      Math.random().toString(36).substring(7) +
      Math.random().toString(36).substring(7) 
    }
  },
  image: {
    type: String,
    default:
      "https://res.cloudinary.com/idoiafforero/image/upload/v1661191312/Ironhack/avatardefault_92824_ovh75l.png",
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

userSchema.pre("save", function (next) {
  const user = this;

  if (user.isModified("password")) {
    bcrypt
      .hash(user.password, SALT_ROUNDS)
      .then((hash) => {
        user.password = hash;
        next();
      })
      .catch((err) => next(err));
  } else {
    next();
  }
});
userSchema.methods.checkPassword = function (password) {
  const user = this;
  return bcrypt.compare(password, user.password);
};

userSchema.virtual("albums", {
  ref: "Album",
  localField: "_id",
  foreignField: "user",
  justOne: false,
}
)
const User = mongoose.model("User", userSchema);

module.exports = User;

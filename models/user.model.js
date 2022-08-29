const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const EMAIL_PATTERN =
  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
const PASSWORD_PATTERN = /^.{8,}$/i;
const SALT_ROUNDS = 10;

const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  username: {
    type: String,
    required: [true, "Username is required."],
    unique: true,
  },
  email: {
    type: String,
    required: [true, "Email is required."],
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    match: [PASSWORD_PATTERN, "Password must contain 8 characters"],
  },
  googleID: {
    type: String,
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

module.exports = model("User", userSchema);

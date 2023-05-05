import mongoose from "mongoose";
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
  },
  password: {
    type: String,
  },
  verified: {
    type: Boolean,
  },
});



module.exports = mongoose.models.userModel || mongoose.model("userModel", userSchema)
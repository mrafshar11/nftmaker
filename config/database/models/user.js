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


// userSchema.pre("save", function (next) {
//     let user = this;

//     if (!user.isModified("password")) return next();

//     bcrypt.hash(user.password, 10, (err, hash) => {
//         if (err) return next(err);

//         user.password = hash;
//         next();
//     });
// });

module.exports = mongoose.models.userModel || mongoose.model("userModel", userSchema)
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  phoneNumber: {
    type: Number,
    required: [true, "Please add your phone number"],
  },
  password: {
    type: String,
    required: [true, "Please add a password"],
    minlength: 6,
  },
  email: {
    type: String,
    required: [true, "Please add an email"],
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please add a valid email",
    ],
  },
  role: { type: String, enum: ["admin", "captain", "passenger"] },
  verficiationStatus: { type: Boolean, default: false },
  verificationToken: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Sign JWT and return
userSchema.methods.getSignedJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

module.exports = mongoose.model("User", userSchema);

const mongoose = require("mongoose");

const captainSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  name: {
    type: String,
    required: [true, "Please add your phone number"],
  },
  idPhoto: String,
  licensePhoto: String,
  level: {
    type: String,
    enum: ["new", "gold", "platinum", "diamond"],
    default: "new",
  },
  trips: [{ type: mongoose.Schema.Types.ObjectId, ref: "Trip" }],
  points: Number,
  verificationStatus: { type: Boolean, default: false },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Captain", captainSchema);

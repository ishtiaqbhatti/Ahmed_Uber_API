const mongoose = require("mongoose");

const passengerSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  name: {
    type: String,
    required: [true, "Please add your phone number"],
  },
  idPhoto: String,
  paymentMethod: { type: String, enum: ["cash", "card"], default: "cash" },
  level: { type: String, enum: ["new", "gold", "platinum", "diamond"] },
  trips: [{ type: mongoose.Schema.Types.ObjectId, ref: "Trip" }],
  points: Number,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Passenger", passengerSchema);

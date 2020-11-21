const mongoose = require("mongoose");

const tripSchema = new mongoose.Schema({
  captainId: { type: mongoose.Schema.Types.ObjectId, ref: "Captain" },
  passengerId: { type: mongoose.Schema.Types.ObjectId, ref: "Passenger" },
  from: {
    type: { type: String },
    coordinates: [Number],
  },
  to: {
    type: { type: String },
    coordinates: [Number],
  },
  cost: { type: Number, default: 0 },
  paymentMethod: String,
  status: {
    assigned: { type: Boolean, default: false },
    completed: { type: Boolean, default: false },
    cancelled: { type: Boolean, default: false },
  },
  feedback: { type: mongoose.Schema.Types.ObjectId, ref: "Feedback" },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

tripSchema.index({ from: "2dshpere", to: "2dsphere" });

module.exports = mongoose.model("Trip", tripSchema);

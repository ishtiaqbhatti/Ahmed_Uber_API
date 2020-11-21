const mongoose = require("mongoose");

const feedBackSchema = new mongoose.Schema({
  captainId: { type: mongoose.Schema.Types.ObjectId, ref: "Captain" },
  passengerId: { type: mongoose.Schema.Types.ObjectId, ref: "Passenger" },
  tripId: { type: mongoose.Schema.Types.ObjectId, ref: "Trip" },
  feedback: {
    behaviour: Boolean,
    saftety: Boolean,
    onTime: Boolean,
    speedLimit: Boolean,
    car: Boolean,
  },
  feedBackPoints: Number,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Feedback", feedBackSchema);

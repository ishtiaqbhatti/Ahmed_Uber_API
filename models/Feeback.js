const mongoose = require("mongoose");

const feedBackSchema = new mongoose.Schema({
  tripId: { type: mongoose.Schema.Types.ObjectId, ref: "Trip" },
  captainId: { type: mongoose.Schema.Types.ObjectId, ref: "Captain" },
  passengerId: { type: mongoose.Schema.Types.ObjectId, ref: "Passenger" },
  criteriaPoints: [
    {
      criteria: String,
      point: Boolean,
    },
  ],
  totalPoints: { type: Number },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Feedback", feedBackSchema);

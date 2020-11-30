const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  tripId: { type: mongoose.Schema.Types.ObjectId, ref: "Trip" },
  captainId: { type: mongoose.Schema.Types.ObjectId, ref: "Captain" },
  passengerId: { type: mongoose.Schema.Types.ObjectId, ref: "Passenger" },
  totalAmount: { type: Number },
  companyAmount: { type: Number },
  captainAmount: { type: Number },
  paymentMethod: { type: String, enum: ["cash", "card"] },
  paymentJson: { type: JSON },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Payment", paymentSchema);

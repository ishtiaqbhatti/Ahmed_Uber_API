const asyncHandler = require("../middleware/async");
const socketio = require("socket.io");
const Captain = require("../models/Captain");
const Trip = require("../models/Trip");
const ErrorResponse = require("../utils/errorResponse");
const Payment = require("../models/Payment");

// @desc    Register User (Roles: employee, admin)
// @oute    POST /api/auth/register
// @access  Public

exports.createTrip = asyncHandler(async (req, res, next) => {
  const { from, to, passengerId, captainId, paymentMethod, cost } = req.body;
  const io = req.app.get("io");
  const trip = await Trip.create({
    from,
    to,
    passengerId,
    captainId,
    cost,
    paymentMethod,
  });

  trip.status.assigned = true;
  trip.save();

  io.emit("tripAccepted", trip);
  return res.status(200).json({
    success: 1,
    message: `Trip succesfully created ${trip}`,
  });
});

exports.getAllTrips = asyncHandler(async (req, res, next) => {
  const trips = await Trip.find({});
  return res.status(200).json({
    success: 1,
    data: trips,
  });
});

exports.getTripById = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  const trip = await Trip.findById(id);
  return res.status(200).json({
    success: 1,
    data: trip,
  });
});

exports.getAllTripsByCaptainId = asyncHandler(async (req, res, next) => {
  const captainId = req.params.id;
  const tripsByCaptainId = await Trip.find({ captainId });
  return res.status(200).json({
    success: 1,
    data: tripsByCaptainId,
  });
});

exports.completeTrip = asyncHandler(async (req, res, next) => {
  const { tripId } = req.body;
  const trip = await Trip.findOne({ tripId, active });
  if (trip) {
    trip.status.completed = true;
    trip.active = false;
    trip.save();
  }

  return res.status(200).json({
    success: 1,
    data: "Successfully Completed Trip",
  });
});

exports.cancelTrip = asyncHandler(async (req, res, next) => {
  const { tripId } = req.body;
  const trip = await Trip.findOne({ tripId, active });
  if (trip) {
    trip.status.cancelled = true;
    trip.active = false;
    trip.cost = 0;
    trip.save();
  }

  return res.status(200).json({
    success: 1,
    data: "Successfully Canceled Trip",
  });
});

exports.payForTrip = asyncHandler(async (req, res, next) => {
  const {
    tripId,
    captainId,
    passengerId,
    totalAmount,
    paymentMethod,
  } = req.body;

  // Find Captain
  const captain = await Captain.findOne({ _id: captainId });
  const calculateShare = calculateCaptainAndCompanyCost(
    captain.level,
    totalAmount
  );

  // Add data to Payment collection
  await Payment.create({
    tripId,
    captainId,
    passengerId,
    totalAmount,
    paymentMethod,
    companyAmount: calculateShare.companyAmount,
    captainAmount: calculateShare.captainAmount,
  });

  return res.status(200).json({
    success: 1,
    data: `Succesfully added Payment`,
  });
});

calculateCaptainAndCompanyCost = (captainLevel, totalAmount) => {
  let companyAmount = 0;
  let captainAmount = 0;
  if (captainLevel === "new") {
    companyAmount = (totalAmount * 45) / 100;
    captainAmount = (totalAmount * 55) / 100;
  } else if (captainLevel === "gold") {
    companyAmount = (totalAmount * 40) / 100;
    captainAmount = (totalAmount * 60) / 100;
  } else if (captainLevel === "platinum") {
    companyAmount = (totalAmount * 35) / 100;
    captainAmount = (totalAmount * 65) / 100;
  } else if (captainLevel === "diamond") {
    companyAmount = (totalAmount * 30) / 100;
    captainAmount = (totalAmount * 70) / 100;
  }

  return { captainAmount, companyAmount };
};

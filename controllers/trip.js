const asyncHandler = require("../middleware/async");

const Captain = require("../models/Captain");
const Trip = require("../models/Trip");
const ErrorResponse = require("../utils/errorResponse");

// @desc    Register User (Roles: employee, admin)
// @oute    POST /api/auth/register
// @access  Public

exports.createTrip = asyncHandler(async (req, res, next) => {
  const { from, to, passengerId, captainId, paymentMethod, cost } = req.body;

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

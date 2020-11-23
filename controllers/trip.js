const asyncHandler = require("../middleware/async");

const Captain = require("../models/Captain");
const Trip = require("../models/Trip");
const ErrorResponse = require("../utils/errorResponse");

// @desc    Register User (Roles: employee, admin)
// @oute    POST /api/auth/register
// @access  Public

exports.createTrip = asyncHandler(async (req, res, next) => {
  const from = {
    type: "Point",
    coordinates: [4.54177, 46.689968],
  };

  const to = {
    type: "Point",
    coordinates: [4.564888, 46.67731],
  };
  const trip = await Trip.create({
    from,
    to,
  });
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

const calculateTripCost = () => {
  const startingCost = 1.5;
  const distance = 10;
  return startingCost + distance * 0.2;
};

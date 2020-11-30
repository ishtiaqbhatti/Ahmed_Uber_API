const asyncHandler = require("../middleware/async");

const Passenger = require("../models/Passenger");

exports.addPassengerProfile = asyncHandler(async (req, res, next) => {
  const userId = req.user.id;

  // Chekf if userId exists
  const userIdFound = await User.findOne({ _id: userId });
  if (!userIdFound) return next(new ErrorResponse("UserId not exists", 409));
  const { name, idPhoto, licensePhoto } = req.body;
  // Create captain profile
  await Passenger.create(req.body);
  return res.status(200).json({
    success: 1,
    message: `Passenger profile successfully created`,
  });
});

exports.changePaymentMethod = asyncHandler(async (req, res, next) => {
  const userId = req.user.id;
  const { paymentMethod } = req.body;

  // Chekf if userId exists
  const passenger = await Passenger.findOne({ userId });
  if (!passenger) return next(new ErrorResponse("UserId not exists", 409));

  passenger.paymentMethod = paymentMethod;
  await passenger.save();

  return res.status(200).json({
    success: 1,
    message: `Passenger payment method successfully updated`,
  });
});

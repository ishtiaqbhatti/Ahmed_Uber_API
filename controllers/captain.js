const asyncHandler = require("../middleware/async");

const Captain = require("../models/Captain");
const User = require("../models/User");
const ErrorResponse = require("../utils/errorResponse");

// @desc    Register User (Roles: employee, admin)
// @oute    POST /api/auth/register
// @access  Public

exports.addCaptainProfile = asyncHandler(async (req, res, next) => {
  const userId = req.user.id;

  // Chekf if userId exists
  const userIdFound = await User.findOne({ _id: userId });
  if (!userIdFound) return next(new ErrorResponse("UserId not exists", 409));
  const { name, idPhoto, licensePhoto } = req.body;
  // Create captain profile
  const captain = await Captain.create({ userId, name, idPhoto, licensePhoto });
  return res.status(200).json({
    success: 1,
    message: `Captain profile successfully created`,
  });
});

exports.getAllCaptains = asyncHandler(async (req, res, next) => {
  const captains = await Captain.find({}).populate("userID");
  return res.status(200).json({
    success: 1,
    data: captains,
  });
});

exports.getCaptainById = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  const captain = await Captain.findById(id);
  return res.status(200).json({
    success: 1,
    data: captain,
  });
});

exports.getAllCaptainsByLevel = asyncHandler(async (req, res, next) => {
  const { name } = req.params;
  const captainsByLevel = await Captain.find({ level: name });
  return res.status(200).json({
    success: 1,
    data: captainsByLevel,
  });
});

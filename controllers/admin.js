const asyncHandler = require("../middleware/async");

const Captain = require("../models/Captain");
const User = require("../models/User");
const ErrorResponse = require("../utils/errorResponse");

// @desc    Register User (Roles: employee, admin)
// @oute    POST /api/auth/register
// @access  Public

exports.verificationByAdmin = asyncHandler(async (req, res, next) => {
  const { verificationStatus, captainId } = req.body;

  // Chekf if captain exists
  const captain = await Captain.findOne({ _id: captainId });
  if (!captain) return next(new ErrorResponse("UserId not exists", 409));

  captain.verificationStatus = verificationStatus;
  await captain.save();
  return res.status(200).json({
    success: 1,
    message: `Verification successfully updated`,
  });
});

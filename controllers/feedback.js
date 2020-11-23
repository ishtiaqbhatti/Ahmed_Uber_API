const asyncHandler = require("../middleware/async");

const Captain = require("../models/Captain");
const Feeback = require("../models/Feeback");
const User = require("../models/User");
const ErrorResponse = require("../utils/errorResponse");

// @desc    Register User (Roles: employee, admin)
// @oute    POST /api/auth/register
// @access  Public

exports.getFeebackCriteria = asyncHandler(async (req, res, next) => {
  const feedBackCriteria = {
    titleEn: [
      { criteria: "Time", text: " Was the captain committed to time" },
      {
        criteria: "Speed Limit",
        text: " Was the captain committed to speed limit",
      },
    ],
    titleAr: [
      { criteria: "Time", text: "هل الكابتن ملتزمة بالوقت ؟" },
      {
        criteria: "Speed Limit",
        text: "هل الكابتن ملتزمة بالسرعة القانونية ؟",
      },
    ],
  };

  return res.status(200).json({
    success: 1,
    data: feedBackCriteria,
  });
});

exports.addFeeback = asyncHandler(async (req, res, next) => {
  const { tripId, captainId, passengerId, criteriaPoints } = req.body;

  // Calculate points
  const totalPoints = 0;
  criteriaPoints.map((criteria) => {
    if (criteria.point) totalPoints++;
  });

  const feedback = await Feeback.create({
    tripId,
    captainId,
    passengerId,
    criteriaPoints,
    totalPoints,
  });

  const captain = await Captain.findOne({ _id: captainId });
  captain.points = captain.points + totalPoints;
  await captain.save();
  await checkCaptainLevel(captainId);
  return res.status(200).json({
    success: 1,
    message: `Feedback successfully created`,
  });
});

exports.getAllFeedbacks = asyncHandler(async (req, res, next) => {
  const feedbacks = await Feeback.find({}).populate(
    "captainId tripId passengerId"
  );
  return res.status(200).json({
    success: 1,
    data: feedback,
  });
});

exports.getFeebacksByCaptainId = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  const feedbackCaptainById = await Feeback.find({ captainId: id }).populate(
    "captainId tripId passengerId"
  );
  return res.status(200).json({
    success: 1,
    data: feedbackCaptainById,
  });
});

const checkCaptainLevel = async (captainId) => {
  try {
    const captain = await Captain.findOne({ _id: captainId }).populate("trips");
    const completedTrips;
    captain.trips.map((trip) => {
      if (trip.status.completed) completedTrips++;
    });
    if (completedTrips >= 30 && captain.points >= 40) {
      captain.level = "glold";
      await captain.save();
      return;
    } else if (completedTrips >= 80 && captain.points >= 100) {
      const ranking = await Captain.aggregate([
        { $sort: { points: -1 } },
        { $group: { _id: "$_id", points: "points" } },
      ]);
      const rankingLength = ranking.length / 5;
      const found = false;
      for (let i = 0; i < rankingLength; i++) {
        if (ranking[i]._id === captainId) found = true;
      }

      if (found) {
        captain.level = "platinum";
        await captain.save();
      }
    } else if (completedTrips >= 200 && captain.points >= 400) {
      const ranking = await Captain.aggregate([
        { $sort: { points: -1 } },
        { $group: { _id: "$_id" } },
      ]);
      const rankingLength = ranking.length / 12;
      const found = false;
      for (let i = 0; i < rankingLength; i++) {
        if (ranking[i]._id === captainId) found = true;
      }

      if (found) {
        captain.level = "diamond";
        await captain.save();
        return;
      }
      return;
    }
  } catch (e) {}
};

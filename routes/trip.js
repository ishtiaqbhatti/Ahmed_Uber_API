const express = require("express");

const {
  createTrip,
  getAllTrips,
  getTripById,
  getAllTripsByCaptainId,
  completeTrip,
  cancelTrip,
  payForTrip,
  acceptTrip,
} = require("../controllers/trip");
const { protect, authorize } = require("../middleware/auth");

const router = express.Router();

router.post("/", protect, authorize("passenger"), createTrip);
router.post("/accept", protect, authorize("captain"), acceptTrip);
router.get("/", protect, authorize("admin"), getAllTrips);
router.get("/:id", protect, getTripById);
router.get("/captain/:id", protect, getAllTripsByCaptainId);
router.post("/complete", protect, authorize("captain"), completeTrip);
router.post("/cancel", cancelTrip);
router.post("/pay", payForTrip);

module.exports = router;

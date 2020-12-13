const express = require("express");

const {
  createTrip,
  getAllTrips,
  getTripById,
  getAllTripsByCaptainId,
  completeTrip,
  cancelTrip,
  payForTrip,
} = require("../controllers/trip");
const { protect, authorize } = require("../middleware/auth");

const router = express.Router();

router.post("/", createTrip);
router.get("/", getAllTrips);
router.get("/:id", getTripById);
router.get("/captain/:id", getAllTripsByCaptainId);
router.post("/complete", completeTrip);
router.post("/cancel", cancelTrip);
router.post("/pay", payForTrip);

module.exports = router;

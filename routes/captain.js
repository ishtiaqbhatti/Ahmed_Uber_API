const express = require("express");

const {
  addCaptainProfile,
  getAllCaptains,
  getCaptainById,
  getAllCaptainsByLevel,
  getTotalTripsCompleted,
} = require("../controllers/captain");
const { protect, authorize } = require("../middleware/auth");

const router = express.Router();

router.post("/", protect, authorize("captain"), addCaptainProfile);
router.get("/", protect, authorize("admin"), getAllCaptains);
router.get("/:id", protect, authorize("admin"), getCaptainById);
router.get("/level/:name", protect, authorize("admin"), getAllCaptainsByLevel);
router.get("/trips/:id", protect, authorize("captain"), getTotalTripsCompleted);
module.exports = router;

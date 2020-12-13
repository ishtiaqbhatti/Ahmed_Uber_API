const express = require("express");

const {
  getFeebackCriteria,
  getAllFeedbacks,
  addFeeback,
  getFeebacksByCaptainId,
} = require("../controllers/feedback");
const { protect, authorize } = require("../middleware/auth");

const router = express.Router();

router.get("/criteria", protect, getFeebackCriteria);
router.post("/", protect, authorize("passenger", addFeeback));
router.get("/", protect, authorize("admin"), getAllFeedbacks);
router.get("/captain/:id", protect, getFeebacksByCaptainId);

module.exports = router;

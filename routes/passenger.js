const express = require("express");

const {
  addPassengerProfile,
  changePaymentMethod,
} = require("../controllers/passenger");
const { protect, authorize } = require("../middleware/auth");

const router = express.Router();

router.post("/", protect, authorize("passenger"), addPassengerProfile);
router.post(
  "/payment-method",
  protect,
  authorize("passenger"),
  changePaymentMethod
);
module.exports = router;

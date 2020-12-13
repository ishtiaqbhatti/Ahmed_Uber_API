const express = require("express");

const {
  getAllPayments,
  getAllPaymentsByCash,
  getAllPaymentsByCashByCaptainId,
} = require("../controllers/payment");
const { protect, authorize } = require("../middleware/auth");

const router = express.Router();

router.get("/", protect, authorize("admin"), getAllPayments);
router.get("/cash", protect, authorize("admin"), getAllPaymentsByCash);
router.get(
  "/cash/captain/:id",
  protect,
  authorize("adming"),
  getAllPaymentsByCashByCaptainId
);
module.exports = router;

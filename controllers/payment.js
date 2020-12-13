const asyncHandler = require("../middleware/async");
const Payment = require("../models/Payment");

exports.getAllPayments = asyncHandler(async (req, res, next) => {
  const payments = await Payment.find({});

  return res.status(200).json({
    success: 1,
    data: payments,
  });
});

exports.getAllPaymentsByCash = asyncHandler(async (req, res, next) => {
  const paymentsByCash = await Payment.find({ paymentMethod: "cash" });
  return res.status(200).json({
    success: 1,
    data: paymentsByCash,
  });
});

exports.getAllPaymentsByCashByCaptainId = asyncHandler(
  async (req, res, next) => {
    const paymentsByCashByCaptainId = await Payment.find({
      captainId: req.params.id,
      paymentMethod: "cash",
    });
    return res.status(200).json({
      success: 1,
      data: paymentsByCashByCaptainId,
    });
  }
);

const express = require("express");
const router = express.Router();
const authenticateToken = require("../middlewares/authMiddleware");
const roleGate = require("../middlewares/roleGate");
const paymentController = require("../controllers/paymentController");

router.post(
  "/payments",
  authenticateToken,
  roleGate("SUBSCRIBER"),
  paymentController.createPayment
);

router.get(
  "/payments/user/:userId",
  authenticateToken,
  roleGate("SUBSCRIBER"),
  paymentController.getPaymentsByUser
);


module.exports = router;

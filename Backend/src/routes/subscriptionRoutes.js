const express = require("express");
const router = express.Router();
const authenticateToken = require("../middlewares/authMiddleware");
const roleGate = require("../middlewares/roleGate");
const subscriptionController = require("../controllers/subscriptionController");

router.post(
  "/subscribe",
  authenticateToken,
  roleGate("SUBSCRIBER"),
  subscriptionController.subscribe
);

router.get(
  "/subscriptions",
  authenticateToken,
  roleGate("SUBSCRIBER"),
  subscriptionController.getAllSubscriptions
);

router.get(
  "/subscriptions/:subscriptionId",
  authenticateToken,
  roleGate("SUBSCRIBER"),
  subscriptionController.getSubscriptionById
);

module.exports = router;

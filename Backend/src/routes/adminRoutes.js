const express = require("express");
const router = express.Router();
const authenticateToken = require("../middlewares/authMiddleware");
const roleGate = require("../middlewares/roleGate");
const adminController = require("../controllers/adminController");

router.get(
  "/users",
  authenticateToken,
  roleGate("ADMIN"),
  adminController.getAllUsers
);

router.get(
  "/users/:userId",
  authenticateToken,
  roleGate("ADMIN"),
  adminController.getUserById
);

router.delete(
  "/users/:userId",
  authenticateToken,
  roleGate("ADMIN"),
  adminController.deleteUser
);

router.get(
  "/subscriptions",
  authenticateToken,
  roleGate("ADMIN"),
  adminController.getAllSubscriptions
);

router.get(
  "/subscriptions/:subscriptionId",
  authenticateToken,
  roleGate("ADMIN"),
  adminController.getSubscriptionById
);

router.patch(
  "/subscriptions/:subscriptionId",
  authenticateToken,
  roleGate("ADMIN"),
  adminController.updateSubscriptionStatus
);

router.delete(
  "/subscriptions/:subscriptionId",
  authenticateToken,
  roleGate("ADMIN"),
  adminController.deleteSubscription
);

router.get(
  "/payments",
  authenticateToken,
  roleGate("ADMIN"),
  adminController.getAllPayments
);

router.get(
  "/payments/:paymentId",
  authenticateToken,
  roleGate("ADMIN"),
  adminController.getPaymentById
);

router.get(
  "/report/payments",
  authenticateToken,
  roleGate("ADMIN"),
  adminController.getPaymentsReport
);

router.delete(
  "/magazines/:magazineId",
  authenticateToken,
  roleGate("ADMIN"),
  adminController.deleteMagazine
);

router.delete(
  "/articles/:articleId",
  authenticateToken,
  roleGate("ADMIN"),
  adminController.deleteArticle
);

router.patch(
  "/comments/:commentId",
  authenticateToken,
  roleGate("ADMIN"),
  adminController.updateCommentStatus
);

module.exports = router;

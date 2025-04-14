const adminService = require("../services/adminService");
const loggingService = require("../services/loggingService");

async function getAllUsers(req, res) {
  try {
    const users = await adminService.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function getUserById(req, res) {
  try {
    const user = await adminService.getUserById(req.params.userId);
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function deleteUser(req, res) {
  try {
    await adminService.deleteUser(req.params.userId);

    loggingService.logActivity(req.user.userId, "Deleted User", {
      userId: req.params.userId,
    });

    res.status(200).json({ message: "User deleted successfully." });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function getAllSubscriptions(req, res) {
  try {
    const subscriptions = await adminService.getAllSubscriptions();
    res.status(200).json(subscriptions);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function getSubscriptionById(req, res) {
  try {
    const subscription = await adminService.getSubscriptionById(
      req.params.subscriptionId
    );
    res.status(200).json(subscription);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function updateSubscriptionStatus(req, res) {
  try {
    const subscription = await adminService.updateSubscriptionStatus(
      req.params.subscriptionId,
      req.body.status
    );

    loggingService.logActivity(req.user.userId, "Updated Subscription Status", {
      subscriptionId: req.params.subscriptionId,
      status: req.body.status,
    });

    res.status(200).json(subscription);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function deleteSubscription(req, res) {
  try {
    await adminService.deleteSubscription(req.params.subscriptionId);

    loggingService.logActivity(req.user.userId, "Deleted Subscription", {
      subscriptionId: req.params.subscriptionId,
    });

    res.status(200).json({ message: "Subscription deleted successfully." });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function getAllPayments(req, res) {
  try {
    const payments = await adminService.getAllPayments();
    res.status(200).json(payments);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function getPaymentById(req, res) {
  try {
    const payment = await adminService.getPaymentById(req.params.paymentId);
    res.status(200).json(payment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function getPaymentsReport(req, res) {
  try {
    const report = await adminService.getPaymentsReport();
    res.status(200).json(report);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function deleteMagazine(req, res) {
  try {
    await adminService.deleteMagazine(req.params.magazineId);

    loggingService.logActivity(req.user.userId, "Deleted Magazine", {
      magazineId: req.params.magazineId,
    });

    res.status(200).json({ message: "Magazine deleted successfully" });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
}

async function deleteArticle(req, res) {
  try {
    await adminService.deleteArticle(req.params.articleId);

    loggingService.logActivity(req.user.userId, "Deleted Article", {
      articleId: req.params.articleId,
    });

    res.status(200).json({ message: "Article deleted successfully" });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
}

async function updateCommentStatus(req, res) {
  try {
    const comment = await adminService.updateCommentStatus(
      req.params.commentId,
      req.body.status
    );

    loggingService.logActivity(req.user.userId, "Updated Comment Status", {
      commentId: req.params.commentId,
      status: req.body.status,
    });

    res.status(200).json(comment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

module.exports = {
  getAllUsers,
  getUserById,
  deleteUser,
  getAllSubscriptions,
  getSubscriptionById,
  updateSubscriptionStatus,
  deleteSubscription,
  getAllPayments,
  getPaymentById,
  getPaymentsReport,
  deleteMagazine,
  deleteArticle,
  updateCommentStatus,
};

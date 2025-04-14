const subscriptionService = require("../services/subscriptionService");
const loggingService = require("../services/loggingService");

async function subscribe(req, res) {
  try {
    const { magazineId, period } = req.body;
    const userId = req.user.userId;

    const subscription = await subscriptionService.createSubscription(
      userId,
      magazineId,
      period
    );

    loggingService.logActivity(userId, "Subscription Created", {
      magazineId,
      period,
    });

    res.status(200).json({
      message: "Subscription created successfully.",
      subscription,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function getAllSubscriptions(req, res) {
  try {
    const userId = req.user.userId;
    const subscriptions = await subscriptionService.getAllSubscriptions(userId);

    res.status(200).json({
      message: "All subscriptions fetched successfully.",
      subscriptions,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function getSubscriptionById(req, res) {
  try {
    const { subscriptionId } = req.params;
    const userId = req.user.userId;

    const subscription = await subscriptionService.getSubscriptionById(
      userId,
      subscriptionId
    );

    if (!subscription) {
      return res.status(404).json({ error: "Subscription not found." });
    }

    res.status(200).json({
      message: "Subscription fetched successfully.",
      subscription,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

module.exports = { subscribe, getAllSubscriptions, getSubscriptionById };

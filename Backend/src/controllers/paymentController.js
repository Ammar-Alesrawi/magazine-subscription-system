const paymentService = require("../services/paymentService");
const loggingService = require("../services/loggingService");

async function createPayment(req, res) {
  try {
    const userId = req.user.userId;
    const {subscriptionId, amount, method } = req.body;
    const payment = await paymentService.createPayment(
      userId,
      subscriptionId,
      amount,
      method
    );

    loggingService.logActivity(userId, "Payment Created", {
      subscriptionId,
      amount,
      method,
    });

    res.status(201).json(payment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function getPaymentsByUser(req, res) {
  try {
    const userId = req.params.userId;
    const payments = await paymentService.getPaymentsByUser(userId);

    res.status(200).json(payments);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

module.exports = {
  createPayment,
  getPaymentsByUser,
};

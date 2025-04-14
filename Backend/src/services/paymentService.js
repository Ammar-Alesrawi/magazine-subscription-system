const prisma = require("../config/prisma");

async function createPayment(userId, subscriptionId, amount, method) {
  const payment = await prisma.payment.create({
    data: {
      userId,
      subscriptionId,
      amount,
      method,
      paymentDate: new Date(),
    },
  });

  await prisma.subscription.update({
    where: { id: subscriptionId },
    data: {
      status: "ACTIVE",
    },
  });

  return payment;
}

async function getPaymentsByUser(userId) {
  return await prisma.payment.findMany({
    where: { userId: parseInt(userId) },
    include: {
      subscription: true,
    },
  });
}

module.exports = {
  createPayment,
  getPaymentsByUser,
};

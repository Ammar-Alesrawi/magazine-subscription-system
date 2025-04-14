const prisma = require("../config/prisma");

async function createSubscription(userId, magazineId, period) {
  const startDate = new Date();

  let endDate;
  if (period === "monthly") {
    endDate = new Date(startDate);
    endDate.setMonth(endDate.getMonth() + 1);
  } else if (period === "yearly") {
    endDate = new Date(startDate);
    endDate.setFullYear(endDate.getFullYear() + 1);
  } else {
    throw new Error("Invalid period specified. Use 'monthly' or 'yearly'.");
  }

  const subscription = await prisma.subscription.create({
    data: {
      userId,
      magazineId,
      startDate,
      endDate,
      status: "PENDING", //Waiting for payment
    },
  });

  return subscription;
}

async function getAllSubscriptions(userId) {
  return await prisma.subscription.findMany({
    where: { userId },
    include: {
      magazine: true,
    },
  });
}

async function getSubscriptionById(userId, subscriptionId) {
  return await prisma.subscription.findFirst({
    where: {
      userId,
      id: parseInt(subscriptionId),
    },
    include: {
      magazine: true,
    },
  });
}

module.exports = {
  createSubscription,
  getAllSubscriptions,
  getSubscriptionById,
};

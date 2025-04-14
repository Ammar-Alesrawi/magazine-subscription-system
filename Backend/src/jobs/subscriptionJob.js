const cron = require("node-cron");
const prisma = require("../config/prisma");
const mailService = require("../services/mailService");
const loggingService = require("../services/loggingService");

async function updateExpiredSubscriptions() {
  const now = new Date();
  await prisma.subscription.updateMany({
    where: {
      status: "ACTIVE",
      endDate: { lt: now },
    },
    data: {
      status: "EXPIRED",
    },
  });
  console.log("Expired subscriptions updated.");
}

async function checkExpiringSubscriptions() {
  try {
    const now = new Date();
    const threeDaysLater = new Date(now);
    threeDaysLater.setDate(now.getDate() + 3);

    const expiringSubscriptions = await prisma.subscription.findMany({
      where: {
        status: "ACTIVE",
        endDate: { lte: threeDaysLater, gte: now },
      },
      include: {
        user: true,
        magazine: true,
      },
    });

    for (const sub of expiringSubscriptions) {
      const email = sub.user.email;
      const subject = "Subscription Expiry Notice";
      const message = `Dear ${sub.user.name}, your subscription for magazine "${
        sub.magazine.name
      }" will expire on ${sub.endDate.toDateString()}. Please renew your subscription.`;

      await mailService.sendNotification(email, subject, message);

      loggingService.logActivity(
        sub.userId,
        "Subscription Expiry Notification Sent",
        {
          subscriptionId: sub.id,
          email,
        }
      );
    }
    console.log("Expiring subscriptions notifications sent.");
  } catch (error) {
    console.error("Error in subscription job:", error.message);
  }
}

cron.schedule("0 0 * * *", () => {
  updateExpiredSubscriptions();
  checkExpiringSubscriptions();
});

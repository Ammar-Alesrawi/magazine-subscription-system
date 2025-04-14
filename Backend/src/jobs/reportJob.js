const cron = require("node-cron");
const prisma = require("../config/prisma");
const mailService = require("../services/mailService");

async function sendReportToAdmin() {
  try {
    const activeSubscriptions = await prisma.subscription.findMany({
      where: { status: "ACTIVE" },
      include: {
        user: true,
        magazine: true,
        payments: true,
      },
    });

    const report = activeSubscriptions
      .map((sub) => {
        const paymentsReport = sub.payments
          .map(
            (payment) =>
              `Amount: ${payment.amount}, Method: ${
                payment.method
              }, Date: ${payment.paymentDate.toDateString()}`
          )
          .join("\n");

        return `User: ${sub.user.name}, Magazine: ${
          sub.magazine.name
        }, Expiry Date: ${sub.endDate.toDateString()}\nPayments:\n${paymentsReport}`;
      })
      .join("\n\n");

    const subject = "Daily Subscription and Payments Report";
    const message = `The following subscriptions are active, along with their payment details:\n\n${report}`;

    await mailService.sendNotification(
      process.env.ADMIN_EMAIL,
      subject,
      message
    );
    console.log("Subscription and payment report sent to admin.");
  } catch (error) {
    console.error("Error in sending report:", error.message);
  }
}

cron.schedule("0 1 * * *", () => {
  sendReportToAdmin();
});

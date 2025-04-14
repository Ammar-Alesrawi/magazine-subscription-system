const prisma = require("../config/prisma");

async function getAllUsers() {
  return await prisma.user.findMany();
}

async function getUserById(userId) {
  const user = await prisma.user.findUnique({
    where: { id: parseInt(userId) },
    include: {
      subscriptions: true,
      payments: true,
    },
  });
  if (!user) throw new Error("User not found");
  return user;
}

async function deleteUser(userId) {
  try {
    const updatedUser = await prisma.user.update({
      where: { id: parseInt(userId) },
      data: { isDeleted: true },
    });

    if (!updatedUser) {
      throw new Error("User not found or failed to delete");
    }

    return updatedUser;
  } catch (error) {
    throw new Error("Failed to soft delete user: " + error.message);
  }
}


async function getAllSubscriptions() {
  return await prisma.subscription.findMany({
    include: {
      user: true,
      magazine: true,
      payments: true,
    },
  });
}

async function getSubscriptionById(subscriptionId) {
  const subscription = await prisma.subscription.findUnique({
    where: { id: parseInt(subscriptionId) },
    include: {
      user: true,
      magazine: true,
      payments: true,
    },
  });
  if (!subscription) throw new Error("Subscription not found");
  return subscription;
}

async function updateSubscriptionStatus(subscriptionId, status) {
  const subscription = await prisma.subscription.update({
    where: { id: parseInt(subscriptionId) },
    data: { status },
  });
  if (!subscription) throw new Error("Subscription not found");
  return subscription;
}

async function deleteSubscription(subscriptionId) {
  await prisma.subscription.delete({
    where: { id: parseInt(subscriptionId) },
  });
}

async function getAllPayments() {
  return await prisma.payment.findMany({
    include: {
      user: true,
      subscription: true,
    },
  });
}

async function getPaymentById(paymentId) {
  const payment = await prisma.payment.findUnique({
    where: { id: parseInt(paymentId) },
  });
  if (!payment) throw new Error("Payment not found");
  return payment;
}

async function getPaymentsReport() {
  const payments = await prisma.payment.findMany({
    include: {
      user: true,
    },
  });
  let report = payments
    .map((payment) => {
      return `User: ${payment.user.name}, Amount: ${payment.amount}, Method: ${
        payment.method
      }, Date: ${payment.paymentDate.toDateString()}`;
    })
    .join("\n");

  return `Payments Report:\n${report}`;
}

async function deleteMagazine(id) {
  await prisma.magazine.delete({
    where: { id: parseInt(id) },
  });
}

async function deleteArticle(id) {
  await prisma.article.delete({
    where: { id: parseInt(id) },
  });
}

async function updateCommentStatus(commentId,status) {
  const comment = await prisma.comment.update({
    where: { id: parseInt(commentId) },
    data: { status },
  });
  if (!comment) throw new Error("Comment not found");
  return comment;
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

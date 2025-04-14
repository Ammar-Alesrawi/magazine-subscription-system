const prisma = require("../config/prisma");

const logActivity = async (userId, action, metadata = {}) => {
  try {
    await prisma.activityLog.create({
      data: {
        userId,
        action,
        metadata,
      },
    });
  } catch (error) {
    console.error("Error logging activity:", error.message);
  }
};

module.exports = {
  logActivity,
};

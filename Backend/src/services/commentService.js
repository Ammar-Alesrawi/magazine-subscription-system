const prisma = require("../config/prisma");

async function addComment(userId, articleId, content) {
  if (!content || content.trim().length === 0) {
    throw new Error("Content is required");
  }

  try {
    const newComment = await prisma.comment.create({
      data: {
        userId,
        articleId,
        content,
        status: "ACTIVE",
      },
    });
    return newComment;
  } catch (error) {
    throw new Error("Failed to add comment: " + error.message);
  }
}

async function getComments(articleId) {
  try {
    const comments = await prisma.comment.findMany({
      where: {
        articleId,
        status: "ACTIVE",
      },
      include: {
        user: true,
      },
    });
    return comments;
  } catch (error) {
    throw new Error("Failed to fetch comments: " + error.message);
  }
}


module.exports = {
  addComment,
  getComments,
};

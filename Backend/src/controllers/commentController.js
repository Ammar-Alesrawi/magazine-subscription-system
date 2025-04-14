const commentService = require("../services/commentService");
const loggingService = require("../services/loggingService");

async function addComment(req, res) {
  const { articleId, content } = req.body;
  const userId = req.user.userId;

  try {
    const newComment = await commentService.addComment(
      userId,
      articleId,
      content
    );

    loggingService.logActivity(userId, "Added Comment", {
      articleId,
      content,
    });

    res.status(201).json(newComment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function getComments(req, res) {
  const { articleId } = req.params;

  try {
    const comments = await commentService.getComments(articleId);
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}


module.exports = {
  addComment,
  getComments,
};

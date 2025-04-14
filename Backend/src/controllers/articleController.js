const articleService = require("../services/articleService");
const loggingService = require("../services/loggingService");

async function createArticle(req, res) {
  try {
    const { title, content, magazineId } = req.body;
    const article = await articleService.createArticle(
      title,
      content,
      magazineId
    );

    loggingService.logActivity(req.user.userId, "Created Article", {
      title,
      magazineId,
    });

    res.status(201).json(article);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function getAllArticles(req, res) {
  try {
    const articles = await articleService.getAllArticles();
    res.status(200).json(articles);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function getArticleById(req, res) {
  try {
    const article = await articleService.getArticleById(req.params.articleId);
    res.status(200).json(article);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
}

async function updateArticle(req, res) {
  try {
    const { title, content, publishDate } = req.body;
    const article = await articleService.updateArticle(
      req.params.articleId,
      title,
      content,
      publishDate
    );

    loggingService.logActivity(req.user.userId, "Updated Article", {
      articleId: req.params.articleId,
      title,
    });

    res.status(200).json(article);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

module.exports = {
  createArticle,
  getAllArticles,
  getArticleById,
  updateArticle,
};

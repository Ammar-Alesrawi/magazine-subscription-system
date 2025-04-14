const express = require("express");
const router = express.Router();
const authenticateToken = require("../middlewares/authMiddleware");
const roleGate = require("../middlewares/roleGate");
const articleController = require("../controllers/articleController");

router.post(
  "/articles",
  authenticateToken,
  roleGate("PUBLISHER"),
  articleController.createArticle
);

router.get("/articles", authenticateToken, articleController.getAllArticles);

router.get(
  "/articles/:articleId",
  authenticateToken,
  articleController.getArticleById
);

router.patch(
  "/articles/:articleId",
  authenticateToken,
  roleGate("PUBLISHER"),
  articleController.updateArticle
);


module.exports = router;

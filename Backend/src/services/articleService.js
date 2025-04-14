const prisma = require("../config/prisma");

async function createArticle(title, content, magazineId) {
  const article = await prisma.article.create({
    data: {
      title,
      content,
      magazineId,
    },
  });
  return article;
}

async function getAllArticles() {
  return await prisma.article.findMany({
    include: {
      magazine: true,
      comments: true,
    },
  });
}

async function getArticleById(articleId) {
  const article = await prisma.article.findUnique({
    where: { id: parseInt(articleId) },
    include: {
      magazine: true,
      comments: true,
    },
  });
  if (!article) throw new Error("Article not found");
  return article;
}

async function updateArticle(id, title, content, publishDate) {
  const article = await prisma.article.update({
    where: { id: parseInt(id) },
    data: {
      title,
      content,
      publishDate,
    },
  });
  if (!article) throw new Error("Article not found");
  return article;
}


module.exports = {
  createArticle,
  getAllArticles,
  getArticleById,
  updateArticle,
};

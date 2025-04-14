const prisma = require("../config/prisma");

async function createMagazine(name, description, releaseDate) {
  const magazine = await prisma.magazine.create({
    data: {
      name,
      description,
      releaseDate: new Date(releaseDate),
    },
  });
  return magazine;
}

async function getAllMagazines() {
  return await prisma.magazine.findMany({
    include: {
      articles: true,
    },
  });
}

async function getMagazineById(magazineId) {
  const magazine = await prisma.magazine.findUnique({
    where: { id: parseInt(magazineId) },
    include: {
      articles: true,
    },
  });
  if (!magazine) throw new Error("Magazine not found");
  return magazine;
}

async function updateMagazine(id, name, description, releaseDate) {
  const magazine = await prisma.magazine.update({
    where: { id: parseInt(id) },
    data: {
      name,
      description,
      releaseDate: new Date(releaseDate),
    },
  });
  if (!magazine) throw new Error("Magazine not found");
  return magazine;
}

module.exports = {
  createMagazine,
  getAllMagazines,
  getMagazineById,
  updateMagazine,
};

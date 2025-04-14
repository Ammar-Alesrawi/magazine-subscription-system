const magazineService = require("../services/magazineService");
const loggingService = require("../services/loggingService");

async function createMagazine(req, res) {
  try {
    const { name, description, releaseDate } = req.body;
    const magazine = await magazineService.createMagazine(
      name,
      description,
      releaseDate
    );

    loggingService.logActivity(req.user.userId, "Created Magazine", {
      name,
      description,
      releaseDate,
    });

    res.status(201).json(magazine);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function getAllMagazines(req, res) {
  try {
    const magazines = await magazineService.getAllMagazines();
    res.status(200).json(magazines);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function getMagazineById(req, res) {
  try {
    const magazine = await magazineService.getMagazineById(
      req.params.magazineId
    );
    res.status(200).json(magazine);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
}

async function updateMagazine(req, res) {
  try {
    const { name, description, releaseDate } = req.body;
    const magazine = await magazineService.updateMagazine(
      req.params.magazineId,
      name,
      description,
      releaseDate
    );

    loggingService.logActivity(req.user.userId, "Updated Magazine", {
      magazineId: req.params.magazineId,
      name,
      description,
      releaseDate,
    });

    res.status(200).json(magazine);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}


module.exports = {
  createMagazine,
  getAllMagazines,
  getMagazineById,
  updateMagazine,
};

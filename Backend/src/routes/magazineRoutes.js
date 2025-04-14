const express = require("express");
const router = express.Router();
const authenticateToken = require("../middlewares/authMiddleware");
const roleGate = require("../middlewares/roleGate");
const magazineController = require("../controllers/magazineController");

router.post(
  "/magazines",
  authenticateToken,
  roleGate("PUBLISHER"),
  magazineController.createMagazine
);

router.get("/magazines", authenticateToken, magazineController.getAllMagazines);

router.get(
  "/magazines/:magazineId",
  authenticateToken,
  magazineController.getMagazineById
);

router.patch(
  "/magazines/:magazineId",
  authenticateToken,
  roleGate("PUBLISHER"),
  magazineController.updateMagazine
);


module.exports = router;

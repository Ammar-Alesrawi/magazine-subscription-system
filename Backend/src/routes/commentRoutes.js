const express = require("express");
const router = express.Router();
const commentController = require("../controllers/commentController");
const authenticateToken = require("../middlewares/authMiddleware");
const roleGate = require("../middlewares/roleGate");

router.post("/comments", authenticateToken, roleGate("SUBSCRIBER"), commentController.addComment);

router.get("/comments/:magazineId",authenticateToken,commentController.getComments);


module.exports = router;

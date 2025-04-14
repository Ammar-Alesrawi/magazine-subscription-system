const router = require("express").Router();
const authRoutes = require("./authRoutes");
const subscriptionRoutes = require("./subscriptionRoutes");
const adminRoutes = require("./adminRoutes");
const articleRoutes = require("./articleRoutes");
const commentRoutes = require("./commentRoutes");
const magazineRoutes = require("./magazineRoutes");
const paymentRoutes = require("./paymentRoutes");

router.use("/Magazine", authRoutes);
router.use("/Magazine", subscriptionRoutes);
router.use("/Magazine/admin", adminRoutes);
router.use("/Magazine", articleRoutes);
router.use("/Magazine", commentRoutes);
router.use("/Magazine", magazineRoutes);
router.use("/Magazine", paymentRoutes);

module.exports = router;

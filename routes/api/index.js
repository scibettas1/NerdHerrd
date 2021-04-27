const router = require("express").Router();
const userRoutes = require("./userRoutes");
const cardRoutes = require("./cardRoutes");
const chatRoutes = require("./chatRoutes");
const tradeRoutes = require("./tradeRoutes");

// Book routes
router.use("/users", userRoutes);
router.use("/cards", cardRoutes);
router.use("/chats", chatRoutes);
router.use("/trades", tradeRoutes);

module.exports = router;
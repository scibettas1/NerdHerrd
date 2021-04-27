const router = require("express").Router();
const chatController = require("../../controllers/chatController");

// Matches with "/api/books"
// router.route("/")
// .post(chatController.createRoom)
//   .get(chatController.checkForRoom)

router.route("/")
.post(chatController.check)
  

// // Matches with "/api/books/:id"
// router.route("/:id")
//   .get(chatController.loadMessages)
//   .put(chatController.writeMessage)
//   .delete(cardController.remove);

module.exports = router;
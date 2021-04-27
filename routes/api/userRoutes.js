const router = require("express").Router();
const userController = require("../../controllers/userController");

// Matches with "/api/books"
router.route("/")
  .get(userController.findAll)
  .post(userController.create)
  .put(userController.executeTrade);

// Matches with "/api/books/:id"
router.route("/:id")
.get(userController.findByEmail);
  // .get(userController.findById)
  // .put(userController.update)
  // .delete(userController.remove);

// Matches with "/api/profile/books/:id"
router.route("/profile/:id")
.get(userController.findById);


module.exports = router;
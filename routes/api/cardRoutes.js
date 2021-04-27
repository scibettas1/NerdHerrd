const router = require("express").Router();
const cardController = require("../../controllers/cardController");

// Matches with "/api/books"
router.route("/")
  .get(cardController.findAll)
  

// Matches with "/api/books/:id"
router.route("/:id")
  .post(cardController.create)
  .get(cardController.findOne)
  .put(cardController.update)

router.route("/:id/:uuid")
  .delete(cardController.remove);

module.exports = router;
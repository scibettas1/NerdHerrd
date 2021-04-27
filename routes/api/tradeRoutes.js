const router = require("express").Router();
const tradeController = require("../../controllers/tradeController");

// Matches with "/api/books"
router.route("/")
.post(tradeController.create)

router.route("/verify")
.put(tradeController.cancelTrades)
  
// Matches with "/api/books/:id"
router.route("/:id")
.get(tradeController.find)
  // .get(tradeController.findOne)
.put(tradeController.update)
.delete(tradeController.remove);

module.exports = router;
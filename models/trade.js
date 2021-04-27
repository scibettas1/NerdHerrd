const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { v4: uuidv4 } = require("uuid");

const tradeSchema = new Schema({
  uuid: {
    type: String,
    default: function genUUID() {
      return uuidv4();
    },
  },
  proposedBy: {
    type: String,
    required: true,
  },
  proposedTo: {
    type: String,
    required: true,
  },
  proposedByProducts: [],
  proposedToProducts: [],
  createdAt: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    required: true,
  } 
});

const Trade = mongoose.model("Trade", tradeSchema);

module.exports = Trade;

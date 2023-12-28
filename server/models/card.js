const mongoose = require("mongoose");
const cardSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
//   card_id: {
//     type: [Number],
//     required: true,
//   },
});

module.exports = User = mongoose.model("Card", cardSchema);

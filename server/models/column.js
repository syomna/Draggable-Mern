const mongoose = require("mongoose");
const columnSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  card_id: {
    type: [String],
    required: true,
  },
});

module.exports = User = mongoose.model("Column", columnSchema);

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
app.use(express.json());
const cors = require("cors");
app.use(cors());

const ColumnModel = require("../models/Column");
const CardModel = require("../models/Card");

mongoose.connect(process.env.DB_CONNECT);

app.get("/columns", async (req, res) => {
  const columns = await ColumnModel.find();
  res.status(200).json(columns);
});

app.get("/cards", async (req, res) => {
  const cards = await CardModel.find();
  res.status(200).json(cards);
});

app.post("/change-cards", async (req, res) => {
  const columnId = req.body.columnId;
    const cardId = req.body.cardId;
    console.log(`columnId ${columnId} cardId ${cardId}`);

 await ColumnModel.updateMany(
    { card_id: cardId },
    { $pull: { card_id: cardId } }
  );

  const update = await ColumnModel.findOneAndUpdate(
    { _id: columnId },
    { $push: { card_id: cardId } },
    { new: true }
  );
  console.log(update);

  res.status(200).json({ message: "updated!" });
});

app.listen(3000, () => console.log("Running on PORT 3000!"));

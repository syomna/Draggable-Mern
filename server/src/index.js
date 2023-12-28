const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
app.use(express.json());
const cors = require("cors");
app.use(cors());

const ColumnModel = require("./models/Column");
const CardModel = require("./models/Card");

mongoose.connect(
  "mongodb+srv://yomna:12345678Yo@cluster23429.ddszajq.mongodb.net/test",
  {
    user: "yomna",
    pass: "12345678Yo",
  }
);

const { MongoClient, ServerApiVersion } = require("mongodb");
const uri =
  "mongodb+srv://yomna:12345678Yo@cluster23429.ddszajq.mongodb.net/?retryWrites=true&w=majority";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});
async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);

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

app.listen(3000, "0.0.0.0", () => console.log("Running on PORT 3000!"));

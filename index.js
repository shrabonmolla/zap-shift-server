const express = require("express");
const cors = require("cors");
require("dotenv").config();

const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.visb7wb.mongodb.net/?appName=Cluster0`;

const port = 3000;

const app = express();

// middleware
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("O amai valobaseniiiiiiiiiiiiii");
});

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
    const db = client.db("parcelsDb");
    const parcelCol = db.collection("parcelCol");

    // get all parcel
    app.get("/parcels", async (req, res) => {
      const corsur = parcelCol.find();
      const result = await corsur.toArray();
      res.send(result);
    });

    // create parcel
    app.post("/parcels", async (req, res) => {
      const parcelData = req.body;
      const result = await parcelCol.insertOne(parcelData);
      res.send(result);
    });

    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
  }
}
run().catch(console.dir);

app.listen(port, () => console.log("mama server colteseeeeeee"));

const express = require("express");
require('dotenv').config()
const app = express();
const cors = require("cors");
const port = process.env.PORT || 5000;
// middlewares
app.use(express.json());
app.use(cors());

// mongodb driver
const { MongoClient, ServerApiVersion } = require('mongodb');
// const uri = "mongodb+srv://<username>:<password>@cluster0.geunt7i.mongodb.net/?retryWrites=true&w=majority";
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.geunt7i.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        
                const database = client.db("HouseHunterDB");
                const seed = database.collection("seed");

        // localhost:5000/api/v1/seed?page=5&limit=10
        app.get("/api/v1/seed", async (req, res) => {

            //pagination
            const page = +req.query.page; 
            const limit = +req.query.limit;
            const skip = (page -1) * limit || 5;

            const cursor = seed.find().skip(skip).limit(limit);
            const result = await cursor.toArray();

            res.send(result);
        })

        // Send a ping to confirm a successful connection
        // await client.db("admin").command({ ping: 1 });
        // console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);


app.get("/", (req, res) => {
    res.send("HOUSE HUNTER Server is running")
})

app.listen(port, () => {
    console.log(`HOUSE HUNTER Server is running on port, ${port}`);
})
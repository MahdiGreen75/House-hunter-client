const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 5000;

// middlewares
app.use(express.json());
app.use(cors());

// mongodb driver



app.get("/", (req, res) => {
    res.send("HOUSE HUNTER Server is running")
})

app.listen(port, ()=>{
    console.log(`HOUSE HUNTER Server is running on port, ${port}`);
})
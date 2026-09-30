const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());


mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB connected successfully");
    })
    .catch((error) => {
        console.log("MongoDB connection failed");
        console.log(error.message);
    });




app.get("/", (req, res) => {
    res.json({
        message: "ShopEase Backend is running!"
    });
});




const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(
        `ShopEase Backend running on http://localhost:${PORT}`
    );
});
const mongoose = require("mongoose");
const express = require("express");
const app = express();
const Product = require('./models/product.model'); 
app.use(express.json());

mongoose
  .connect(
    "mongodb+srv://apayagalagegr52017:PQNLw3mqvtY8u4Y1@cluster0.z0oz6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    console.log("Connected to Mongodb Database");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });

app.listen(4000, () => {
  console.log("Server listening on port: 4000");
});

app.get("/", (req, res) => {
  res.send("Welcome to cluster");
});

app.post("/api/products", async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (error) {
    console.error("Error creating product", error);
    res.status(400).json({ error: error.message });
  }
});
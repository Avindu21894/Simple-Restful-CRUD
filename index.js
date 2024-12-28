const mongoose = require("mongoose");
const express = require("express");
const app = express();
const Product = require("./models/product.model");
app.use(express.json());
app.use(express.urlencoded({extended: false})); // Allows to add using form format in API (Postman)

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

// Get all products

app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get product by id

app.get("/api/product/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create a new product

app.post("/api/products", async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (error) {
    console.error("Error creating product", error);
    res.status(400).json({ error: error.message });
  }
});

// Update a product

app.put("/api/product/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body);
    if (!product) {
      res.status(404).json({ message: "Product not found" });
    }
    const updatedProduct = await Product.findById(id);
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a product

app.delete("/api/product/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const mongoose = require("mongoose");

const ProductsSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter the name of the product"],
    },
    quantity: {
      type: Number,
      required: [true, "Please enter the quantity of the product"],
      default: 0,
    },
    image: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product",ProductsSchema);

module.exports = Product;

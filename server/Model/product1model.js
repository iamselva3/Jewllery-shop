// Model/product1model.js
import mongoose from "mongoose";

const product1Schema = new mongoose.Schema({
  name: String,
  price: Number,
  stock: Number,
  description: String,
  category: String,
  manufacturingDate: Date,
  image: String
});

export default mongoose.model("Product1", product1Schema);

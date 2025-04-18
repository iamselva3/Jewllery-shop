import mongoose from "mongoose";

const product2Schema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
  description: { type: String },
  category: { type: String },
  manufacturingDate: { type: Date },
  image: { type: String }
});

const Product2 = mongoose.model("Product2", product2Schema);

export default Product2;

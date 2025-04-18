import express from "express";
import multer from "multer";
import {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from "../Controller/product1contoller.js"; // Make sure the controller is renamed/pointing to Product1

const product1 = express.Router();

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  }
});
const upload = multer({ storage });

// Routes
product1.post("/product1", upload.single("image"), createProduct);
product1.get("/product1", getAllProducts);
product1.get("/product1/:id", getProductById);
product1.put("/update/product1/:id", upload.single("image"), updateProduct);
product1.delete("/delete/product1/:id", deleteProduct);

export default product1;

import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProductById,
  searchProducts,
  updateProduct
} from "../Controller/productcontroller.js"; // use lowercase "controller" unless your folder is "Controller"

const productroute = express.Router();

// Ensure uploads directory exists
const uploadDir = "uploads/";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer Storage Configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // e.g., 1713456178345.jpg
  }
});

// Initialize multer middleware
const upload = multer({ storage });

// Product Routes
productroute.post("/product_details", upload.single("image"), createProduct);
productroute.get("/products", getAllProducts);
productroute.get("/product/:id", getProductById);
productroute.put("/update/product/:id", upload.single("image"), updateProduct);
productroute.delete("/delete/product/:id", deleteProduct);
// productroute.get("/search/products", searchProducts);

export default productroute;

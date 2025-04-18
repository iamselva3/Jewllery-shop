import express from "express";
import multer from "multer";
import {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from "../Controller/product2contoller.js";

const product2 = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  }
});
const upload = multer({ storage });

product2.post("/product2", upload.single("image"), createProduct);
product2.get("/product2", getAllProducts);
product2.get("/product2/:id", getProductById);
product2.put("/update/product2/:id", upload.single("image"), updateProduct);
product2.delete("/delete/product2/:id", deleteProduct);

export default product2;

import Product2 from "../Model/product2model.js"
import fs from "fs";

export const createProduct = async (req, res) => {
  try {
    const { name, price, stock, description, category, manufacturingDate } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : "";

    const productExist = await Product2.findOne({ name });
    if (productExist) {
      return res.status(400).json({ message: "Product already exists" });
    }

    const newProduct = new Product2({
      name, price, stock, description, category, manufacturingDate, image
    });

    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

export const getAllProducts = async (req, res) => {
  try {
    const products = await Product2.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Error fetching products", error });
  }
};

export const getProductById = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Product2.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { name, price, stock, description, category, manufacturingDate } = req.body;
    let image = req.body.image;

    if (req.file) {
      image = `/uploads/${req.file.filename}`;
    }

    const updatedProduct = await Product2.findByIdAndUpdate(
      req.params.id,
      { name, price, stock, description, category, manufacturingDate, image },
      { new: true }
    );

    res.status(200).json({ message: "Product updated", updatedProduct });
  } catch (error) {
    res.status(500).json({ message: "Error updating product", error });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const product = await Product2.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (product.image) {
      fs.unlink(`.${product.image}`, (err) => {
        if (err) console.log("Failed to delete image:", err);
      });
    }

    await Product2.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting product", error });
  }
};

import Product from "../Model/productmodel.js";
import fs from "fs";

// Create a new product
export const createProduct = async (req, res) => {
  try {
    const { name, price, stock, description, category, manufacturingDate } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : "";

    // Check if product already exists
    const productExist = await Product.findOne({ name });
    if (productExist) {
      return res.status(400).json({ message: "Product already exists" });
    }

    const newProduct = new Product({
      name,
      price,
      stock,
      description,
      category,
      manufacturingDate,
      image
    });

    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

// Get all products
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Error fetching products", error });
  }
};

// Get product by ID
export const getProductById = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

// Update product
export const updateProduct = async (req, res) => {
  try {
    const { name, price, stock, description, category, manufacturingDate } = req.body;
    let image = req.body.image;

    if (req.file) {
      image = `/uploads/${req.file.filename}`;
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { name, price, stock, description, category, manufacturingDate, image },
      { new: true }
    );

    res.status(200).json({ message: "Product updated", updatedProduct });
  } catch (error) {
    res.status(500).json({ message: "Error updating product", error });
  }
};

// Delete product
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Delete image from file system
    if (product.image) {
      fs.unlink(`.${product.image}`, (err) => {
        if (err) console.log("Failed to delete image:", err);
      });
    }

    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting product", error });
  }
};


export const searchProducts = async (req, res) => {
    try {
      const keyword = req.query.q;
  
      const products = await Product.find({
        name: { $regex: keyword, $options: "i" }
      }).limit(5); // Optional: limit to 5 suggestions
  
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ message: "Search failed", error });
    }
};
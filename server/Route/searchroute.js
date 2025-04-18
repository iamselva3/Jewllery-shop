// routes/searchRoutes.js
import express from "express";
import Product from "../Model/productmodel.js";
import Product1 from "../Model/product1model.js";
import Product2 from "../Model/product2model.js";

const searchrouter = express.Router();

searchrouter.get("/search/products", async (req, res) => {
  const query = req.query.q;

  try {
    const [results1, results2, results3] = await Promise.all([
      Product.find({ name: { $regex: query, $options: "i" } }).limit(5),
      Product1.find({ name: { $regex: query, $options: "i" } }).limit(5),
      Product2.find({ name: { $regex: query, $options: "i" } }).limit(5),
    ]);

    const allResults = [...results1, ...results2, ...results3];
    res.json(allResults);
  } catch (error) {
    res.status(500).json({ message: "Search error", error });
  }
});

export default searchrouter;

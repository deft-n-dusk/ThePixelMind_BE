const express = require("express");
const productRouter = express.Router();
const Product = require("../models/product");
const { userAuth } = require("../middlewares/auth");
const { validateProductAddData } = require("../utils/validation");

productRouter.post("/product/add", userAuth, async (req, res) => {
  try {
    const { title, price, description, categoryId, imageURL } = req.body;

    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(400).json({ success: false, message: "Invalid category" });
    }

    const product = new Product({
      title,
      price,
      description,
      category: categoryId, // store reference
      imageURL,
    });

    await product.save();

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      product,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});


// ✅ GET All Products (with category populated)
productRouter.get("/products", userAuth, async (req, res) => {
  try {
    const products = await Product.find().populate("category"); // populate category reference

    res.status(200).json({
      success: true,
      products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// ✅ GET Single Product by ID (with category populated)
productRouter.get("/product/:id", userAuth, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate("category");

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});



// GET /products?search=phone&category=electronics
productRouter.get("/products", userAuth, async (req, res) => {
  try {
    const { search, category } = req.query;
    let query = {};

    if (search) {
      query.title = { $regex: search, $options: "i" }; // case-insensitive search
    }
    if (category) {
      query.category = category;
    }

    const products = await Product.find(query);
    res.status(200).json({ success: true, products });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});


// UPDATE Product by ID
productRouter.patch("/product/:id", userAuth, async (req, res) => {
  try {
    const updates = Object.keys(req.body);
    const allowedUpdates = ["title", "price", "description", "category", "imageURL"];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

    if (!isValidOperation) {
      return res.status(400).json({ success: false, message: "Invalid updates!" });
    }

    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    updates.forEach((update) => (product[update] = req.body[update]));
    await product.save();

    res.status(200).json({ success: true, message: "Product updated", product });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// DELETE Product by ID
productRouter.delete("/product/:id", userAuth, async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = productRouter;

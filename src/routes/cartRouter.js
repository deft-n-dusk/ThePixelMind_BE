const express = require("express");
const cartRouter = express.Router();
const Cart = require("../models/cart");
const {userAuth} = require("../middlewares/auth")


//Add to Cart
cartRouter.post("/cart/add", userAuth, async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    let cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      cart = new Cart({ user: req.user._id, items: [] });
    }

    const itemIndex = cart.items.findIndex(item => item.product.toString() === productId);

    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += quantity;
    } else {
      cart.items.push({ product: productId, quantity });
    }

    await cart.save();
    res.status(200).json({ success: true, message: "Item added to cart", cart });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});


//Remove from Cart
cartRouter.delete("/cart/remove/:productId", userAuth, async (req, res) => {
  try {
    let cart = await Cart.findOne({ user: req.user._id });
    if (!cart) return res.status(404).json({ success: false, message: "Cart not found" });

    cart.items = cart.items.filter(item => item.product.toString() !== req.params.productId);
    await cart.save();

    res.status(200).json({ success: true, message: "Item removed", cart });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});


//Get user's cart
cartRouter.get("/cart", userAuth, async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id }).populate("items.product");
    res.status(200).json({ success: true, cart: cart || { items: [] } });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

module.exports = cartRouter;
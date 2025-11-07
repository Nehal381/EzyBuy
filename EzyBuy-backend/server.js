const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Mock products data
let products = [
  { id: 1, name: "Wireless Earbuds", price: 1299 },
  { id: 2, name: "Bluetooth Speaker", price: 2499 },
  { id: 3, name: "Smart Watch", price: 3999 },
  { id: 4, name: "Laptop Stand", price: 899 },
  { id: 5, name: "USB Type-C Cable", price: 299 },
  { id: 6, name: "Gaming Mouse", price: 1599 },
  { id: 7, name: "Mechanical Keyboard", price: 2999 }
];

// Cart array
let cart = [];

// ✅ GET all products
app.get("/api/products", (req, res) => {
  res.json(products);
});

// ✅ GET cart
app.get("/api/cart", (req, res) => {
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  res.json({ items: cart, total });
});

// ✅ POST add to cart
app.post("/api/cart", (req, res) => {
  const { productId, qty } = req.body;
  const product = products.find((p) => p.id === productId);
  if (!product) return res.status(404).json({ error: "Product not found" });

  const existing = cart.find((c) => c.id === productId);
  if (existing) {
    existing.qty += qty;
  } else {
    cart.push({ ...product, qty });
  }

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  res.json({ items: cart, total });
});

// ✅ DELETE remove item from cart
app.delete("/api/cart/:id", (req, res) => {
  const id = parseInt(req.params.id);
  cart = cart.filter((item) => item.id !== id);
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  res.json({ items: cart, total });
});

// ✅ POST checkout
app.post("/api/checkout", (req, res) => {
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const timestamp = new Date().toISOString();
  const receipt = { message: "Checkout successful", total, timestamp };
  cart = []; // clear cart
  res.json(receipt);
});

// ✅ Start server
const PORT = 5000;
app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));

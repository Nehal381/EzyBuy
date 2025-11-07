import React, { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:5000/api";

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [receipt, setReceipt] = useState(null);
  const [form, setForm] = useState({ name: "", email: "" });

  // Fetch products + cart
  useEffect(() => {
    axios.get(`${API_URL}/products`).then((res) => setProducts(res.data));
    fetchCart();
  }, []);

  const fetchCart = () => {
    axios.get(`${API_URL}/cart`).then((res) => {
      setCart(res.data.items);
      setTotal(res.data.total);
    });
  };

  const addToCart = (id) => {
    axios.post(`${API_URL}/cart`, { productId: id, qty: 1 }).then(() => fetchCart());
  };

  const removeFromCart = (id) => {
    axios.delete(`${API_URL}/cart/${id}`).then(() => fetchCart());
  };

  const checkout = (e) => {
    e.preventDefault();
    if (!form.name || !form.email) {
      alert("Please enter your name and email before checkout!");
      return;
    }
    axios.post(`${API_URL}/checkout`, { cartItems: cart }).then((res) => {
      setReceipt(res.data);
      setShowModal(true);
      fetchCart();
      setForm({ name: "", email: "" });
    });
  };

  return (
    <div style={{ fontFamily: "sans-serif", padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
      <h1 style={{ textAlign: "center" }}>EzyBuy 🛒</h1>
      <h2>Products</h2>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
        {products.map((p) => (
          <div
            key={p.id}
            style={{
              border: "1px solid #ddd",
              borderRadius: "10px",
              padding: "10px",
              width: "200px",
              textAlign: "center",
            }}
          >
            <h3>{p.name}</h3>
            <p>₹{p.price}</p>
            <button onClick={() => addToCart(p.id)}>Add to Cart</button>
          </div>
        ))}
      </div>

      <h2 style={{ marginTop: "40px" }}>🛍️ Cart</h2>
      {cart.length === 0 ? (
        <p>Cart is empty</p>
      ) : (
        <div>
          {cart.map((item) => (
            <div
              key={item.id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "10px",
                borderBottom: "1px solid #eee",
                paddingBottom: "5px",
              }}
            >
              <span>
                {item.name} x {item.qty}
              </span>
              <span>₹{item.price * item.qty}</span>
              <button onClick={() => removeFromCart(item.id)}>❌</button>
            </div>
          ))}
          <h3>Total: ₹{total}</h3>

          <form onSubmit={checkout} style={{ marginTop: "20px" }}>
            <input
              type="text"
              placeholder="Enter your name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              style={{ padding: "8px", marginRight: "10px", width: "40%" }}
            />
            <input
              type="email"
              placeholder="Enter your email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              style={{ padding: "8px", marginRight: "10px", width: "40%" }}
            />
            <button type="submit" style={{ padding: "8px 16px" }}>
              Checkout
            </button>
          </form>
        </div>
      )}

      {/* Modal for receipt */}
      {showModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          onClick={() => setShowModal(false)}
        >
          <div
            style={{
              background: "#fff",
              padding: "30px",
              borderRadius: "10px",
              textAlign: "center",
              minWidth: "300px",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2>🧾 Checkout Receipt</h2>
            <p><strong>Status:</strong> {receipt?.message}</p>
            <p><strong>Total:</strong> ₹{receipt?.total}</p>
            <p><strong>Time:</strong> {new Date(receipt?.timestamp).toLocaleString()}</p>
            <button onClick={() => setShowModal(false)} style={{ marginTop: "10px" }}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;

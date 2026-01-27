const express = require("express");
const fs = require("fs");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// TEST ROUTE
app.get("/", (req, res) => {
  res.send("Hotel Pixi backend is running");
});

// ROOM BOOKING
app.post("/book", (req, res) => {
  const booking = req.body;
  const data = JSON.parse(fs.readFileSync("bookings.json"));
  data.push(booking);
  fs.writeFileSync("bookings.json", JSON.stringify(data, null, 2));
  res.json({ message: "Booking confirmed at Hotel Pixi 🏨" });
});

// FOOD ORDER
app.post("/order", (req, res) => {
  const order = req.body;
  const data = JSON.parse(fs.readFileSync("orders.json"));
  data.push(order);
  fs.writeFileSync("orders.json", JSON.stringify(data, null, 2));
  res.json({ message: "Food order placed successfully 🍽️" });
});

// PAYMENT
app.post("/pay", (req, res) => {
  const payment = req.body;
  const data = JSON.parse(fs.readFileSync("payments.json"));
  data.push(payment);
  fs.writeFileSync("payments.json", JSON.stringify(data, null, 2));
  res.json({ message: "Payment successful 💳" });
});

// ADMIN DATA
app.get("/bookings", (req, res) => {
  res.json(JSON.parse(fs.readFileSync("bookings.json")));
});

app.get("/orders", (req, res) => {
  res.json(JSON.parse(fs.readFileSync("orders.json")));
});

app.get("/payments", (req, res) => {
  res.json(JSON.parse(fs.readFileSync("payments.json")));
});

// ADMIN LOGIN
const ADMIN = { username: "admin", password: "pixi123" };

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  res.json({ success: username === ADMIN.username && password === ADMIN.password });
});

// START SERVER (ONLY ONCE)
app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});


const express = require("express");
const fs = require("fs");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("Hotel Pixi backend running ");
});

// ROOM BOOKING (UPDATED: age & gender added)
app.post("/book", (req, res) => {
  const booking = req.body;

  const data = JSON.parse(fs.readFileSync("bookings.json"));
  data.push({
    name: booking.name,
    email: booking.email,
    age: booking.age,
    gender: booking.gender,
    room: booking.room,
    date: booking.date,
    price: booking.price
  });

  fs.writeFileSync("bookings.json", JSON.stringify(data, null, 2));
  res.json({ message: "Room booking confirmed ✅" });
});

// FOOD ORDER
app.post("/order", (req, res) => {
  const order = req.body;
  const data = JSON.parse(fs.readFileSync("orders.json"));
  data.push(order);
  fs.writeFileSync("orders.json", JSON.stringify(data, null, 2));
  res.json({ message: "Food order placed 🍽️" });
});

// PAYMENT
app.post("/pay", (req, res) => {
  const payment = req.body;
  const data = JSON.parse(fs.readFileSync("payments.json"));
  data.push(payment);
  fs.writeFileSync("payments.json", JSON.stringify(data, null, 2));
  res.json({ message: "Payment successful 💳" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Server running on port " + PORT));

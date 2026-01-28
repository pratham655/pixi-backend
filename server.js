const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hotel Pixi backend is running");
});

// ROOM BOOKING
app.post("/book", (req, res) => {
  res.json({ message: "Room booking confirmed " });
});

// FOOD ORDER
app.post("/order", (req, res) => {
  res.json({ message: "Food order confirmed " });
});

// PAYMENT
app.post("/pay", (req, res) => {
  res.json({ message: "Payment successful " });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});

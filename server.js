const express = require("express");
const fs = require("fs");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/book", (req, res) => {
  const data = JSON.parse(fs.readFileSync("bookings.json"));
  data.push(req.body);
  fs.writeFileSync("bookings.json", JSON.stringify(data, null, 2));
  res.json({ message: "Room booked" });
});

app.post("/order", (req, res) => {
  const data = JSON.parse(fs.readFileSync("orders.json"));
  data.push(req.body);
  fs.writeFileSync("orders.json", JSON.stringify(data, null, 2));
  res.json({ message: "Food ordered" });
});

app.post("/pay", (req, res) => {
  let data = [];
  if (fs.existsSync("payments.json")) {
    data = JSON.parse(fs.readFileSync("payments.json"));
  }
  data.push(req.body);
  fs.writeFileSync("payments.json", JSON.stringify(data, null, 2));
  res.json({ message: "Payment done" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Server running"));

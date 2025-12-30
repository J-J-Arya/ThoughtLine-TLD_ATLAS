require('dotenv').config();
const express = require("express");
const cors = require("cors"); // <-- import cors
const app = express();
const authRoutes = require("./routes/auth");

app.use(cors({ origin: "http://localhost:5173" })); // <-- allow frontend
app.use(express.json());

app.get("/", (req, res) => {
  res.send("TLD Atlas backend is running!");
});

app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

require("dotenv").config();
const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth");
const auth = require("./middleware/auth");
const checkRole = require("./middleware/role");
const gradeRoutes = require("./routes/grades");



const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/grades", gradeRoutes);

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

app.get("/", (req, res) => {
  res.send("API is running ");
});
app.get("/api/test", auth, checkRole("lecturer"), (req, res) => {
  res.send("Lecturer access granted ✅");
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
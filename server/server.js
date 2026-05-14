const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const dotenv = require("dotenv");

dotenv.config();

const taskRoutes = require("./routes/taskRoutes");
const authRoutes = require("./routes/auth");

const app = express();

app.use(cors());
app.use(express.json());

// Root route so opening the Railway domain shows a response
app.get("/", (req, res) => {
  res.send("Task Manager API is running");
});

app.use("/api/tasks", taskRoutes);
app.use("/api/auth", authRoutes);

// Database connection using environment variables
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) {
    console.log("MySQL connection error:", err.message);
  } else {
    console.log("MySQL Connected");
  }
});

// Use Railway's assigned port
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

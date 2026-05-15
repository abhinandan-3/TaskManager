const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");

const taskRoutes = require("./routes/taskRoutes");
const authRoutes = require("./routes/auth");

require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {

  res.json({
    message:
      "TaskManager API is running",
  });
});

app.use("/api/tasks", taskRoutes);
app.use("/api/auth", authRoutes);

app.listen(process.env.PORT || 5000, () => {

  console.log(
    "Server running"
  );
});
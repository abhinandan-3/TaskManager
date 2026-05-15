const express = require("express");

const cors = require("cors");

require("dotenv").config();

const app = express();

const authRoutes = require("./routes/auth");

const taskRoutes = require("./routes/taskRoutes");

app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {

  res.json({
    message: "TaskManager API is running",
  });
});

app.use("/api/auth", authRoutes);

app.use("/api/tasks", taskRoutes);

app.listen(process.env.PORT || 5000, () => {

  console.log("Server running");
});
const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");

const taskRoutes = require("./routes/taskRoutes");
const authRoutes = require("./routes/auth");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/tasks", taskRoutes);
app.use("/api/auth", authRoutes);

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Abhi@7205",
  database: "taskmanager",
});

db.connect((err) => {

  if (err) {

    console.log(err);

  } else {

    console.log("MySQL Connected");
  }
});

app.listen(5000, () => {

  console.log(
    "Server running on port 5000"
  );
});
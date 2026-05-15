const express = require("express");

const router = express.Router();

const mysql = require("mysql2");

require("dotenv").config();

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  ssl: {
    rejectUnauthorized: false,
  },
});

router.get("/", (req, res) => {

  db.query(
    "SELECT * FROM tasks",
    (err, result) => {

      if (err) {
        console.log(err);

        return res.status(500).json({
          message: "Server Error",
        });
      }

      res.json(result);
    }
  );
});

router.post("/", (req, res) => {

  const {
    title,
    assigned_to,
    project_id,
    due_date,
  } = req.body;

  db.query(
    "INSERT INTO tasks (title, assigned_to, project_id, due_date) VALUES (?, ?, ?, ?)",
    [
      title,
      assigned_to,
      project_id,
      due_date,
    ],
    (err, result) => {

      if (err) {
        console.log(err);

        return res.status(500).json({
          message: "Server Error",
        });
      }

      res.json({
        message: "Task Added",
      });
    }
  );
});

router.put("/:id", (req, res) => {

  const { status } = req.body;

  db.query(
    "UPDATE tasks SET status=? WHERE id=?",
    [status, req.params.id],
    (err, result) => {

      if (err) {
        console.log(err);

        return res.status(500).json({
          message: "Server Error",
        });
      }

      res.json({
        message: "Task Updated",
      });
    }
  );
});

router.delete("/:id", (req, res) => {

  db.query(
    "DELETE FROM tasks WHERE id=?",
    [req.params.id],
    (err, result) => {

      if (err) {
        console.log(err);

        return res.status(500).json({
          message: "Server Error",
        });
      }

      res.json({
        message: "Task Deleted",
      });
    }
  );
});

module.exports = router;
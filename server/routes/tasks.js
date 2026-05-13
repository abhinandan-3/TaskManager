const express = require("express");
const db = require("../db");

const router = express.Router();

router.get("/", (req, res) => {
  db.query(
    "SELECT * FROM tasks",
    (err, results) => {
      if (err) {
        res.status(500).json(err);
      } else {
        res.json(results);
      }
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

  if (
    !title ||
    !assigned_to ||
    !project_id
  ) {
    return res.status(400).json({
      message: "All fields required",
    });
  }

  const sql =
    "INSERT INTO tasks (title,assigned_to,project_id,due_date) VALUES (?,?,?,?)";

  db.query(
    sql,
    [
      title,
      assigned_to,
      project_id,
      due_date,
    ],
    (err, result) => {
      if (err) {
        res.status(500).json(err);
      } else {
        res.json({
          message: "Task created",
        });
      }
    }
  );
});

router.put("/:id", (req, res) => {
  const { id } = req.params;

  const { status } = req.body;

  const sql =
    "UPDATE tasks SET status=? WHERE id=?";

  db.query(
    sql,
    [status, id],
    (err, result) => {
      if (err) {
        res.status(500).json(err);
      } else {
        res.json({
          message: "Task updated",
        });
      }
    }
  );
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;

  db.query(
    "DELETE FROM tasks WHERE id=?",
    [id],
    (err, result) => {
      if (err) {
        res.status(500).json(err);
      } else {
        res.json({
          message: "Task deleted",
        });
      }
    }
  );
});

module.exports = router;
const express = require("express");
const db = require("../db");

const router = express.Router();

router.get("/", (req, res) => {
  db.query(
    "SELECT * FROM projects",
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
    description,
    created_by,
  } = req.body;

  if (!title || !description) {
    return res.status(400).json({
      message: "All fields required",
    });
  }

  const sql =
    "INSERT INTO projects (title,description,created_by) VALUES (?,?,?)";

  db.query(
    sql,
    [
      title,
      description,
      created_by,
    ],
    (err, result) => {
      if (err) {
        res.status(500).json(err);
      } else {
        res.json({
          message: "Project created",
        });
      }
    }
  );
});

module.exports = router;
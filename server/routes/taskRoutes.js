const express = require("express");

const router = express.Router();

let tasks = [];

router.get("/", (req, res) => {
  res.json(tasks);
});

router.post("/", (req, res) => {
  const task = {
    id: Date.now(),
    title: req.body.title,
    status: "Pending"
  };

  tasks.push(task);

  res.json(task);
});

module.exports = router;
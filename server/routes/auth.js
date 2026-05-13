const express = require("express");

const router = express.Router();

const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Abhi@7205",
  database: "taskmanager",
});

router.post("/register", async (req, res) => {

  const {
    name,
    email,
    password,
    role,
  } = req.body;

  try {

    const hashedPassword =
      await bcrypt.hash(password, 10);

    const sql =
      "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)";

    db.query(
      sql,
      [
        name,
        email,
        hashedPassword,
        role,
      ],
      (err, result) => {

        if (err) {

          console.log(err);

          return res.status(500).json({
            message:
              "Registration Failed",
          });
        }

        const token = jwt.sign(
          {
            email,
            role,
          },
          "secretkey"
        );

        res.json({
          token,
          role,
        });
      }
    );

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
});

router.post("/login", (req, res) => {

  const { email, password } =
    req.body;

  const sql =
    "SELECT * FROM users WHERE email = ?";

  db.query(
    sql,
    [email],
    async (err, result) => {

      if (err) {

        console.log(err);

        return res.status(500).json({
          message: "Server Error",
        });
      }

      if (result.length === 0) {

        return res.status(400).json({
          message:
            "User not found",
        });
      }

      const user = result[0];

      const isMatch =
        await bcrypt.compare(
          password,
          user.password
        );

      if (!isMatch) {

        return res.status(400).json({
          message:
            "Invalid Password",
        });
      }

      const token = jwt.sign(
        {
          email: user.email,
          role: user.role,
        },
        "secretkey"
      );

      res.json({
        token,
        role: user.role,
      });
    }
  );
});

module.exports = router;
const express = require("express");
const jwt = require("jsonwebtoken");
const app = express();

app.use(express.json());

const USERS = [];

app.post("/register", (req, res) => {
  USERS.push(req.body);
  res.send("User registered");
});

app.post("/login", (req, res) => {
  const { email } = req.body;

  const token = jwt.sign({ email }, "SECRET", { expiresIn: "1h" });

  res.json({ token });
});

app.get("/me", (req, res) => {
  res.send("User info");
});

app.listen(3001, () => console.log("Auth running on 3001"));
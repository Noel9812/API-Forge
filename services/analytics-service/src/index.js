const express = require("express");
const app = express();

app.use(express.json());

let logs = [];

app.post("/logs", (req, res) => {
  logs.push({ ...req.body, time: new Date() });
  res.send("Logged");
});

app.get("/logs", (req, res) => {
  res.json(logs);
});

app.listen(3004, () => console.log("Analytics running"));
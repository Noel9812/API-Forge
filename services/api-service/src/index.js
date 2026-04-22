const express = require("express");
const app = express();

app.use(express.json());

let APIs = [];

app.post("/apis", (req, res) => {
  const api = { id: APIs.length + 1, ...req.body };
  APIs.push(api);
  res.json(api);
});

app.get("/apis", (req, res) => {
  res.json(APIs);
});

app.get("/apis/:id", (req, res) => {
  const api = APIs.find(a => a.id == req.params.id);
  res.json(api);
});

app.listen(3002, () => console.log("API Service running"));
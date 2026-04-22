const express = require("express");
const jwt = require("jsonwebtoken");
const proxy = require("express-http-proxy");

const app = express();

// JWT middleware
app.use((req, res, next) => {
  if (req.path.includes("/auth")) return next();

  const token = req.headers.authorization;

  try {
    jwt.verify(token, "SECRET");
    next();
  } catch {
    res.status(401).send("Unauthorized");
  }
});

// Rate limiting (simple)
let requests = {};

app.use((req, res, next) => {
  const ip = req.ip;
  requests[ip] = (requests[ip] || 0) + 1;

  if (requests[ip] > 50) {
    return res.status(429).send("Too many requests");
  }

  setTimeout(() => requests[ip]--, 60000);

  next();
});

// Routing
app.use("/auth", proxy("http://auth-service:3001"));
app.use("/apis", proxy("http://api-service:3002"));
app.use("/execute", proxy("http://execution-service:3003"));
app.use("/logs", proxy("http://analytics-service:3004"));

app.listen(3000, () => console.log("Gateway running"));
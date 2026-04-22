const express = require("express");
const jwt = require("jsonwebtoken");
const proxy = require("express-http-proxy");
const cors = require("cors");

const app = express();

/* -------------------- CORS -------------------- */
app.use(cors({
  origin: "*", // for demo (restrict in prod)
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.options("*", cors());

app.use(express.json());

/* -------------------- REQUEST LOGGING -------------------- */
app.use((req, res, next) => {
  const start = Date.now();

  res.on("finish", () => {
    const duration = Date.now() - start;

    console.log(
      `[${new Date().toISOString()}] ${req.method} ${req.originalUrl} → ${res.statusCode} (${duration}ms)`
    );
  });

  next();
});

/* -------------------- JWT AUTH -------------------- */
app.use((req, res, next) => {
  if (req.path.startsWith("/auth")) return next();

  const authHeader = req.headers.authorization;

  if (!authHeader) {
    console.log(`[AUTH FAIL] Missing token → ${req.method} ${req.originalUrl}`);
    return res.status(401).send("Unauthorized");
  }

  const token = authHeader.split(" ")[1]; // Bearer <token>

  try {
    jwt.verify(token, "SECRET");
    next();
  } catch {
    console.log(`[AUTH FAIL] Invalid token → ${req.method} ${req.originalUrl}`);
    res.status(401).send("Unauthorized");
  }
});

/* -------------------- RATE LIMITING -------------------- */
let requests = {};

app.use((req, res, next) => {
  const ip = req.ip;

  requests[ip] = (requests[ip] || 0) + 1;

  if (requests[ip] > 50) {
    console.log(`[RATE LIMIT] ${ip} blocked`);
    return res.status(429).send("Too many requests");
  }

  setTimeout(() => requests[ip]--, 60000);

  next();
});

/* -------------------- PROXY HELPER -------------------- */
function createProxy(basePath, target) {
  return proxy(target, {
    proxyReqPathResolver: (req) => {
      let newPath = req.url;

      if (newPath.startsWith(basePath)) {
        newPath = newPath.slice(basePath.length);
      }

      console.log(
        `[PROXY] ${req.method} ${req.originalUrl} → ${target}${newPath || "/"}`
      );

      return newPath || "/";
    },
    proxyErrorHandler: (err, res, next) => {
      console.error(`[PROXY ERROR] ${err.message}`);
      res.status(500).send("Proxy error");
    }
  });
}

/* -------------------- ROUTES -------------------- */
app.use("/auth", createProxy("/auth", "http://auth-service:3001"));
app.use("/apis", createProxy("/apis", "http://api-service:3002"));
app.use("/execute", createProxy("/execute", "http://execution-service:3003"));
app.use("/logs", createProxy("/logs", "http://analytics-service:3004"));

/* -------------------- START SERVER -------------------- */
app.listen(3000, () => {
  console.log("🚀 Gateway running on port 3000");
});
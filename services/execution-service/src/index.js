const express = require("express");
const axios = require("axios");
const app = express();

app.use(express.json());

app.post("/execute", async (req, res) => {
  const { url, method } = req.body;

  const start = Date.now();

  try {
    const response = await axios({ url, method });

    const latency = Date.now() - start;

    // send log
    await axios.post("http://analytics-service:3004/logs", {
      status: response.status,
      latency,
    });

    res.json({
      data: response.data,
      latency,
    });

  } catch (err) {
    res.status(500).send("Execution failed");
  }
});

app.listen(3003, () => console.log("Execution running"));
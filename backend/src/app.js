const express = require("express");
const cors = require("cors");

const healthRoutes = require("./routes/health.routes");

function createApp() {
  const app = express();

  app.use(
    cors({
      origin: process.env.CORS_ORIGIN?.split(",") || "*",
      credentials: true,
    }),
  );
  app.use(express.json());

  app.use("/health", healthRoutes);

  // 404
  app.use((req, res) => res.status(404).json({ message: "Not Found" }));

  return app;
}

module.exports = { createApp };

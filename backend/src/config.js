require("dotenv").config();

const config = {
  // Server
  port: Number(process.env.PORT || 3000),
  corsOrigin: process.env.CORS_ORIGIN?.split(",") || "*",

  // Database
  db: {
    host: process.env.DB_HOST || "localhost",
    port: Number(process.env.DB_PORT || 5432),
    user: process.env.DB_USER || "worldcup",
    password: process.env.DB_PASSWORD || "worldcup",
    name: process.env.DB_NAME || "worldcup",
  },
};

module.exports = { config };

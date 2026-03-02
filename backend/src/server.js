require("dotenv").config();
const http = require("http");

const { createApp } = require("./app");
const { createSocketServer } = require("./websocket/socket");

const PORT = Number(process.env.PORT || 3000);

async function bootstrap() {
  const app = createApp();

  const httpServer = http.createServer(app);
  const io = createSocketServer(httpServer);

  app.set("io", io);

  httpServer.listen(PORT, () => {
    console.log(`🚀 API running on http://localhost:${PORT}`);
  });
}

bootstrap().catch((err) => {
  console.error("❌ Fatal bootstrap error:", err);
  process.exit(1);
});

const http = require("http");

const { config } = require("./config");
const { createApp } = require("./app");
const { createSocketServer } = require("./websocket/socket");

async function bootstrap() {
  const app = createApp();

  const httpServer = http.createServer(app);
  const io = createSocketServer(httpServer);

  app.set("io", io);

  httpServer.listen(config.port, () => {
    console.log(`🚀 API running on http://localhost:${config.port}`);
  });
}

bootstrap().catch((err) => {
  console.error("❌ Fatal bootstrap error:", err);
  process.exit(1);
});

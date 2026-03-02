import http from "http";
import { config } from "./config";
import { createApp } from "./app";
import { createSocketServer } from "./websocket/socket";

async function bootstrap(): Promise<void> {
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

import "reflect-metadata";
import http from "http";
import { config } from "./config";
import { createApp } from "./app";
import { createSocketServer } from "./websocket/socket";
import { initializeDatabase } from "./database";

async function bootstrap(): Promise<void> {
  if (!config.apiKey) {
    console.error("❌ ERREUR: API_KEY n'est pas définie dans les variables d'environnement");
    console.error("💡 Générez une clé avec: openssl rand -hex 32");
    if (process.env.NODE_ENV === "production") {
      process.exit(1);
    }
    console.warn("⚠️  Mode développement: Continuez sans API_KEY (UNSAFE)");
  } else {
    console.log("✅ API Key configured");
  }

  // Initialize database connection
  await initializeDatabase();
  console.log("✅ Database connected");

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

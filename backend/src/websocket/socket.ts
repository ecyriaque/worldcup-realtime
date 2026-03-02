import { Server as SocketIOServer } from "socket.io";
import { Server as HTTPServer } from "http";

export function createSocketServer(httpServer: HTTPServer): SocketIOServer {
  const io = new SocketIOServer(httpServer, {
    cors: {
      origin: process.env.CORS_ORIGIN?.split(",") || "*",
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log("🟢 Socket connected:", socket.id);

    socket.on("disconnect", () => {
      console.log("🔴 Socket disconnected:", socket.id);
    });

    // Exemple: ping/pong
    socket.on("ping", () => socket.emit("pong"));
  });

  return io;
}

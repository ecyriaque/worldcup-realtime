const { Server } = require("socket.io");

function createSocketServer(httpServer) {
  const io = new Server(httpServer, {
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

module.exports = { createSocketServer };

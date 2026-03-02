import { useEffect } from "react";
import { socket } from "../services/socket";
import { api } from "../api/api";

const Home = () => {
  useEffect(() => {
    // REST test
    api.get("/health").then((res) => {
      console.log("API:", res.data);
    });

    // WebSocket test
    socket.on("connect", () => {
      console.log("Socket connected:", socket.id);
      socket.emit("ping");
    });

    socket.on("pong", () => {
      console.log("PONG reçu du serveur");
    });

    return () => {
      socket.off("connect");
      socket.off("pong");
    };
  }, []);

  return <h1>World Cup Realtime</h1>;
};

export default Home;

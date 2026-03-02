import { Server as SocketIOServer } from "socket.io";
import { Server as HTTPServer } from "http";
import { MatchStatus, MatchEventType } from "../types/enums";

// ── Payload émis vers les clients lors d'une mise à jour ──────────────────────
export interface MatchUpdatePayload {
  matchId: number;
  homeScore: number;
  awayScore: number;
  status: MatchStatus;
  currentMinute?: number;
}

export interface MatchEventPayload {
  eventId: number;
  matchId: number;
  teamId: number;
  playerId?: number;
  playerName?: string;
  eventType: MatchEventType;
  minute: number;
  extraInfo?: string;
}

// ── Nom des rooms / events ─────────────────────────────────────────────────────
export const matchRoom = (matchId: number): string => `match_${matchId}`;
export const EVENTS = {
  MATCH_UPDATE: "match:update", // mise à jour d'un match précis (room)
  MATCHES_LIVE_UPDATE: "matches:liveUpdate", // broadcast global (liste des matchs)
  MATCH_EVENT: "match:event", // nouvel événement dans un match (but, carton, etc.)
} as const;

// ── Création du serveur Socket.IO ─────────────────────────────────────────────
export function createSocketServer(httpServer: HTTPServer): SocketIOServer {
  const io = new SocketIOServer(httpServer, {
    cors: {
      origin: process.env.CORS_ORIGIN?.split(",") || "*",
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log("🟢 Socket connected:", socket.id);

    // Rejoindre la room d'un match spécifique (page détail)
    socket.on("match:join", (matchId: number) => {
      const room = matchRoom(matchId);
      void socket.join(room);
      console.log(`📥 ${socket.id} joined ${room}`);
    });

    // Quitter la room d'un match
    socket.on("match:leave", (matchId: number) => {
      const room = matchRoom(matchId);
      void socket.leave(room);
      console.log(`📤 ${socket.id} left ${room}`);
    });

    socket.on("disconnect", () => {
      console.log("🔴 Socket disconnected:", socket.id);
    });

    socket.on("ping", () => socket.emit("pong"));
  });

  return io;
}

// ── Helper : émettre une mise à jour de match ─────────────────────────────────
export function emitMatchUpdate(
  io: SocketIOServer,
  payload: MatchUpdatePayload,
): void {
  // Aux clients qui regardent la page détail du match
  io.to(matchRoom(payload.matchId)).emit(EVENTS.MATCH_UPDATE, payload);
  // Broadcast global pour rafraîchir la liste des matchs
  io.emit(EVENTS.MATCHES_LIVE_UPDATE, payload);
}

// ── Helper : émettre un événement de match (but, carton, etc.) ────────────────
export function emitMatchEventUpdate(
  io: SocketIOServer,
  event: MatchEventPayload | { matchId: number; [key: string]: unknown },
): void {
  const matchId = event.matchId;
  // Aux clients qui regardent la page détail du match
  io.to(matchRoom(matchId)).emit(EVENTS.MATCH_EVENT, event);
  // Broadcast global pour notifier les autres pages
  io.emit(EVENTS.MATCH_EVENT, event);
}

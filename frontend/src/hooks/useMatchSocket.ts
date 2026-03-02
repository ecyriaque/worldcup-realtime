import { useEffect, useReducer } from "react";
import { socket } from "../services/socket";
import type { MatchStatus } from "../types/match";

// ── Payload reçu du serveur ───────────────────────────────────────────────────
export interface MatchUpdatePayload {
  matchId: number;
  homeScore: number;
  awayScore: number;
  status: MatchStatus;
}

// ── State / Reducer ───────────────────────────────────────────────────────────
type State = MatchUpdatePayload | null;
type Action = { type: "UPDATE"; payload: MatchUpdatePayload };

function reducer(_state: State, action: Action): State {
  return action.payload;
}

/**
 * Hook qui rejoint la room WebSocket d'un match et écoute ses mises à jour.
 * Retourne le dernier payload reçu (null si aucun événement encore).
 */
export function useMatchSocket(matchId: number): MatchUpdatePayload | null {
  const [update, dispatch] = useReducer(reducer, null);

  useEffect(() => {
    // Rejoindre la room du match côté serveur
    socket.emit("match:join", matchId);

    const handleUpdate = (payload: MatchUpdatePayload) => {
      if (payload.matchId === matchId) {
        dispatch({ type: "UPDATE", payload });
      }
    };

    socket.on("match:update", handleUpdate);

    return () => {
      socket.emit("match:leave", matchId);
      socket.off("match:update", handleUpdate);
    };
  }, [matchId]);

  return update;
}

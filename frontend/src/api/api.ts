import axios from "axios";
import type { Match, PhaseType, MatchEvent } from "../types/match";
import { mockMatches } from "../data/mockMatches";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export const api = axios.create({
  baseURL: API_URL,
});

// ── Matches API ──────────────────────────────────────────────────────────────

/**
 * Récupère tous les matchs.
 * Fallback sur les données mock si l'API n'est pas disponible.
 */
export async function fetchMatches(): Promise<Match[]> {
  try {
    const res = await api.get<Match[]>("/api/matches");
    return res.data;
  } catch {
    return mockMatches;
  }
}

/**
 * Récupère les matchs filtrés par phase.
 */
export async function fetchMatchesByPhase(phase: PhaseType): Promise<Match[]> {
  try {
    const res = await api.get<Match[]>(`/api/matches?phase=${phase}`);
    return res.data;
  } catch {
    return mockMatches.filter((m) => m.phase.type === phase);
  }
}

/**
 * Récupère un match par son id.
 */
export async function fetchMatchById(id: number): Promise<Match | undefined> {
  try {
    const res = await api.get<Match>(`/api/matches/${id}`);
    return res.data;
  } catch {
    return mockMatches.find((m) => m.matchId === id);
  }
}

// ── Match Events API ─────────────────────────────────────────────────────────

/**
 * Récupère tous les événements d'un match.
 */
export async function fetchMatchEvents(matchId: number): Promise<MatchEvent[]> {
  try {
    const res = await api.get<MatchEvent[]>(
      `/api/match-events/match/${matchId}`,
    );
    return res.data;
  } catch {
    return [];
  }
}

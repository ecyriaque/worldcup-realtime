import axios from "axios";
import type {
  Match,
  PhaseType,
  MatchEvent,
  Team,
  Group,
  GroupStanding,
} from "../types/match";
import type { Player } from "../types/player";
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

// ── Teams API ────────────────────────────────────────────────────────────────

/**
 * Récupère toutes les équipes.
 */
export async function fetchTeams(): Promise<Team[]> {
  try {
    const res = await api.get<Team[]>("/api/teams");
    return res.data;
  } catch (error) {
    console.error("Error fetching teams:", error);
    return [];
  }
}

/**
 * Récupère une équipe par son id.
 */
export async function fetchTeamById(id: number): Promise<Team | undefined> {
  try {
    const res = await api.get<Team>(`/api/teams/${id}`);
    return res.data;
  } catch (error) {
    console.error("Error fetching team:", error);
    return undefined;
  }
}

// ── Players API ──────────────────────────────────────────────────────────────

/**
 * Récupère tous les joueurs d'une équipe.
 */
export async function fetchPlayersByTeam(teamId: number): Promise<Player[]> {
  try {
    const res = await api.get<Player[]>(`/api/players/team/${teamId}`);
    return res.data;
  } catch (error) {
    console.error("Error fetching players:", error);
    return [];
  }
}

/**
 * Récupère tous les joueurs.
 */
export async function fetchAllPlayers(): Promise<Player[]> {
  try {
    const res = await api.get<Player[]>("/api/players");
    return res.data;
  } catch (error) {
    console.error("Error fetching players:", error);
    return [];
  }
}

// ── Groups API ───────────────────────────────────────────────────────────────

/**
 * Récupère tous les groupes.
 */
export async function fetchGroups(): Promise<Group[]> {
  try {
    const res = await api.get<Group[]>("/api/groups");
    return res.data;
  } catch (error) {
    console.error("Error fetching groups:", error);
    return [];
  }
}

/**
 * Récupère un groupe par son id.
 */
export async function fetchGroupById(id: number): Promise<Group | undefined> {
  try {
    const res = await api.get<Group>(`/api/groups/${id}`);
    return res.data;
  } catch (error) {
    console.error("Error fetching group:", error);
    return undefined;
  }
}

// ── Standings API ────────────────────────────────────────────────────────────

/**
 * Récupère les classements d'un groupe.
 */
export async function fetchStandingsByGroup(
  groupId: number,
): Promise<GroupStanding[]> {
  try {
    const res = await api.get<GroupStanding[]>(
      `/api/standings/group/${groupId}`,
    );
    return res.data;
  } catch (error) {
    console.error("Error fetching standings:", error);
    return [];
  }
}

/**
 * Récupère les statistiques d'une équipe.
 */
export async function fetchStandingsByTeam(
  teamId: number,
): Promise<GroupStanding[]> {
  try {
    const res = await api.get<GroupStanding[]>(
      `/api/standings/team/${teamId}`,
    );
    return res.data;
  } catch (error) {
    console.error("Error fetching team standings:", error);
    return [];
  }
}

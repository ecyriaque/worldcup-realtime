export type PhaseType =
  | "GROUP_STAGE"
  | "ROUND_OF_32"
  | "ROUND_OF_16"
  | "QUARTER_FINAL"
  | "SEMI_FINAL"
  | "THIRD_PLACE"
  | "FINAL";

export type MatchStatus = "SCHEDULED" | "LIVE" | "FINISHED";

export type MatchEventType =
  | "GOAL"
  | "PENALTY_GOAL"
  | "OWN_GOAL"
  | "YELLOW_CARD"
  | "RED_CARD"
  | "SUBSTITUTION";

export interface Team {
  teamId: number;
  name: string;
  code: string;
  flagUrl: string;
}

export interface Group {
  groupId: number;
  name: string;
  phaseId: number;
}

export interface GroupStanding {
  standingId: number;
  groupId: number;
  teamId: number;
  played: number;
  wins: number;
  draw: number;
  losses: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
  points: number;
  team?: Team;
  updatedAt?: string;
}

export interface Phase {
  phaseId: number;
  name: string;
  type: PhaseType;
  displayOrder: number;
  competitionId?: number;
}

export interface Match {
  matchId: number;
  matchDatetime: string;
  stadium: string;
  status: MatchStatus;
  homeScore: number;
  awayScore: number;
  currentMinute?: number;
  phase: Phase;
  group?: Group;
  homeTeam: Team;
  awayTeam: Team;
  updatedAt?: string;
}

export interface MatchEvent {
  eventId: number;
  matchId: number;
  teamId: number;
  playerName: string;
  eventType: MatchEventType;
  minute: number;
  extraInfo?: string;
  createdAt?: string;
}

export const PHASE_LABELS: Record<PhaseType, string> = {
  GROUP_STAGE: "Phase de groupes",
  ROUND_OF_32: "Seizièmes de finale",
  ROUND_OF_16: "Huitièmes de finale",
  QUARTER_FINAL: "Quarts de finale",
  SEMI_FINAL: "Demi-finales",
  THIRD_PLACE: "Petite finale",
  FINAL: "Finale",
};

export const PHASE_ORDER: PhaseType[] = [
  "GROUP_STAGE",
  "ROUND_OF_32",
  "ROUND_OF_16",
  "QUARTER_FINAL",
  "SEMI_FINAL",
  "THIRD_PLACE",
  "FINAL",
];

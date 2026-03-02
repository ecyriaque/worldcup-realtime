export type PhaseType =
  | "GROUP_STAGE"
  | "ROUND_OF_32"
  | "ROUND_OF_16"
  | "QUARTER_FINAL"
  | "SEMI_FINAL"
  | "THIRD_PLACE"
  | "FINAL";

export type MatchStatus = "SCHEDULED" | "LIVE" | "FINISHED";

export interface Team {
  team_id: number;
  name: string;
  code: string;
  flag_url: string;
}

export interface Phase {
  phase_id: number;
  name: string;
  type: PhaseType;
  display_order: number;
}

export interface Match {
  match_id: number;
  match_datetime: string;
  stadium: string;
  status: MatchStatus;
  home_score: number;
  away_score: number;
  phase: Phase;
  group_name?: string;
  home_team: Team;
  away_team: Team;
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

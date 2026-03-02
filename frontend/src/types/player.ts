export type PlayerPosition =
  | "GOALKEEPER"
  | "DEFENDER"
  | "MIDFIELDER"
  | "FORWARD";

export interface Player {
  playerId: number;
  teamId: number;
  firstName: string;
  lastName: string;
  jerseyNumber: number;
  position: PlayerPosition;
  dateOfBirth?: string;
  nationality?: string;
  createdAt: string;
}

export const POSITION_LABELS: Record<PlayerPosition, string> = {
  GOALKEEPER: "Gardien",
  DEFENDER: "Défenseur",
  MIDFIELDER: "Milieu",
  FORWARD: "Attaquant",
};

export const POSITION_ICONS: Record<PlayerPosition, string> = {
  GOALKEEPER: "🥅",
  DEFENDER: "🛡️",
  MIDFIELDER: "⚙️",
  FORWARD: "⚔️",
};

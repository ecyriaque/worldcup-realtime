import { useNavigate } from "react-router-dom";
import type { Match } from "../types/match";
import { PHASE_LABELS } from "../types/match";
import "./MatchCard.css";

interface MatchCardProps {
  match: Match;
}

const STATUS_CONFIG = {
  SCHEDULED: { label: "À venir", cls: "badge-scheduled" },
  LIVE: { label: "En direct", cls: "badge-live" },
  FINISHED: { label: "Terminé", cls: "badge-finished" },
};

const MatchCard = ({ match }: MatchCardProps) => {
  const navigate = useNavigate();
  const statusCfg = STATUS_CONFIG[match.status];
  const date = new Date(match.matchDatetime);

  const formattedDate = date.toLocaleDateString("fr-FR", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });
  const formattedTime = date.toLocaleTimeString("fr-FR", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <article
      className={`match-card ${match.status === "LIVE" ? "match-card--live" : ""}`}
      onClick={() => navigate(`/matches/${match.matchId}`)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) =>
        e.key === "Enter" && navigate(`/matches/${match.matchId}`)
      }
      aria-label={`Match ${match.homeTeam.name} vs ${match.awayTeam.name}`}
    >
      {/* Header */}
      <div className="match-card__header">
        <span className="match-card__phase">
          {match.group
            ? `${PHASE_LABELS[match.phase.type]} · ${match.group.name}`
            : PHASE_LABELS[match.phase.type]}
        </span>
        <span className={`badge ${statusCfg.cls}`}>
          {match.status === "LIVE" && <span className="pulse-dot" />}
          {statusCfg.label}
        </span>
      </div>

      {/* Score */}
      <div className="match-card__body">
        {/* Home team */}
        <div className="match-card__team">
          <img
            src={match.homeTeam.flagUrl}
            alt={match.homeTeam.name}
            className="match-card__flag"
          />
          <span className="match-card__team-name">{match.homeTeam.name}</span>
          <span className="match-card__team-code">{match.homeTeam.code}</span>
        </div>

        {/* Score / VS */}
        <div className="match-card__score">
          {match.status === "SCHEDULED" ? (
            <span className="match-card__vs">VS</span>
          ) : (
            <>
              <span className="match-card__score-num">{match.homeScore}</span>
              <span className="match-card__score-sep">-</span>
              <span className="match-card__score-num">{match.awayScore}</span>
            </>
          )}
        </div>

        {/* Away team */}
        <div className="match-card__team match-card__team--right">
          <img
            src={match.awayTeam.flagUrl}
            alt={match.awayTeam.name}
            className="match-card__flag"
          />
          <span className="match-card__team-name">{match.awayTeam.name}</span>
          <span className="match-card__team-code">{match.awayTeam.code}</span>
        </div>
      </div>

      {/* Footer */}
      <div className="match-card__footer">
        <span>
          📅 {formattedDate} · {formattedTime}
        </span>
        {match.stadium && <span>🏟️ {match.stadium}</span>}
      </div>
    </article>
  );
};

export default MatchCard;

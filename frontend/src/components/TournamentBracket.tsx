import { useNavigate } from "react-router-dom";
import type { Match } from "../types/match";
import "./TournamentBracket.css";

interface TournamentBracketProps {
  matches: Match[];
}

const TournamentBracket = ({ matches }: TournamentBracketProps) => {
  const navigate = useNavigate();

  // Organiser les matchs par phase
  const roundOf16 = matches.filter((m) => m.phase.type === "ROUND_OF_16");
  const quarterFinals = matches.filter((m) => m.phase.type === "QUARTER_FINAL");
  const semiFinals = matches.filter((m) => m.phase.type === "SEMI_FINAL");
  const thirdPlace = matches.find((m) => m.phase.type === "THIRD_PLACE");
  const final = matches.find((m) => m.phase.type === "FINAL");

  const handleMatchClick = (matchId?: number) => {
    if (matchId) {
      navigate(`/matches/${matchId}`);
    }
  };

  const renderMatch = (match: Match | null | undefined, isEmpty = false) => {
    if (isEmpty || !match) {
      return (
        <div className="bracket-match bracket-match--empty">
          <div className="bracket-match__content">
            <div className="bracket-match__team">
              <span className="bracket-match__team-name">À déterminer</span>
            </div>
            <div className="bracket-match__team">
              <span className="bracket-match__team-name">À déterminer</span>
            </div>
          </div>
        </div>
      );
    }

    const homeWinner = match.status === "FINISHED" && match.homeScore > match.awayScore;
    const awayWinner = match.status === "FINISHED" && match.awayScore > match.homeScore;

    return (
      <div
        className={`bracket-match ${match.status === "LIVE" ? "bracket-match--live" : ""}`}
        onClick={() => handleMatchClick(match.matchId)}
        role="button"
        tabIndex={0}
      >
        <div className="bracket-match__content">
          <div className={`bracket-match__team ${homeWinner ? "bracket-match__team--winner" : ""}`}>
            <img
              src={match.homeTeam.flagUrl}
              alt={match.homeTeam.name}
              className="bracket-match__flag"
            />
            <span className="bracket-match__team-name">{match.homeTeam.code}</span>
            {match.status !== "SCHEDULED" && (
              <span className="bracket-match__score">{match.homeScore}</span>
            )}
          </div>
          <div className={`bracket-match__team ${awayWinner ? "bracket-match__team--winner" : ""}`}>
            <img
              src={match.awayTeam.flagUrl}
              alt={match.awayTeam.name}
              className="bracket-match__flag"
            />
            <span className="bracket-match__team-name">{match.awayTeam.code}</span>
            {match.status !== "SCHEDULED" && (
              <span className="bracket-match__score">{match.awayScore}</span>
            )}
          </div>
        </div>
        {match.status === "LIVE" && (
          <div className="bracket-match__live-indicator">LIVE</div>
        )}
      </div>
    );
  };

  return (
    <div className="tournament-bracket">
      {/* Huitièmes de finale */}
      {roundOf16.length > 0 && (
        <div className="bracket-round">
          <h3 className="bracket-round__title">Huitièmes de finale</h3>
          <div className="bracket-round__matches">
            {roundOf16.map((match) => (
              <div key={match.matchId} className="bracket-match-wrapper">
                {renderMatch(match)}
              </div>
            ))}
            {/* Remplir avec des matchs vides si moins de 8 */}
            {Array.from({ length: Math.max(0, 8 - roundOf16.length) }).map((_, i) => (
              <div key={`empty-r16-${i}`} className="bracket-match-wrapper">
                {renderMatch(null, true)}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Quarts de finale */}
      {quarterFinals.length > 0 && (
        <div className="bracket-round">
          <h3 className="bracket-round__title">Quarts de finale</h3>
          <div className="bracket-round__matches bracket-round__matches--quarter">
            {quarterFinals.map((match) => (
              <div key={match.matchId} className="bracket-match-wrapper">
                {renderMatch(match)}
              </div>
            ))}
            {Array.from({ length: Math.max(0, 4 - quarterFinals.length) }).map((_, i) => (
              <div key={`empty-qf-${i}`} className="bracket-match-wrapper">
                {renderMatch(null, true)}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Demi-finales */}
      {semiFinals.length > 0 && (
        <div className="bracket-round">
          <h3 className="bracket-round__title">Demi-finales</h3>
          <div className="bracket-round__matches bracket-round__matches--semi">
            {semiFinals.map((match) => (
              <div key={match.matchId} className="bracket-match-wrapper">
                {renderMatch(match)}
              </div>
            ))}
            {Array.from({ length: Math.max(0, 2 - semiFinals.length) }).map((_, i) => (
              <div key={`empty-sf-${i}`} className="bracket-match-wrapper">
                {renderMatch(null, true)}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Finals */}
      {(final || thirdPlace) && (
        <div className="bracket-round bracket-round--finals">
          {thirdPlace && (
            <div className="bracket-finals-section">
              <h3 className="bracket-round__title bracket-round__title--small">
                Petite finale
              </h3>
              <div className="bracket-match-wrapper">
                {renderMatch(thirdPlace)}
              </div>
            </div>
          )}
          {final && (
            <div className="bracket-finals-section">
              <h3 className="bracket-round__title bracket-round__title--final">
                🏆 Finale
              </h3>
              <div className="bracket-match-wrapper bracket-match-wrapper--final">
                {renderMatch(final)}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TournamentBracket;

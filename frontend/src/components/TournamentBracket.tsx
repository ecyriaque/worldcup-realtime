import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import type { Match } from "../types/match";
import "./TournamentBracket.css";

interface TournamentBracketProps {
  matches: Match[];
}

interface Connector {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  xMid: number;
}

const TournamentBracket = ({ matches }: TournamentBracketProps) => {
  const navigate = useNavigate();
  const bracketRef = useRef<HTMLDivElement>(null);
  const [connectors, setConnectors] = useState<Connector[]>([]);
  const [svgSize, setSvgSize] = useState({ width: 0, height: 0 });

  const roundOf16 = matches.filter((m) => m.phase.type === "ROUND_OF_16");
  const quarterFinals = matches.filter((m) => m.phase.type === "QUARTER_FINAL");
  const semiFinals = matches.filter((m) => m.phase.type === "SEMI_FINAL");
  const thirdPlace = matches.find((m) => m.phase.type === "THIRD_PLACE");
  const final = matches.find((m) => m.phase.type === "FINAL");

  const handleMatchClick = (matchId?: number) => {
    if (matchId) navigate(`/matches/${matchId}`);
  };

  useEffect(() => {
    const compute = () => {
      const container = bracketRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      setSvgSize({ width: rect.width, height: rect.height });

      const byId: Record<string, DOMRect> = {};
      container
        .querySelectorAll<HTMLElement>("[data-match-id]")
        .forEach((el) => {
          byId[el.dataset.matchId!] = el.getBoundingClientRect();
        });

      const toLocal = (r: DOMRect) => ({
        right: r.right - rect.left + container.scrollLeft,
        left: r.left - rect.left + container.scrollLeft,
        midY: (r.top + r.bottom) / 2 - rect.top + container.scrollTop,
      });

      const lines: Connector[] = [];

      const connect = (srcId: number, dstId: number) => {
        const s = byId[String(srcId)];
        const d = byId[String(dstId)];
        if (!s || !d) return;
        const sl = toLocal(s);
        const dl = toLocal(d);
        lines.push({
          x1: sl.right,
          y1: sl.midY,
          x2: dl.left,
          y2: dl.midY,
          xMid: (sl.right + dl.left) / 2,
        });
      };

      // Huitièmes → Quarts
      for (let i = 0; i < quarterFinals.length; i++) {
        roundOf16
          .slice(i * 2, i * 2 + 2)
          .forEach((m) => connect(m.matchId, quarterFinals[i].matchId));
      }

      // Quarts → Demis
      for (let i = 0; i < semiFinals.length; i++) {
        quarterFinals
          .slice(i * 2, i * 2 + 2)
          .forEach((m) => connect(m.matchId, semiFinals[i].matchId));
      }

      // Demis → Finale
      if (final) semiFinals.forEach((m) => connect(m.matchId, final.matchId));

      // Demis → Petite finale
      if (thirdPlace)
        semiFinals.forEach((m) => connect(m.matchId, thirdPlace.matchId));

      setConnectors(lines);
    };

    compute();
    window.addEventListener("resize", compute);
    return () => window.removeEventListener("resize", compute);
  }, [matches]);

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

    const homeWinner =
      match.status === "FINISHED" && match.homeScore > match.awayScore;
    const awayWinner =
      match.status === "FINISHED" && match.awayScore > match.homeScore;

    return (
      <div
        data-match-id={match.matchId}
        className={`bracket-match ${match.status === "LIVE" ? "bracket-match--live" : ""}`}
        onClick={() => handleMatchClick(match.matchId)}
        role="button"
        tabIndex={0}
      >
        <div className="bracket-match__content">
          <div
            className={`bracket-match__team ${homeWinner ? "bracket-match__team--winner" : ""}`}
          >
            <img
              src={match.homeTeam.flagUrl}
              alt={match.homeTeam.name}
              className="bracket-match__flag"
            />
            <span className="bracket-match__team-name">
              {match.homeTeam.code}
            </span>
            {match.status !== "SCHEDULED" && (
              <span className="bracket-match__score">{match.homeScore}</span>
            )}
          </div>
          <div
            className={`bracket-match__team ${awayWinner ? "bracket-match__team--winner" : ""}`}
          >
            <img
              src={match.awayTeam.flagUrl}
              alt={match.awayTeam.name}
              className="bracket-match__flag"
            />
            <span className="bracket-match__team-name">
              {match.awayTeam.code}
            </span>
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
    <div className="tournament-bracket" ref={bracketRef}>
      {svgSize.width > 0 && (
        <svg
          className="bracket-svg-connectors"
          width={svgSize.width}
          height={svgSize.height}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            pointerEvents: "none",
            overflow: "visible",
            zIndex: 0,
          }}
        >
          {connectors.map((c, i) => (
            <path
              key={i}
              d={`M ${c.x1} ${c.y1} H ${c.xMid} V ${c.y2} H ${c.x2}`}
              fill="none"
              stroke="var(--color-border)"
              strokeWidth="2"
            />
          ))}
        </svg>
      )}

      {roundOf16.length > 0 && (
        <div className="bracket-round">
          <h3 className="bracket-round__title">Huitièmes de finale</h3>
          <div className="bracket-round__matches">
            {roundOf16.map((match) => (
              <div key={match.matchId} className="bracket-match-wrapper">
                {renderMatch(match)}
              </div>
            ))}
            {Array.from({ length: Math.max(0, 8 - roundOf16.length) }).map(
              (_, i) => (
                <div key={`empty-r16-${i}`} className="bracket-match-wrapper">
                  {renderMatch(null, true)}
                </div>
              ),
            )}
          </div>
        </div>
      )}

      {quarterFinals.length > 0 && (
        <div className="bracket-round">
          <h3 className="bracket-round__title">Quarts de finale</h3>
          <div className="bracket-round__matches">
            {quarterFinals.map((match) => (
              <div key={match.matchId} className="bracket-match-wrapper">
                {renderMatch(match)}
              </div>
            ))}
            {Array.from({ length: Math.max(0, 4 - quarterFinals.length) }).map(
              (_, i) => (
                <div key={`empty-qf-${i}`} className="bracket-match-wrapper">
                  {renderMatch(null, true)}
                </div>
              ),
            )}
          </div>
        </div>
      )}

      {semiFinals.length > 0 && (
        <div className="bracket-round">
          <h3 className="bracket-round__title">Demi-finales</h3>
          <div className="bracket-round__matches">
            {semiFinals.map((match) => (
              <div key={match.matchId} className="bracket-match-wrapper">
                {renderMatch(match)}
              </div>
            ))}
            {Array.from({ length: Math.max(0, 2 - semiFinals.length) }).map(
              (_, i) => (
                <div key={`empty-sf-${i}`} className="bracket-match-wrapper">
                  {renderMatch(null, true)}
                </div>
              ),
            )}
          </div>
        </div>
      )}

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

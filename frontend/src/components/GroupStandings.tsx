import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchStandingsByGroup } from "../api/api";
import type { GroupStanding } from "../types/match";
import "./GroupStandings.css";

interface GroupStandingsProps {
  groupId: number;
  groupName: string;
}

const GroupStandings = ({ groupId, groupName }: GroupStandingsProps) => {
  const navigate = useNavigate();
  const [standings, setStandings] = useState<GroupStanding[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStandings = async () => {
      try {
        setLoading(true);
        const data = await fetchStandingsByGroup(groupId);
        setStandings(data);
      } catch (err) {
        console.error("Error loading standings:", err);
      } finally {
        setLoading(false);
      }
    };

    loadStandings();
  }, [groupId]);

  if (loading) {
    return (
      <div className="group-standings">
        <div className="group-standings__header">
          <h2 className="group-standings__title">{groupName}</h2>
        </div>
        <div className="group-standings__loading">
          <div className="spinner" />
        </div>
      </div>
    );
  }

  if (standings.length === 0) {
    return (
      <div className="group-standings">
        <div className="group-standings__header">
          <h2 className="group-standings__title">{groupName}</h2>
        </div>
        <p className="group-standings__empty">Aucun classement disponible</p>
      </div>
    );
  }

  return (
    <div className="group-standings">
      <div className="group-standings__header">
        <h2 className="group-standings__title">{groupName}</h2>
      </div>
      
      <div className="standings-table-wrapper">
        <table className="standings-table">
          <thead>
            <tr>
              <th className="standings-table__rank">#</th>
              <th className="standings-table__team">Équipe</th>
              <th className="standings-table__stat" title="Matchs joués">MJ</th>
              <th className="standings-table__stat" title="Victoires">V</th>
              <th className="standings-table__stat" title="Nuls">N</th>
              <th className="standings-table__stat" title="Défaites">D</th>
              <th className="standings-table__stat" title="Buts pour">BP</th>
              <th className="standings-table__stat" title="Buts contre">BC</th>
              <th className="standings-table__stat" title="Différence de buts">+/-</th>
              <th className="standings-table__points">Pts</th>
            </tr>
          </thead>
          <tbody>
            {standings.map((standing, index) => (
              <tr
                key={standing.standingId}
                className={`standings-table__row ${index < 2 ? "standings-table__row--qualified" : ""}`}
                onClick={() => standing.team && navigate(`/teams/${standing.team.teamId}`)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) =>
                  e.key === "Enter" && standing.team && navigate(`/teams/${standing.team.teamId}`)
                }
              >
                <td className="standings-table__rank">
                  <span className={`rank-badge ${index < 2 ? "rank-badge--qualified" : ""}`}>
                    {index + 1}
                  </span>
                </td>
                <td className="standings-table__team">
                  <div className="team-info">
                    {standing.team?.flagUrl && (
                      <img
                        src={standing.team.flagUrl}
                        alt={standing.team.name}
                        className="team-info__flag"
                      />
                    )}
                    <span className="team-info__name">
                      {standing.team?.name || `Équipe ${standing.teamId}`}
                    </span>
                  </div>
                </td>
                <td className="standings-table__stat">{standing.played}</td>
                <td className="standings-table__stat standings-table__stat--wins">{standing.wins}</td>
                <td className="standings-table__stat">{standing.draw}</td>
                <td className="standings-table__stat standings-table__stat--losses">{standing.losses}</td>
                <td className="standings-table__stat">{standing.goalsFor}</td>
                <td className="standings-table__stat">{standing.goalsAgainst}</td>
                <td className={`standings-table__stat ${
                  standing.goalDifference > 0 
                    ? "standings-table__stat--positive" 
                    : standing.goalDifference < 0 
                    ? "standings-table__stat--negative" 
                    : ""
                }`}>
                  {standing.goalDifference > 0 ? "+" : ""}{standing.goalDifference}
                </td>
                <td className="standings-table__points">
                  <strong>{standing.points}</strong>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {standings.length > 0 && (
        <div className="group-standings__legend">
          <span className="legend-item">
            <span className="legend-dot legend-dot--qualified" />
            Qualifié pour le tour suivant
          </span>
        </div>
      )}
    </div>
  );
};

export default GroupStandings;

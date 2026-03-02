import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchTeams } from "../api/api";
import type { Team } from "../types/match";
import "./teams.css";

const Teams = () => {
  const navigate = useNavigate();
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadTeams = async () => {
      try {
        setLoading(true);
        const data = await fetchTeams();
        setTeams(data);
      } catch (err) {
        setError("Impossible de charger les équipes");
      } finally {
        setLoading(false);
      }
    };

    loadTeams();
  }, []);

  if (loading) {
    return (
      <div className="teams-page">
        <div className="container teams-page__state">
          <div className="spinner" />
          <p>Chargement des équipes…</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="teams-page">
        <div className="container teams-page__state teams-page__state--error">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="teams-page">
      <div className="container">
        {/* Page header */}
        <div className="teams-page__header">
          <h1 className="teams-page__title">Équipes</h1>
          <p className="teams-page__subtitle">
            Découvrez les {teams.length} équipes participantes et leur
            composition
          </p>
        </div>

        {/* Teams grid */}
        <div className="teams-grid">
          {teams.map((team) => (
            <article
              key={team.teamId}
              className="team-card"
              onClick={() => navigate(`/teams/${team.teamId}`)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) =>
                e.key === "Enter" && navigate(`/teams/${team.teamId}`)
              }
            >
              <div className="team-card__flag-container">
                <img
                  src={team.flagUrl}
                  alt={`Drapeau ${team.name}`}
                  className="team-card__flag"
                />
              </div>
              <div className="team-card__info">
                <h2 className="team-card__name">{team.name}</h2>
                <span className="team-card__code">{team.code}</span>
              </div>
              <div className="team-card__arrow">→</div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Teams;

import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchTeamById, fetchPlayersByTeam, fetchStandingsByTeam } from "../api/api";
import type { Team, GroupStanding } from "../types/match";
import type { Player, PlayerPosition } from "../types/player";
import { POSITION_LABELS, POSITION_ICONS } from "../types/player";
import "./teamDetail.css";

const TeamDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [team, setTeam] = useState<Team | null>(null);
  const [players, setPlayers] = useState<Player[]>([]);
  const [standings, setStandings] = useState<GroupStanding[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadTeamData = async () => {
      if (!id) return;

      try {
        setLoading(true);
        const teamId = parseInt(id);

        if (isNaN(teamId)) {
          setError("ID d'équipe invalide");
          return;
        }

        const [teamData, playersData, standingsData] = await Promise.all([
          fetchTeamById(teamId),
          fetchPlayersByTeam(teamId),
          fetchStandingsByTeam(teamId),
        ]);

        if (!teamData) {
          setError("Équipe introuvable");
          return;
        }

        setTeam(teamData);
        setPlayers(playersData);
        setStandings(standingsData);
      } catch (err) {
        setError("Impossible de charger les données de l'équipe");
      } finally {
        setLoading(false);
      }
    };

    loadTeamData();
  }, [id]);

  if (loading) {
    return (
      <div className="team-detail-page">
        <div className="container team-detail__state">
          <div className="spinner" />
          <p>Chargement des données…</p>
        </div>
      </div>
    );
  }

  if (error || !team) {
    return (
      <div className="team-detail-page">
        <div className="container team-detail__state team-detail__state--error">
          <p>{error || "Équipe introuvable"}</p>
        </div>
      </div>
    );
  }

  // Group players by position
  const playersByPosition: Record<PlayerPosition, Player[]> = {
    GOALKEEPER: [],
    DEFENDER: [],
    MIDFIELDER: [],
    FORWARD: [],
  };

  players.forEach((player) => {
    playersByPosition[player.position].push(player);
  });

  // Sort positions in logical order
  const positions: PlayerPosition[] = [
    "GOALKEEPER",
    "DEFENDER",
    "MIDFIELDER",
    "FORWARD",
  ];

  return (
    <div className="team-detail-page">
      <div className="container">
        {/* Back button */}
        <button
          className="team-detail__back"
          onClick={() => navigate("/teams")}
        >
          ← Retour aux équipes
        </button>

        {/* Team header */}
        <section className="team-detail__header">
          <div className="team-detail__flag-container">
            <img
              src={team.flagUrl}
              alt={`Drapeau ${team.name}`}
              className="team-detail__flag"
            />
          </div>
          <div className="team-detail__info">
            <h1 className="team-detail__name">{team.name}</h1>
            <span className="team-detail__code">{team.code}</span>
            <p className="team-detail__stats">
              {players.length} {players.length > 1 ? "joueurs" : "joueur"}
            </p>
          </div>
        </section>

        {/* Team Statistics */}
        {standings.length > 0 && (
          <section className="team-detail__statistics">
            <h2 className="statistics__title">
              <span className="statistics__icon">📊</span>
              Statistiques
            </h2>
            <div className="statistics-grid">
              {standings.map((standing) => (
                <div key={standing.standingId} className="stat-group">
                  <div className="stat-group__header">
                    {standing.group && (
                      <span className="stat-group__label">
                        Groupe {standing.group.name}
                      </span>
                    )}
                  </div>
                  <div className="stat-cards">
                    <div className="stat-card">
                      <div className="stat-card__icon">⚽</div>
                      <div className="stat-card__content">
                        <div className="stat-card__label">Matchs joués</div>
                        <div className="stat-card__value">{standing.played}</div>
                      </div>
                    </div>
                    <div className="stat-card stat-card--success">
                      <div className="stat-card__icon">✓</div>
                      <div className="stat-card__content">
                        <div className="stat-card__label">Victoires</div>
                        <div className="stat-card__value">{standing.wins}</div>
                      </div>
                    </div>
                    <div className="stat-card">
                      <div className="stat-card__icon">➖</div>
                      <div className="stat-card__content">
                        <div className="stat-card__label">Nuls</div>
                        <div className="stat-card__value">{standing.draw}</div>
                      </div>
                    </div>
                    <div className="stat-card stat-card--danger">
                      <div className="stat-card__icon">✕</div>
                      <div className="stat-card__content">
                        <div className="stat-card__label">Défaites</div>
                        <div className="stat-card__value">{standing.losses}</div>
                      </div>
                    </div>
                    <div className="stat-card stat-card--primary">
                      <div className="stat-card__icon">⚡</div>
                      <div className="stat-card__content">
                        <div className="stat-card__label">Buts marqués</div>
                        <div className="stat-card__value">{standing.goalsFor}</div>
                      </div>
                    </div>
                    <div className="stat-card">
                      <div className="stat-card__icon">🛡️</div>
                      <div className="stat-card__content">
                        <div className="stat-card__label">Buts encaissés</div>
                        <div className="stat-card__value">{standing.goalsAgainst}</div>
                      </div>
                    </div>
                    <div className="stat-card stat-card--highlight">
                      <div className="stat-card__icon">➕</div>
                      <div className="stat-card__content">
                        <div className="stat-card__label">Différence</div>
                        <div className="stat-card__value">
                          {standing.goalDifference > 0 ? "+" : ""}{standing.goalDifference}
                        </div>
                      </div>
                    </div>
                    <div className="stat-card stat-card--points">
                      <div className="stat-card__icon">🏆</div>
                      <div className="stat-card__content">
                        <div className="stat-card__label">Points</div>
                        <div className="stat-card__value stat-card__value--large">
                          {standing.points}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Players by position */}
        {positions.map((position) => {
          const positionPlayers = playersByPosition[position];
          if (positionPlayers.length === 0) return null;

          return (
            <section key={position} className="team-detail__position-group">
              <h2 className="position-group__title">
                <span className="position-group__icon">
                  {POSITION_ICONS[position]}
                </span>
                {POSITION_LABELS[position]}s
                <span className="position-group__count">
                  ({positionPlayers.length})
                </span>
              </h2>

              <div className="players-grid">
                {positionPlayers.map((player) => (
                  <article key={player.playerId} className="player-card">
                    <div className="player-card__number">
                      {player.jerseyNumber}
                    </div>
                    <div className="player-card__info">
                      <h3 className="player-card__name">
                        {player.firstName} <strong>{player.lastName}</strong>
                      </h3>
                      {player.nationality && (
                        <p className="player-card__nationality">
                          {player.nationality}
                        </p>
                      )}
                      {player.dateOfBirth && (
                        <p className="player-card__age">
                          {calculateAge(player.dateOfBirth)} ans
                        </p>
                      )}
                    </div>
                  </article>
                ))}
              </div>
            </section>
          );
        })}

        {players.length === 0 && (
          <div className="team-detail__empty">
            <p>Aucun joueur enregistré pour cette équipe</p>
          </div>
        )}
      </div>
    </div>
  );
};

// Helper function to calculate age
function calculateAge(dateOfBirth: string): number {
  const birthDate = new Date(dateOfBirth);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();

  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }

  return age;
}

export default TeamDetail;

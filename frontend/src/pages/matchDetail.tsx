import { useEffect, useReducer } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchMatchById } from "../api/api";
import type { Match } from "../types/match";
import { PHASE_LABELS } from "../types/match";
import "./matchDetail.css";

/* ── Reducer ─────────────────────────────────────────────── */
type State = { match: Match | null; loading: boolean; error: string | null };
type Action =
  | { type: "FETCH_SUCCESS"; payload: Match }
  | { type: "FETCH_NOT_FOUND" }
  | { type: "FETCH_ERROR"; payload: string };

const initialState: State = { match: null, loading: true, error: null };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "FETCH_SUCCESS":
      return { match: action.payload, loading: false, error: null };
    case "FETCH_NOT_FOUND":
      return { ...state, loading: false, error: "Match introuvable." };
    case "FETCH_ERROR":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}

/* ── Status config ───────────────────────────────────────── */
const STATUS_CONFIG = {
  SCHEDULED: { label: "À venir", cls: "badge-scheduled", icon: "🕐" },
  LIVE: { label: "En direct", cls: "badge-live", icon: "🔴" },
  FINISHED: { label: "Terminé", cls: "badge-finished", icon: "✅" },
};

/* ── Component ───────────────────────────────────────────── */
const MatchDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [{ match, loading, error }, dispatch] = useReducer(
    reducer,
    initialState,
  );

  useEffect(() => {
    const matchId = Number(id);
    if (isNaN(matchId)) {
      dispatch({ type: "FETCH_NOT_FOUND" });
      return;
    }
    fetchMatchById(matchId)
      .then((data) => {
        if (!data) {
          dispatch({ type: "FETCH_NOT_FOUND" });
        } else {
          dispatch({ type: "FETCH_SUCCESS", payload: data });
        }
      })
      .catch(() =>
        dispatch({
          type: "FETCH_ERROR",
          payload: "Impossible de charger le match.",
        }),
      );
  }, [id]);

  /* ── Loading ── */
  if (loading) {
    return (
      <div className="match-detail-page">
        <div className="container match-detail__state">
          <div className="spinner" />
          <p>Chargement du match…</p>
        </div>
      </div>
    );
  }

  /* ── Error ── */
  if (error || !match) {
    return (
      <div className="match-detail-page">
        <div className="container match-detail__state match-detail__state--error">
          <p>⚠️ {error ?? "Match introuvable."}</p>
          <button
            className="btn btn-outline"
            onClick={() => navigate("/matches")}
          >
            ← Retour aux matchs
          </button>
        </div>
      </div>
    );
  }

  const statusCfg = STATUS_CONFIG[match.status];
  const date = new Date(match.match_datetime);
  const formattedDate = date.toLocaleDateString("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const formattedTime = date.toLocaleTimeString("fr-FR", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="match-detail-page">
      <div className="container">
        {/* ── Back button ── */}
        <button
          className="match-detail__back"
          onClick={() => navigate("/matches")}
        >
          ← Retour aux matchs
        </button>

        {/* ── Phase / group breadcrumb ── */}
        <p className="match-detail__breadcrumb">
          {match.group_name
            ? `${PHASE_LABELS[match.phase.type]} · ${match.group_name}`
            : PHASE_LABELS[match.phase.type]}
        </p>

        {/* ── Score card ── */}
        <section className="match-detail__card">
          {/* Status badge */}
          <div className="match-detail__status">
            <span className={`badge ${statusCfg.cls}`}>
              {match.status === "LIVE" && <span className="pulse-dot" />}
              {statusCfg.icon} {statusCfg.label}
            </span>
          </div>

          {/* Teams + score */}
          <div className="match-detail__scoreboard">
            {/* Home team */}
            <div className="match-detail__team">
              <img
                src={match.home_team.flag_url}
                alt={`Drapeau ${match.home_team.name}`}
                className="match-detail__flag"
              />
              <span className="match-detail__team-name">
                {match.home_team.name}
              </span>
              <span className="match-detail__team-code">
                {match.home_team.code}
              </span>
            </div>

            {/* Score / VS */}
            <div className="match-detail__score-block">
              {match.status === "SCHEDULED" ? (
                <span className="match-detail__vs">VS</span>
              ) : (
                <div className="match-detail__score">
                  <span
                    className={
                      match.home_score > match.away_score ? "score-winner" : ""
                    }
                  >
                    {match.home_score}
                  </span>
                  <span className="match-detail__score-sep">—</span>
                  <span
                    className={
                      match.away_score > match.home_score ? "score-winner" : ""
                    }
                  >
                    {match.away_score}
                  </span>
                </div>
              )}
              {match.status === "LIVE" && (
                <span className="match-detail__live-label">EN DIRECT</span>
              )}
            </div>

            {/* Away team */}
            <div className="match-detail__team match-detail__team--right">
              <img
                src={match.away_team.flag_url}
                alt={`Drapeau ${match.away_team.name}`}
                className="match-detail__flag"
              />
              <span className="match-detail__team-name">
                {match.away_team.name}
              </span>
              <span className="match-detail__team-code">
                {match.away_team.code}
              </span>
            </div>
          </div>
        </section>

        {/* ── Match info ── */}
        <section className="match-detail__info">
          <h2 className="match-detail__info-title">Informations</h2>
          <div className="match-detail__info-grid">
            <div className="info-item">
              <span className="info-item__icon">📅</span>
              <div>
                <p className="info-item__label">Date</p>
                <p className="info-item__value">{formattedDate}</p>
              </div>
            </div>
            <div className="info-item">
              <span className="info-item__icon">🕐</span>
              <div>
                <p className="info-item__label">Heure</p>
                <p className="info-item__value">{formattedTime}</p>
              </div>
            </div>
            {match.stadium && (
              <div className="info-item">
                <span className="info-item__icon">🏟️</span>
                <div>
                  <p className="info-item__label">Stade</p>
                  <p className="info-item__value">{match.stadium}</p>
                </div>
              </div>
            )}
            <div className="info-item">
              <span className="info-item__icon">🏆</span>
              <div>
                <p className="info-item__label">Phase</p>
                <p className="info-item__value">
                  {PHASE_LABELS[match.phase.type]}
                </p>
              </div>
            </div>
            {match.group_name && (
              <div className="info-item">
                <span className="info-item__icon">📋</span>
                <div>
                  <p className="info-item__label">Groupe</p>
                  <p className="info-item__value">{match.group_name}</p>
                </div>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default MatchDetail;

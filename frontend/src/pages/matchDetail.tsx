import { useEffect, useReducer, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchMatchById, fetchMatchEvents } from "../api/api";
import { useMatchSocket, useMatchEvents } from "../hooks/useMatchSocket";
import type { Match, MatchEvent } from "../types/match";
import { PHASE_LABELS } from "../types/match";
import MatchEvents from "../components/MatchEvents";
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
  const [events, setEvents] = useState<MatchEvent[]>([]);

  // Mise à jour en temps réel via WebSocket
  const liveUpdate = useMatchSocket(Number(id));
  const liveEvents = useMatchEvents(Number(id));

  // Fusionner les données live avec le match chargé initialement
  const liveMatch: Match | null =
    match && liveUpdate
      ? {
          ...match,
          homeScore: liveUpdate.homeScore,
          awayScore: liveUpdate.awayScore,
          status: liveUpdate.status,
          currentMinute: liveUpdate.currentMinute,
        }
      : match;

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

  // Charger les événements du match
  useEffect(() => {
    const matchId = Number(id);
    if (isNaN(matchId)) return;

    fetchMatchEvents(matchId)
      .then((data) => setEvents(data))
      .catch((err) =>
        console.error("Erreur lors du chargement des événements:", err),
      );
  }, [id]);

  // Fusionner les événements initiaux et live, en dédupliquant par eventId
  const allEvents = Array.from(
    new Map(
      [...events, ...liveEvents].map((event) => [event.eventId, event]),
    ).values(),
  ).sort((a, b) => a.minute - b.minute);

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
  if (error || !liveMatch) {
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

  const statusCfg = STATUS_CONFIG[liveMatch.status];
  const date = new Date(liveMatch.matchDatetime);
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
          {liveMatch.group
            ? `${PHASE_LABELS[liveMatch.phase.type]} · ${liveMatch.group.name}`
            : PHASE_LABELS[liveMatch.phase.type]}
        </p>

        {/* ── Score card ── */}
        <section className="match-detail__card">
          {/* Status badge */}
          <div className="match-detail__status">
            <span className={`badge ${statusCfg.cls}`}>
              {liveMatch.status === "LIVE" && <span className="pulse-dot" />}
              {statusCfg.icon} {statusCfg.label}
            </span>
          </div>

          {/* Teams + score */}
          <div className="match-detail__scoreboard">
            {/* Home team */}
            <div className="match-detail__team">
              <img
                src={liveMatch.homeTeam.flagUrl}
                alt={`Drapeau ${liveMatch.homeTeam.name}`}
                className="match-detail__flag"
              />
              <span className="match-detail__team-name">
                {liveMatch.homeTeam.name}
              </span>
              <span className="match-detail__team-code">
                {liveMatch.homeTeam.code}
              </span>
            </div>

            {/* Score / VS */}
            <div className="match-detail__score-block">
              {liveMatch.status === "SCHEDULED" ? (
                <span className="match-detail__vs">VS</span>
              ) : (
                <div className="match-detail__score">
                  <span
                    className={
                      liveMatch.homeScore > liveMatch.awayScore
                        ? "score-winner"
                        : ""
                    }
                  >
                    {liveMatch.homeScore}
                  </span>
                  <span className="match-detail__score-sep">—</span>
                  <span
                    className={
                      liveMatch.awayScore > liveMatch.homeScore
                        ? "score-winner"
                        : ""
                    }
                  >
                    {liveMatch.awayScore}
                  </span>
                </div>
              )}
              {liveMatch.status === "LIVE" && (
                <span className="match-detail__live-label">
                  {liveMatch.currentMinute
                    ? `${liveMatch.currentMinute}' · `
                    : ""}
                  EN DIRECT
                </span>
              )}
            </div>

            {/* Away team */}
            <div className="match-detail__team match-detail__team--right">
              <img
                src={liveMatch.awayTeam.flagUrl}
                alt={`Drapeau ${liveMatch.awayTeam.name}`}
                className="match-detail__flag"
              />
              <span className="match-detail__team-name">
                {liveMatch.awayTeam.name}
              </span>
              <span className="match-detail__team-code">
                {liveMatch.awayTeam.code}
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
            {liveMatch.stadium && (
              <div className="info-item">
                <span className="info-item__icon">🏟️</span>
                <div>
                  <p className="info-item__label">Stade</p>
                  <p className="info-item__value">{liveMatch.stadium}</p>
                </div>
              </div>
            )}
            <div className="info-item">
              <span className="info-item__icon">🏆</span>
              <div>
                <p className="info-item__label">Phase</p>
                <p className="info-item__value">
                  {PHASE_LABELS[liveMatch.phase.type]}
                </p>
              </div>
            </div>
            {liveMatch.group && (
              <div className="info-item">
                <span className="info-item__icon">📋</span>
                <div>
                  <p className="info-item__label">Groupe</p>
                  <p className="info-item__value">{liveMatch.group.name}</p>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* ── Match Events ── */}
        {allEvents.length > 0 && (
          <section className="match-detail__events">
            <MatchEvents
              events={allEvents}
              homeTeam={liveMatch.homeTeam}
              awayTeam={liveMatch.awayTeam}
            />
          </section>
        )}
      </div>
    </div>
  );
};

export default MatchDetail;

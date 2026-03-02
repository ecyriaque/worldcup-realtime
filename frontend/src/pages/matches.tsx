import { useState, useEffect, useReducer } from "react";
import { fetchMatches } from "../api/api";
import type { Match, PhaseType } from "../types/match";
import { PHASE_ORDER } from "../types/match";
import MatchCard from "../components/MatchCard";
import PhaseFilter from "../components/PhaseFilter";
import "./matches.css";

type State = { matches: Match[]; loading: boolean; error: string | null };
type Action =
  | { type: "FETCH_SUCCESS"; payload: Match[] }
  | { type: "FETCH_ERROR"; payload: string };

const initialState: State = { matches: [], loading: true, error: null };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "FETCH_SUCCESS":
      return { matches: action.payload, loading: false, error: null };
    case "FETCH_ERROR":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}

const Matches = () => {
  const [{ matches, loading, error }, dispatch] = useReducer(
    reducer,
    initialState,
  );
  const [activePhase, setActivePhase] = useState<PhaseType | "ALL">("ALL");

  useEffect(() => {
    fetchMatches()
      .then((data) => dispatch({ type: "FETCH_SUCCESS", payload: data }))
      .catch(() =>
        dispatch({
          type: "FETCH_ERROR",
          payload: "Impossible de charger les matchs.",
        }),
      );
  }, []);

  // Phases disponibles dans les données
  const availablePhases = PHASE_ORDER.filter((p) =>
    matches.some((m) => m.phase.type === p),
  );

  // Matchs filtrés
  const filtered =
    activePhase === "ALL"
      ? matches
      : matches.filter((m) => m.phase.type === activePhase);

  // Regrouper par phase → groupe
  const grouped = filtered.reduce<Record<string, Match[]>>((acc, match) => {
    const key = match.group_name
      ? `${match.phase.name} · ${match.group_name}`
      : match.phase.name;
    if (!acc[key]) acc[key] = [];
    acc[key].push(match);
    return acc;
  }, {});

  return (
    <div className="matches-page">
      <div className="container">
        {/* Page header */}
        <div className="matches-page__header">
          <h1 className="matches-page__title">Matchs</h1>
          <p className="matches-page__subtitle">
            Coupe du Monde 2026 — Toutes les phases
          </p>
        </div>

        {/* Phase filter */}
        <div className="matches-page__filter">
          <PhaseFilter
            activePhase={activePhase}
            onChange={setActivePhase}
            availablePhases={availablePhases}
          />
        </div>

        {/* States */}
        {loading && (
          <div className="matches-page__state">
            <div className="spinner" />
            <p>Chargement des matchs…</p>
          </div>
        )}

        {error && !loading && (
          <div className="matches-page__state matches-page__state--error">
            ⚠️ {error}
          </div>
        )}

        {/* Match list grouped */}
        {!loading && !error && (
          <div className="matches-groups">
            {Object.entries(grouped).map(([groupLabel, groupMatches]) => (
              <section key={groupLabel} className="matches-group">
                <h2 className="matches-group__label">{groupLabel}</h2>
                <div className="matches-group__list">
                  {groupMatches.map((match) => (
                    <MatchCard key={match.match_id} match={match} />
                  ))}
                </div>
              </section>
            ))}

            {filtered.length === 0 && (
              <div className="matches-page__state">
                Aucun match pour cette phase.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Matches;

import { useEffect, useReducer } from "react";
import { fetchMatches } from "../api/api";
import type { Match } from "../types/match";
import { socket } from "../services/socket";
import type { MatchUpdatePayload } from "../hooks/useMatchSocket";
import TournamentBracket from "../components/TournamentBracket";
import "./bracket.css";

type State = { matches: Match[]; loading: boolean; error: string | null };
type Action =
  | { type: "FETCH_SUCCESS"; payload: Match[] }
  | { type: "FETCH_ERROR"; payload: string }
  | { type: "LIVE_UPDATE"; payload: MatchUpdatePayload };

const initialState: State = { matches: [], loading: true, error: null };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "FETCH_SUCCESS":
      return { matches: action.payload, loading: false, error: null };
    case "FETCH_ERROR":
      return { ...state, loading: false, error: action.payload };
    case "LIVE_UPDATE":
      return {
        ...state,
        matches: state.matches.map((m) =>
          m.matchId === action.payload.matchId
            ? {
                ...m,
                homeScore: action.payload.homeScore,
                awayScore: action.payload.awayScore,
                status: action.payload.status,
              }
            : m,
        ),
      };
    default:
      return state;
  }
}

const Bracket = () => {
  const [{ matches, loading, error }, dispatch] = useReducer(
    reducer,
    initialState,
  );

  useEffect(() => {
    const loadMatches = async () => {
      try {
        const data = await fetchMatches();
        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (err) {
        dispatch({ type: "FETCH_ERROR", payload: "Erreur de chargement" });
      }
    };

    loadMatches();
  }, []);

  // Socket listeners
  useEffect(() => {
    const handleMatchUpdate = (data: MatchUpdatePayload) => {
      dispatch({ type: "LIVE_UPDATE", payload: data });
    };

    socket.on("match:update", handleMatchUpdate);
    return () => {
      socket.off("match:update", handleMatchUpdate);
    };
  }, []);

  // Filtrer uniquement les phases éliminatoires
  const knockoutMatches = matches.filter((m) =>
    ["ROUND_OF_32", "ROUND_OF_16", "QUARTER_FINAL", "SEMI_FINAL", "THIRD_PLACE", "FINAL"].includes(
      m.phase.type,
    ),
  );

  if (loading) {
    return (
      <div className="bracket-page">
        <div className="container">
          <div className="bracket-page__state">
            <div className="spinner" />
            <p>Chargement du tableau…</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bracket-page">
        <div className="container">
          <div className="bracket-page__state bracket-page__state--error">
            <p>{error}</p>
          </div>
        </div>
      </div>
    );
  }

  if (knockoutMatches.length === 0) {
    return (
      <div className="bracket-page">
        <div className="container">
          <header className="bracket-page__header">
            <h1 className="bracket-page__title">Tableau des phases finales</h1>
            <p className="bracket-page__subtitle">
              Suivez l'évolution du tournoi depuis les huitièmes jusqu'à la finale
            </p>
          </header>
          <div className="bracket-page__empty">
            <p>🏆 Les phases éliminatoires n'ont pas encore commencé.</p>
            <p>Revenez après la phase de groupes !</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bracket-page">
      <div className="container">
        <header className="bracket-page__header">
          <h1 className="bracket-page__title">Tableau des phases finales</h1>
          <p className="bracket-page__subtitle">
            Suivez l'évolution du tournoi depuis les huitièmes jusqu'à la finale
          </p>
        </header>

        <div className="bracket-page__content">
          <TournamentBracket matches={knockoutMatches} />
        </div>
      </div>
    </div>
  );
};

export default Bracket;

import { useEffect, useRef } from "react";
import toast from "react-hot-toast";
import { useNavigate, useLocation } from "react-router-dom";
import { socket } from "../services/socket";
import { getSubscribedMatchIds } from "./useNotificationPreferences";

type MatchEventType = 
  | "GOAL" 
  | "PENALTY_GOAL" 
  | "OWN_GOAL" 
  | "YELLOW_CARD" 
  | "RED_CARD" 
  | "SUBSTITUTION";

interface MatchEventPayload {
  eventId: number;
  matchId: number;
  teamId: number;
  playerId?: number;
  playerName: string;
  eventType: MatchEventType;
  minute: number;
  extraInfo?: string;
  teamName?: string;
  homeTeam?: {
    teamId: number;
    name: string;
    code: string;
    flagUrl?: string;
  };
  awayTeam?: {
    teamId: number;
    name: string;
    code: string;
    flagUrl?: string;
  };
}

const processedEvents = new Set<number>();

/**
 * Hook qui écoute tous les événements de match globalement
 * et affiche des notifications toast
 */
export function useMatchEventNotifications() {
  const navigate = useNavigate();
  const location = useLocation();
  const navigateRef = useRef(navigate);
  const locationRef = useRef(location);

  useEffect(() => {
    navigateRef.current = navigate;
    locationRef.current = location;
  }, [navigate, location]);

  useEffect(() => {
    const handleMatchEvent = (event: MatchEventPayload) => {
      if (processedEvents.has(event.eventId)) {
        return;
      }
      processedEvents.add(event.eventId);

      setTimeout(() => {
        processedEvents.delete(event.eventId);
      }, 5000);
      
      const currentPath = locationRef.current.pathname;
      if (currentPath === `/matches/${event.matchId}`) {
        return;
      }

      const subscriptions = getSubscribedMatchIds();
      if (subscriptions.size > 0 && !subscriptions.has(event.matchId)) {
        return;
      }

      showEventToast(event, navigateRef.current);
    };

    socket.on("match:event", handleMatchEvent);

    return () => {
      socket.off("match:event", handleMatchEvent);
    };
  }, []); // Pas de dépendances - le listener est créé une seule fois
}

/**
 * Affiche un toast personnalisé selon le type d'événement
 */
function showEventToast(event: MatchEventPayload, navigate: (path: string) => void) {
  const { eventType, playerName, minute, teamName, extraInfo, matchId, homeTeam, awayTeam } = event;

  // ID unique pour empêcher les doublons au niveau de react-hot-toast
  const toastId = `event-${event.eventId}`;

  // Header du toast avec les équipes
  const matchHeader = homeTeam && awayTeam ? (
    <div style={{ 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      gap: '8px', 
      marginBottom: '8px',
      paddingBottom: '8px',
      borderBottom: '1px solid rgba(255,255,255,0.2)',
      fontSize: '11px',
      fontWeight: 'bold'
    }}>
      {homeTeam.flagUrl && <img src={homeTeam.flagUrl} alt={homeTeam.code} style={{ width: '20px', height: '14px', objectFit: 'cover', borderRadius: '2px' }} />}
      <span>{homeTeam.code}</span>
      <span style={{ fontSize: '10px', opacity: 0.7 }}>vs</span>
      <span>{awayTeam.code}</span>
      {awayTeam.flagUrl && <img src={awayTeam.flagUrl} alt={awayTeam.code} style={{ width: '20px', height: '14px', objectFit: 'cover', borderRadius: '2px' }} />}
    </div>
  ) : null;

  // Handler pour la navigation
  const handleClick = () => {
    navigate(`/matches/${matchId}`);
  };

  // Contenu du toast selon le type d'événement
  switch (eventType) {
    case "GOAL":
      toast.success(
        <div onClick={handleClick} style={{ cursor: 'pointer' }}>
          {matchHeader}
          <div className="toast-content">
            <div className="toast-icon">⚽</div>
            <div className="toast-text">
              <strong>BUT !</strong>
              <p>{playerName} ({teamName})</p>
              <span className="toast-minute">{minute}'</span>
            </div>
          </div>
        </div>,
        {
          id: toastId,
          duration: 5000,
          position: "top-right",
          style: {
            background: "#10b981",
            color: "#fff",
            padding: "16px",
            borderRadius: "8px",
          },
        }
      );
      break;

    case "PENALTY_GOAL":
      toast.success(
        <div onClick={handleClick} style={{ cursor: 'pointer' }}>
          {matchHeader}
          <div className="toast-content">
            <div className="toast-icon">⚽🎯</div>
            <div className="toast-text">
              <strong>BUT sur PENALTY !</strong>
              <p>{playerName} ({teamName})</p>
              <span className="toast-minute">{minute}'</span>
            </div>
          </div>
        </div>,
        {
          id: toastId,
          duration: 5000,
          position: "top-right",
          style: {
            background: "#059669",
            color: "#fff",
            padding: "16px",
            borderRadius: "8px",
          },
        }
      );
      break;

    case "OWN_GOAL":
      toast.error(
        <div onClick={handleClick} style={{ cursor: 'pointer' }}>
          {matchHeader}
          <div className="toast-content">
            <div className="toast-icon">⚽😬</div>
            <div className="toast-text">
              <strong>But contre son camp</strong>
              <p>{playerName} ({teamName})</p>
              <span className="toast-minute">{minute}'</span>
            </div>
          </div>
        </div>,
        {
          id: toastId,
          duration: 5000,
          position: "top-right",
          style: {
            background: "#dc2626",
            color: "#fff",
            padding: "16px",
            borderRadius: "8px",
          },
        }
      );
      break;

    case "YELLOW_CARD":
      toast(
        <div onClick={handleClick} style={{ cursor: 'pointer' }}>
          {matchHeader}
          <div className="toast-content">
            <div className="toast-icon">🟨</div>
            <div className="toast-text">
              <strong>Carton jaune</strong>
              <p>{playerName} ({teamName})</p>
              <span className="toast-minute">{minute}'</span>
              {extraInfo && <span className="toast-extra">{extraInfo}</span>}
            </div>
          </div>
        </div>,
        {
          id: toastId,
          duration: 4000,
          position: "top-right",
          style: {
            background: "#fbbf24",
            color: "#000",
            padding: "16px",
            borderRadius: "8px",
          },
        }
      );
      break;

    case "RED_CARD":
      toast.error(
        <div onClick={handleClick} style={{ cursor: 'pointer' }}>
          {matchHeader}
          <div className="toast-content">
            <div className="toast-icon">🟥</div>
            <div className="toast-text">
              <strong>CARTON ROUGE !</strong>
              <p>{playerName} ({teamName})</p>
              <span className="toast-minute">{minute}'</span>
              {extraInfo && <span className="toast-extra">{extraInfo}</span>}
            </div>
          </div>
        </div>,
        {
          id: toastId,
          duration: 6000,
          position: "top-right",
          style: {
            background: "#dc2626",
            color: "#fff",
            padding: "16px",
            borderRadius: "8px",
          },
        }
      );
      break;

    case "SUBSTITUTION":
      toast(
        <div onClick={handleClick} style={{ cursor: 'pointer' }}>
          {matchHeader}
          <div className="toast-content">
            <div className="toast-icon">🔄</div>
            <div className="toast-text">
              <strong>Remplacement</strong>
              <p>{playerName} ({teamName})</p>
              <span className="toast-minute">{minute}'</span>
              {extraInfo && <span className="toast-extra">{extraInfo}</span>}
            </div>
          </div>
        </div>,
        {
          id: toastId,
          duration: 3000,
          position: "top-right",
          style: {
            background: "#3b82f6",
            color: "#fff",
            padding: "16px",
            borderRadius: "8px",
          },
        }
      );
      break;

    default:
      toast(
        <div onClick={handleClick} style={{ cursor: 'pointer' }}>
          {matchHeader}
          <div className="toast-content">
            <div className="toast-icon">ℹ️</div>
            <div className="toast-text">
              <strong>Événement</strong>
              <p>{playerName} ({teamName})</p>
              <span className="toast-minute">{minute}'</span>
            </div>
          </div>
        </div>,
        {
          id: toastId,
          duration: 3000,
          position: "top-right",
        }
      );
  }
}

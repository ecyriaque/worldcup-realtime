import type { MatchEvent, MatchEventType, Team } from "../types/match";
import "./MatchEvents.css";

interface MatchEventsProps {
  events: MatchEvent[];
  homeTeam: Team;
  awayTeam: Team;
}

const EVENT_CONFIG: Record<
  MatchEventType,
  { icon: string; label: string; className: string }
> = {
  GOAL: { icon: "⚽", label: "But", className: "event-goal" },
  PENALTY_GOAL: { icon: "⚽🎯", label: "Penalty", className: "event-penalty" },
  OWN_GOAL: { icon: "⚽😢", label: "CSC", className: "event-own-goal" },
  YELLOW_CARD: { icon: "🟨", label: "Carton jaune", className: "event-yellow" },
  RED_CARD: { icon: "🟥", label: "Carton rouge", className: "event-red" },
  SUBSTITUTION: { icon: "🔄", label: "Remplacement", className: "event-sub" },
};

const MatchEvents = ({ events, homeTeam, awayTeam }: MatchEventsProps) => {
  if (events.length === 0) {
    return (
      <div className="match-events-empty">
        <p>Aucun événement pour le moment</p>
      </div>
    );
  }

  return (
    <div className="match-events">
      <h2 className="match-events__title">Événements du match</h2>
      <div className="match-events__timeline">
        {events.map((event) => {
          const config = EVENT_CONFIG[event.eventType];
          const isHomeTeam = event.teamId === homeTeam.teamId;
          const team = isHomeTeam ? homeTeam : awayTeam;

          return (
            <div
              key={event.eventId}
              className={`match-event ${config.className} ${isHomeTeam ? "match-event--home" : "match-event--away"}`}
            >
              {/* Minute */}
              <div className="match-event__minute">
                <span className="minute-number">{event.minute}'</span>
              </div>

              {/* Event card */}
              <div className="match-event__card">
                {/* Team info */}
                <div className="match-event__team-info">
                  <img
                    src={team.flagUrl}
                    alt={team.name}
                    className="match-event__flag"
                  />
                  <span className="match-event__team-name">{team.name}</span>
                </div>

                {/* Event details */}
                <div className="match-event__content">
                  <div className="match-event__icon">{config.icon}</div>
                  <div className="match-event__details">
                    <span className="match-event__type">{config.label}</span>
                    <span className="match-event__player">
                      {event.playerName}
                    </span>
                    {event.extraInfo && (
                      <span className="match-event__extra">
                        {event.extraInfo}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MatchEvents;

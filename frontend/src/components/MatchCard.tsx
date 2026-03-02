import { useNavigate } from 'react-router-dom'
import type { Match } from '../types/match'
import { PHASE_LABELS } from '../types/match'
import './MatchCard.css'

interface MatchCardProps {
  match: Match
}

const STATUS_CONFIG = {
  SCHEDULED: { label: 'À venir',  cls: 'badge-scheduled' },
  LIVE:      { label: 'En direct', cls: 'badge-live'      },
  FINISHED:  { label: 'Terminé',  cls: 'badge-finished'  },
}

const MatchCard = ({ match }: MatchCardProps) => {
  const navigate = useNavigate()
  const statusCfg = STATUS_CONFIG[match.status]
  const date = new Date(match.match_datetime)

  const formattedDate = date.toLocaleDateString('fr-FR', {
    weekday: 'short', day: 'numeric', month: 'short',
  })
  const formattedTime = date.toLocaleTimeString('fr-FR', {
    hour: '2-digit', minute: '2-digit',
  })

  return (
    <article
      className={`match-card ${match.status === 'LIVE' ? 'match-card--live' : ''}`}
      onClick={() => navigate(`/matches/${match.match_id}`)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && navigate(`/matches/${match.match_id}`)}
      aria-label={`Match ${match.home_team.name} vs ${match.away_team.name}`}
    >
      {/* Header */}
      <div className="match-card__header">
        <span className="match-card__phase">
          {match.group_name
            ? `${PHASE_LABELS[match.phase.type]} · ${match.group_name}`
            : PHASE_LABELS[match.phase.type]}
        </span>
        <span className={`badge ${statusCfg.cls}`}>
          {match.status === 'LIVE' && <span className="pulse-dot" />}
          {statusCfg.label}
        </span>
      </div>

      {/* Score */}
      <div className="match-card__body">
        {/* Home team */}
        <div className="match-card__team">
          <img
            src={match.home_team.flag_url}
            alt={match.home_team.name}
            className="match-card__flag"
          />
          <span className="match-card__team-name">{match.home_team.name}</span>
          <span className="match-card__team-code">{match.home_team.code}</span>
        </div>

        {/* Score / VS */}
        <div className="match-card__score">
          {match.status === 'SCHEDULED' ? (
            <span className="match-card__vs">VS</span>
          ) : (
            <>
              <span className="match-card__score-num">{match.home_score}</span>
              <span className="match-card__score-sep">-</span>
              <span className="match-card__score-num">{match.away_score}</span>
            </>
          )}
        </div>

        {/* Away team */}
        <div className="match-card__team match-card__team--right">
          <img
            src={match.away_team.flag_url}
            alt={match.away_team.name}
            className="match-card__flag"
          />
          <span className="match-card__team-name">{match.away_team.name}</span>
          <span className="match-card__team-code">{match.away_team.code}</span>
        </div>
      </div>

      {/* Footer */}
      <div className="match-card__footer">
        <span>📅 {formattedDate} · {formattedTime}</span>
        {match.stadium && <span>🏟️ {match.stadium}</span>}
      </div>
    </article>
  )
}

export default MatchCard

-- Migration: Add match events system
-- This allows tracking goals, cards, and other match events with players and minutes

-- Create event type enum
CREATE TYPE match_event_type AS ENUM (
    'GOAL',
    'PENALTY_GOAL',
    'OWN_GOAL',
    'YELLOW_CARD',
    'RED_CARD',
    'SUBSTITUTION'
);

-- Create match_event table
CREATE TABLE match_event (
    event_id SERIAL PRIMARY KEY,
    match_id INT NOT NULL,
    team_id INT NOT NULL,
    player_name VARCHAR(100) NOT NULL,
    event_type match_event_type NOT NULL,
    minute INT NOT NULL CHECK (minute >= 0 AND minute <= 120),
    extra_info VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT fk_event_match
        FOREIGN KEY (match_id)
        REFERENCES match(match_id)
        ON DELETE CASCADE,
    
    CONSTRAINT fk_event_team
        FOREIGN KEY (team_id)
        REFERENCES team(team_id)
        ON DELETE CASCADE
);

-- Create index for faster queries
CREATE INDEX idx_match_event_match_id ON match_event(match_id);
CREATE INDEX idx_match_event_minute ON match_event(minute);

-- Add current_minute to match table for live minute tracking
ALTER TABLE match ADD COLUMN current_minute INT DEFAULT 0 CHECK (current_minute >= 0 AND current_minute <= 120);

-- Add comment
COMMENT ON TABLE match_event IS 'Stores all match events (goals, cards, substitutions) with player and minute information';
COMMENT ON COLUMN match.current_minute IS 'Current minute of play for LIVE matches, used for real-time updates';

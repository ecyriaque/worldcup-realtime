-- Migration: Add players system
-- This allows tracking players for each team

-- Create position enum
CREATE TYPE player_position AS ENUM (
    'GOALKEEPER',
    'DEFENDER',
    'MIDFIELDER',
    'FORWARD'
);

-- Create player table
CREATE TABLE player (
    player_id SERIAL PRIMARY KEY,
    team_id INT NOT NULL,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    jersey_number INT NOT NULL CHECK (jersey_number >= 1 AND jersey_number <= 99),
    position player_position NOT NULL,
    date_of_birth DATE,
    nationality VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT fk_player_team
        FOREIGN KEY (team_id)
        REFERENCES team(team_id)
        ON DELETE CASCADE,
    
    CONSTRAINT unique_jersey_per_team
        UNIQUE (team_id, jersey_number)
);

-- Create index for faster queries
CREATE INDEX idx_player_team_id ON player(team_id);
CREATE INDEX idx_player_last_name ON player(last_name);

-- Modify match_event table to use player_id instead of player_name
ALTER TABLE match_event 
    DROP COLUMN player_name,
    ADD COLUMN player_id INT;

ALTER TABLE match_event
    ADD CONSTRAINT fk_event_player
        FOREIGN KEY (player_id)
        REFERENCES player(player_id)
        ON DELETE SET NULL;

CREATE INDEX idx_match_event_player_id ON match_event(player_id);

-- Add comment
COMMENT ON TABLE player IS 'Stores all players for each team participating in the competition';
COMMENT ON COLUMN match_event.player_id IS 'References the player involved in the event (goals, cards, substitutions)';

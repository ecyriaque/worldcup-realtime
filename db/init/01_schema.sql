-- ============================================
-- World Cup Database Schema
-- ============================================

-- Create ENUM types
CREATE TYPE phase_type AS ENUM (
    'GROUP_STAGE',
    'ROUND_OF_32',
    'ROUND_OF_16',
    'QUARTER_FINAL',
    'SEMI_FINAL',
    'THIRD_PLACE',
    'FINAL'
);

CREATE TYPE match_status AS ENUM (
    'SCHEDULED',
    'LIVE',
    'FINISHED'
);

CREATE TYPE player_position AS ENUM (
    'GOALKEEPER',
    'DEFENDER',
    'MIDFIELDER',
    'FORWARD'
);

CREATE TYPE match_event_type AS ENUM (
    'GOAL',
    'PENALTY_GOAL',
    'OWN_GOAL',
    'YELLOW_CARD',
    'RED_CARD',
    'SUBSTITUTION'
);

-- ============================================
-- Core Tables
-- ============================================

CREATE TABLE competition (
    competition_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    year_competition INT NOT NULL
);

CREATE TABLE phase (
    phase_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    type phase_type NOT NULL,
    display_order INT NOT NULL,
    competition_id INT NOT NULL,
    
    CONSTRAINT fk_phase_competition
        FOREIGN KEY (competition_id)
        REFERENCES competition(competition_id)
        ON DELETE CASCADE
);

CREATE TABLE group_stage (
    group_id SERIAL PRIMARY KEY,
    name VARCHAR(5) NOT NULL,
    phase_id INT NOT NULL,
  
    CONSTRAINT fk_group_phase
        FOREIGN KEY (phase_id)
        REFERENCES phase(phase_id)
        ON DELETE CASCADE
);

CREATE TABLE team (
    team_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    code VARCHAR(10) NOT NULL UNIQUE,
    flag_url VARCHAR(255)
);

-- ============================================
-- Player Table
-- ============================================

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

CREATE INDEX idx_player_team_id ON player(team_id);
CREATE INDEX idx_player_last_name ON player(last_name);

-- ============================================
-- Match Table
-- ============================================

CREATE TABLE match (
    match_id SERIAL PRIMARY KEY,
    match_datetime TIMESTAMP NOT NULL,
    stadium VARCHAR(150),
    status match_status NOT NULL,
    home_score INT DEFAULT 0 CHECK (home_score >= 0),
    away_score INT DEFAULT 0 CHECK (away_score >= 0),
    current_minute INT DEFAULT 0 CHECK (current_minute >= 0 AND current_minute <= 120),
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    phase_id INT NOT NULL,
    group_id INT NULL,
    home_team_id INT NOT NULL,
    away_team_id INT NOT NULL,
  
    CONSTRAINT fk_match_phase
        FOREIGN KEY (phase_id)
        REFERENCES phase(phase_id)
        ON DELETE CASCADE,
  
    CONSTRAINT fk_match_group
        FOREIGN KEY (group_id)
        REFERENCES group_stage(group_id)
        ON DELETE SET NULL,
  
    CONSTRAINT fk_match_home_team
        FOREIGN KEY (home_team_id)
        REFERENCES team(team_id),
  
    CONSTRAINT fk_match_away_team
        FOREIGN KEY (away_team_id)
        REFERENCES team(team_id),
  
    CONSTRAINT check_different_teams
        CHECK (home_team_id <> away_team_id)
);

-- ============================================
-- Match Event Table
-- ============================================

CREATE TABLE match_event (
    event_id SERIAL PRIMARY KEY,
    match_id INT NOT NULL,
    team_id INT NOT NULL,
    player_id INT,
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
        ON DELETE CASCADE,
        
    CONSTRAINT fk_event_player
        FOREIGN KEY (player_id)
        REFERENCES player(player_id)
        ON DELETE SET NULL
);

CREATE INDEX idx_match_event_match_id ON match_event(match_id);
CREATE INDEX idx_match_event_minute ON match_event(minute);
CREATE INDEX idx_match_event_player_id ON match_event(player_id);

-- ============================================
-- Group Standing Table
-- ============================================

CREATE TABLE group_standing (
    standing_id SERIAL PRIMARY KEY,
    group_id INT NOT NULL,
    team_id INT NOT NULL,
    played INT DEFAULT 0 CHECK (played >= 0),
    wins INT DEFAULT 0 CHECK (wins >= 0),
    draw INT DEFAULT 0 CHECK (draw >= 0),
    losses INT DEFAULT 0 CHECK (losses >= 0),
    goals_for INT DEFAULT 0 CHECK (goals_for >= 0),
    goals_against INT DEFAULT 0 CHECK (goals_against >= 0),
    goal_difference INT DEFAULT 0,
    points INT DEFAULT 0 CHECK (points >= 0),
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
    CONSTRAINT fk_standing_group
        FOREIGN KEY (group_id)
        REFERENCES group_stage(group_id)
        ON DELETE CASCADE,
  
    CONSTRAINT fk_standing_team
        FOREIGN KEY (team_id)
        REFERENCES team(team_id),
  
    CONSTRAINT unique_team_per_group
        UNIQUE (group_id, team_id)
);

-- ============================================
-- Comments
-- ============================================

COMMENT ON TABLE match_event IS 'Stores all match events (goals, cards, substitutions) with player and minute information';
COMMENT ON COLUMN match.current_minute IS 'Current minute of play for LIVE matches, used for real-time updates';
COMMENT ON TABLE player IS 'Stores player information for each team with position and jersey number';
COMMENT ON CONSTRAINT fk_event_player ON match_event IS 'Foreign key to player table, set to NULL if player is deleted';

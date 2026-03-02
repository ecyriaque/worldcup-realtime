-- World Cup Realtime Database Schema
-- PostgreSQL 16

-- Create ENUM types
CREATE TYPE phase_type AS ENUM (
  'GROUP_STAGE',
  'ROUND_OF_32',
  'ROUND_OF_16',
  'QUARTER_FINALS',
  'SEMI_FINALS',
  'FINAL'
);

CREATE TYPE match_status AS ENUM (
  'SCHEDULED',
  'LIVE',
  'FINISHED'
);

-- Competition table
CREATE TABLE competition (
  competition_id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  year INT NOT NULL
);

-- Phase table
CREATE TABLE phase (
  phase_id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  type phase_type NOT NULL,
  display_order INT NOT NULL,
  competition_id INT NOT NULL,
  FOREIGN KEY (competition_id) REFERENCES competition(competition_id) ON DELETE CASCADE
);

-- Group Stage table
CREATE TABLE group_stage (
  group_id SERIAL PRIMARY KEY,
  name VARCHAR(5) NOT NULL,
  phase_id INT NOT NULL,
  FOREIGN KEY (phase_id) REFERENCES phase(phase_id) ON DELETE CASCADE
);

-- Team table
CREATE TABLE team (
  team_id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  code VARCHAR(10) NOT NULL UNIQUE,
  flag_url VARCHAR(255)
);

-- Match table
CREATE TABLE match (
  match_id SERIAL PRIMARY KEY,
  match_datetime TIMESTAMP NOT NULL,
  location VARCHAR(150),
  status match_status NOT NULL DEFAULT 'SCHEDULED',
  home_score INT NOT NULL DEFAULT 0,
  away_score INT NOT NULL DEFAULT 0,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  phase_id INT NOT NULL,
  group_id INT,
  home_team_id INT NOT NULL,
  away_team_id INT NOT NULL,
  FOREIGN KEY (phase_id) REFERENCES phase(phase_id) ON DELETE CASCADE,
  FOREIGN KEY (group_id) REFERENCES group_stage(group_id) ON DELETE SET NULL,
  FOREIGN KEY (home_team_id) REFERENCES team(team_id),
  FOREIGN KEY (away_team_id) REFERENCES team(team_id),
  CHECK (home_team_id <> away_team_id)
);

-- Group Standing table
CREATE TABLE group_standing (
  standing_id SERIAL PRIMARY KEY,
  points INT NOT NULL DEFAULT 0,
  played INT NOT NULL DEFAULT 0,
  won INT NOT NULL DEFAULT 0,
  drawn INT NOT NULL DEFAULT 0,
  lost INT NOT NULL DEFAULT 0,
  goals_for INT NOT NULL DEFAULT 0,
  goals_against INT NOT NULL DEFAULT 0,
  goal_difference INT NOT NULL DEFAULT 0,
  rank INT NOT NULL DEFAULT 1,
  group_id INT NOT NULL,
  team_id INT NOT NULL,
  FOREIGN KEY (group_id) REFERENCES group_stage(group_id) ON DELETE CASCADE,
  FOREIGN KEY (team_id) REFERENCES team(team_id),
  CHECK (goals_for >= 0),
  CHECK (goals_against >= 0),
  CHECK (points >= 0),
  CHECK (played >= 0),
  CHECK (won >= 0),
  CHECK (drawn >= 0),
  CHECK (lost >= 0),
  CHECK (played = won + drawn + lost)
);

-- Create indexes for better query performance
CREATE INDEX idx_phase_competition ON phase(competition_id);
CREATE INDEX idx_group_phase ON group_stage(phase_id);
CREATE INDEX idx_match_phase ON match(phase_id);
CREATE INDEX idx_match_group ON match(group_id);
CREATE INDEX idx_match_home_team ON match(home_team_id);
CREATE INDEX idx_match_away_team ON match(away_team_id);
CREATE INDEX idx_match_status ON match(status);
CREATE INDEX idx_match_datetime ON match(match_datetime);
CREATE INDEX idx_standing_group ON group_standing(group_id);
CREATE INDEX idx_standing_team ON group_standing(team_id);

-- Function to update match updated_at timestamp
CREATE OR REPLACE FUNCTION update_match_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to automatically update match timestamp
CREATE TRIGGER trigger_update_match_timestamp
BEFORE UPDATE ON match
FOR EACH ROW
EXECUTE FUNCTION update_match_timestamp();

-- Function to calculate goal difference
CREATE OR REPLACE FUNCTION calculate_goal_difference()
RETURNS TRIGGER AS $$
BEGIN
  NEW.goal_difference = NEW.goals_for - NEW.goals_against;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to automatically calculate goal difference
CREATE TRIGGER trigger_calculate_goal_difference
BEFORE INSERT OR UPDATE ON group_standing
FOR EACH ROW
EXECUTE FUNCTION calculate_goal_difference();

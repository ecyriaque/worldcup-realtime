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

CREATE TABLE match (
    match_id SERIAL PRIMARY KEY,
    match_datetime TIMESTAMP NOT NULL,
    stadium VARCHAR(150),
    status match_status NOT NULL,
    home_score INT DEFAULT 0 CHECK (home_score >= 0),
    away_score INT DEFAULT 0 CHECK (away_score >= 0),
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

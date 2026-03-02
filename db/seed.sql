-- Sample Data for World Cup 2026
-- Insert after running schema.sql

-- Insert Competition
INSERT INTO competition (name, year) VALUES ('FIFA World Cup', 2026);

-- Insert Phases
INSERT INTO phase (name, type, display_order, competition_id) VALUES
('Phase de Groupes', 'GROUP_STAGE', 1, 1),
('Huitièmes de Finale', 'ROUND_OF_16', 2, 1),
('Quarts de Finale', 'QUARTER_FINALS', 3, 1),
('Demi-Finales', 'SEMI_FINALS', 4, 1),
('Finale', 'FINAL', 5, 1);

-- Insert Groups for Group Stage
INSERT INTO group_stage (name, phase_id) VALUES
('A', 1),
('B', 1),
('C', 1),
('D', 1),
('E', 1),
('F', 1),
('G', 1),
('H', 1);

-- Insert Teams (top 32 teams)
INSERT INTO team (name, code, flag_url) VALUES
('France', 'FRA', 'https://flagcdn.com/fr.svg'),
('Brésil', 'BRA', 'https://flagcdn.com/br.svg'),
('Argentine', 'ARG', 'https://flagcdn.com/ar.svg'),
('Allemagne', 'GER', 'https://flagcdn.com/de.svg'),
('Espagne', 'ESP', 'https://flagcdn.com/es.svg'),
('Portugal', 'POR', 'https://flagcdn.com/pt.svg'),
('Belgique', 'BEL', 'https://flagcdn.com/be.svg'),
('Pays-Bas', 'NED', 'https://flagcdn.com/nl.svg'),
('Angleterre', 'ENG', 'https://flagcdn.com/gb-eng.svg'),
('Croatie', 'CRO', 'https://flagcdn.com/hr.svg'),
('Mexique', 'MEX', 'https://flagcdn.com/mx.svg'),
('Uruguay', 'URU', 'https://flagcdn.com/uy.svg'),
('Suisse', 'SUI', 'https://flagcdn.com/ch.svg'),
('Danemark', 'DEN', 'https://flagcdn.com/dk.svg'),
('États-Unis', 'USA', 'https://flagcdn.com/us.svg'),
('Sénégal', 'SEN', 'https://flagcdn.com/sn.svg'),
('Japon', 'JPN', 'https://flagcdn.com/jp.svg'),
('Maroc', 'MAR', 'https://flagcdn.com/ma.svg'),
('Corée du Sud', 'KOR', 'https://flagcdn.com/kr.svg'),
('Pologne', 'POL', 'https://flagcdn.com/pl.svg'),
('Serbie', 'SRB', 'https://flagcdn.com/rs.svg'),
('Australie', 'AUS', 'https://flagcdn.com/au.svg'),
('Cameroun', 'CMR', 'https://flagcdn.com/cm.svg'),
('Canada', 'CAN', 'https://flagcdn.com/ca.svg'),
('Ghana', 'GHA', 'https://flagcdn.com/gh.svg'),
('Équateur', 'ECU', 'https://flagcdn.com/ec.svg'),
('Tunisie', 'TUN', 'https://flagcdn.com/tn.svg'),
('Iran', 'IRN', 'https://flagcdn.com/ir.svg'),
('Costa Rica', 'CRC', 'https://flagcdn.com/cr.svg'),
('Qatar', 'QAT', 'https://flagcdn.com/qa.svg'),
('Arabie Saoudite', 'KSA', 'https://flagcdn.com/sa.svg'),
('Pays de Galles', 'WAL', 'https://flagcdn.com/gb-wls.svg');

-- Sample Group Stage Matches (Group A)
INSERT INTO match (match_datetime, location, status, home_score, away_score, phase_id, group_id, home_team_id, away_team_id) VALUES
('2026-06-11 17:00:00', 'Stade Azteca, Mexico City', 'SCHEDULED', 0, 0, 1, 1, 1, 16),
('2026-06-11 20:00:00', 'Stade Azteca, Mexico City', 'SCHEDULED', 0, 0, 1, 1, 2, 18),
('2026-06-16 14:00:00', 'Stade Azteca, Mexico City', 'SCHEDULED', 0, 0, 1, 1, 1, 2),
('2026-06-16 17:00:00', 'Stade Azteca, Mexico City', 'SCHEDULED', 0, 0, 1, 1, 16, 18),
('2026-06-20 16:00:00', 'Stade Azteca, Mexico City', 'SCHEDULED', 0, 0, 1, 1, 18, 1),
('2026-06-20 16:00:00', 'Stade Azteca, Mexico City', 'SCHEDULED', 0, 0, 1, 1, 16, 2);

-- Sample Group Standings (Group A - initial state)
INSERT INTO group_standing (group_id, team_id, points, played, won, drawn, lost, goals_for, goals_against, rank) VALUES
(1, 1, 0, 0, 0, 0, 0, 0, 0, 1),  -- France
(1, 16, 0, 0, 0, 0, 0, 0, 0, 2), -- Sénégal
(1, 2, 0, 0, 0, 0, 0, 0, 0, 3),  -- Brésil
(1, 18, 0, 0, 0, 0, 0, 0, 0, 4); -- Maroc

-- Example: Update a match to LIVE with scores
-- UPDATE match SET status = 'LIVE', home_score = 2, away_score = 1 WHERE match_id = 1;

-- Example: Finalize a match
-- UPDATE match SET status = 'FINISHED', home_score = 3, away_score = 1 WHERE match_id = 1;

-- Example: Update standings after a match (France 3-1 Sénégal)
-- UPDATE group_standing SET 
--   points = 3, played = 1, won = 1, goals_for = 3, goals_against = 1
-- WHERE group_id = 1 AND team_id = 1;
-- 
-- UPDATE group_standing SET 
--   points = 0, played = 1, lost = 1, goals_for = 1, goals_against = 3
-- WHERE group_id = 1 AND team_id = 16;

-- Insérer la compétition
INSERT INTO competition (name, year_competition)
VALUES ('World Cup 2026', 2026);

-- Insérer la phase de groupes
INSERT INTO phase (name, type, display_order, competition_id)
VALUES ('Group Stage', 'GROUP_STAGE', 1, 1);

-- Insérer les groupes
INSERT INTO group_stage (name, phase_id)
VALUES 
('A', 1),
('B', 1);


INSERT INTO team (name, code, flag_url) VALUES
('France', 'FRA', 'https://flagcdn.com/fr.svg'),
('Brazil', 'BRA', 'https://flagcdn.com/br.svg'),
('Germany', 'GER', 'https://flagcdn.com/de.svg'),
('Argentina', 'ARG', 'https://flagcdn.com/ar.svg'),
('Spain', 'ESP', 'https://flagcdn.com/es.svg'),
('England', 'ENG', 'https://flagcdn.com/gb.svg'),
('Italy', 'ITA', 'https://flagcdn.com/it.svg'),
('Portugal', 'POR', 'https://flagcdn.com/pt.svg');


INSERT INTO group_standing (group_id, team_id)
VALUES
(1, 1),
(1, 2),
(1, 3),
(1, 4),
(2, 5),
(2, 6),
(2, 7),
(2, 8);


INSERT INTO match 
(match_datetime, stadium, status, phase_id, group_id, home_team_id, away_team_id)
VALUES
('2026-06-10 18:00:00', 'Stadium A', 'SCHEDULED', 1, 1, 1, 2),
('2026-06-11 18:00:00', 'Stadium A', 'SCHEDULED', 1, 1, 3, 4),
('2026-06-12 18:00:00', 'Stadium B', 'SCHEDULED', 1, 2, 5, 6),
('2026-06-13 18:00:00', 'Stadium B', 'SCHEDULED', 1, 2, 7, 8);
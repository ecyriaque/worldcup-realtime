

-- 1) Competition
INSERT INTO competition (name, year_competition)
VALUES ('FIFA World Cup 2026', 2026);

-- 2) Phases 
INSERT INTO phase (name, type, display_order, competition_id) VALUES
('Group Stage',   'GROUP_STAGE', 1, 1),
('Round of 32',   'ROUND_OF_32', 2, 1),
('Round of 16',   'ROUND_OF_16', 3, 1),
('Quarter Finals','QUARTER_FINAL', 4, 1),
('Semi Finals',   'SEMI_FINAL', 5, 1),
('Third Place',   'THIRD_PLACE', 6, 1),
('Final',         'FINAL', 7, 1);

-- 3) Groups (A-L) for Group Stage (phase_id = 1)
INSERT INTO group_stage (name, phase_id) VALUES
('A', 1), ('B', 1), ('C', 1), ('D', 1),
('E', 1), ('F', 1), ('G', 1), ('H', 1),
('I', 1), ('J', 1), ('K', 1), ('L', 1);

-- 4) Teams (48) - realistic selection for dev seed
-- flag_url uses flagcdn alpha-2 (lowercase)
INSERT INTO team (name, code, flag_url) VALUES
-- Hosts
('United States', 'USA', 'https://flagcdn.com/us.svg'),
('Canada', 'CAN', 'https://flagcdn.com/ca.svg'),
('Mexico', 'MEX', 'https://flagcdn.com/mx.svg'),

-- CONMEBOL
('Argentina', 'ARG', 'https://flagcdn.com/ar.svg'),
('Brazil', 'BRA', 'https://flagcdn.com/br.svg'),
('Uruguay', 'URU', 'https://flagcdn.com/uy.svg'),
('Colombia', 'COL', 'https://flagcdn.com/co.svg'),
('Chile', 'CHI', 'https://flagcdn.com/cl.svg'),
('Ecuador', 'ECU', 'https://flagcdn.com/ec.svg'),

-- UEFA
('France', 'FRA', 'https://flagcdn.com/fr.svg'),
('England', 'ENG', 'https://flagcdn.com/gb.svg'),
('Spain', 'ESP', 'https://flagcdn.com/es.svg'),
('Germany', 'GER', 'https://flagcdn.com/de.svg'),
('Portugal', 'POR', 'https://flagcdn.com/pt.svg'),
('Netherlands', 'NED', 'https://flagcdn.com/nl.svg'),
('Belgium', 'BEL', 'https://flagcdn.com/be.svg'),
('Italy', 'ITA', 'https://flagcdn.com/it.svg'),
('Croatia', 'CRO', 'https://flagcdn.com/hr.svg'),
('Switzerland', 'SUI', 'https://flagcdn.com/ch.svg'),
('Denmark', 'DEN', 'https://flagcdn.com/dk.svg'),
('Austria', 'AUT', 'https://flagcdn.com/at.svg'),
('Poland', 'POL', 'https://flagcdn.com/pl.svg'),
('Serbia', 'SRB', 'https://flagcdn.com/rs.svg'),
('Sweden', 'SWE', 'https://flagcdn.com/se.svg'),
('Norway', 'NOR', 'https://flagcdn.com/no.svg'),

-- AFC
('Japan', 'JPN', 'https://flagcdn.com/jp.svg'),
('South Korea', 'KOR', 'https://flagcdn.com/kr.svg'),
('Iran', 'IRN', 'https://flagcdn.com/ir.svg'),
('Saudi Arabia', 'KSA', 'https://flagcdn.com/sa.svg'),
('Qatar', 'QAT', 'https://flagcdn.com/qa.svg'),
('Australia', 'AUS', 'https://flagcdn.com/au.svg'),
('Uzbekistan', 'UZB', 'https://flagcdn.com/uz.svg'),
('Jordan', 'JOR', 'https://flagcdn.com/jo.svg'),

-- CAF
('Senegal', 'SEN', 'https://flagcdn.com/sn.svg'),
('Morocco', 'MAR', 'https://flagcdn.com/ma.svg'),
('Egypt', 'EGY', 'https://flagcdn.com/eg.svg'),
('Tunisia', 'TUN', 'https://flagcdn.com/tn.svg'),
('Algeria', 'ALG', 'https://flagcdn.com/dz.svg'),
('Nigeria', 'NGA', 'https://flagcdn.com/ng.svg'),
('Ghana', 'GHA', 'https://flagcdn.com/gh.svg'),
('Cameroon', 'CMR', 'https://flagcdn.com/cm.svg'),
('Ivory Coast', 'CIV', 'https://flagcdn.com/ci.svg'),
('South Africa', 'RSA', 'https://flagcdn.com/za.svg'),

-- CONCACAF (besides hosts)
('Costa Rica', 'CRC', 'https://flagcdn.com/cr.svg'),
('Panama', 'PAN', 'https://flagcdn.com/pa.svg'),
('Jamaica', 'JAM', 'https://flagcdn.com/jm.svg'),
('Haiti', 'HAI', 'https://flagcdn.com/ht.svg'),


-- OFC
('New Zealand', 'NZL', 'https://flagcdn.com/nz.svg');

-- ---------------------------------------------------------
-- 5) Group standings initialization (12 groups x 4 teams)
-- We map groups by name and teams by code
-- ---------------------------------------------------------

-- Group A
INSERT INTO group_standing (group_id, team_id)
SELECT g.group_id, t.team_id FROM group_stage g, team t
WHERE g.name='A' AND t.code IN ('USA','FRA','SEN','JPN');

-- Group B
INSERT INTO group_standing (group_id, team_id)
SELECT g.group_id, t.team_id FROM group_stage g, team t
WHERE g.name='B' AND t.code IN ('MEX','BRA','MAR','KOR');

-- Group C
INSERT INTO group_standing (group_id, team_id)
SELECT g.group_id, t.team_id FROM group_stage g, team t
WHERE g.name='C' AND t.code IN ('CAN','ARG','DEN','EGY');

-- Group D
INSERT INTO group_standing (group_id, team_id)
SELECT g.group_id, t.team_id FROM group_stage g, team t
WHERE g.name='D' AND t.code IN ('ENG','URU','TUN','IRN');

-- Group E
INSERT INTO group_standing (group_id, team_id)
SELECT g.group_id, t.team_id FROM group_stage g, team t
WHERE g.name='E' AND t.code IN ('ESP','COL','NGA','AUS');

-- Group F
INSERT INTO group_standing (group_id, team_id)
SELECT g.group_id, t.team_id FROM group_stage g, team t
WHERE g.name='F' AND t.code IN ('GER','ECU','CMR','QAT');

-- Group G
INSERT INTO group_standing (group_id, team_id)
SELECT g.group_id, t.team_id FROM group_stage g, team t
WHERE g.name='G' AND t.code IN ('POR','CHI','GHA','NZL');

-- Group H
INSERT INTO group_standing (group_id, team_id)
SELECT g.group_id, t.team_id FROM group_stage g, team t
WHERE g.name='H' AND t.code IN ('NED','CRO','ALG','CRC');

-- Group I
INSERT INTO group_standing (group_id, team_id)
SELECT g.group_id, t.team_id FROM group_stage g, team t
WHERE g.name='I' AND t.code IN ('BEL','SUI','CIV','PAN');

-- Group J
INSERT INTO group_standing (group_id, team_id)
SELECT g.group_id, t.team_id FROM group_stage g, team t
WHERE g.name='J' AND t.code IN ('ITA','POL','RSA','JAM');

-- Group K
INSERT INTO group_standing (group_id, team_id)
SELECT g.group_id, t.team_id FROM group_stage g, team t
WHERE g.name='K' AND t.code IN ('SWE','SRB','HAI','NGA');

-- Group L
INSERT INTO group_standing (group_id, team_id)
SELECT g.group_id, t.team_id FROM group_stage g, team t
WHERE g.name='L' AND t.code IN ('AUT','NOR','UZB','JOR');

-- ---------------------------------------------------------
-- 6) Matches - "Matchday 1" sample (2 matches per group => 24 matches)
-- Using phase_id = Group Stage (1)
-- stadium names aligned with host venues/cities list (USA/Canada/Mexico)
-- ---------------------------------------------------------

-- Helper: match insert with subqueries for IDs
-- NOTE: home_score/away_score defaults to 0, updated_at default is CURRENT_TIMESTAMP

-- GROUP A (USA, FRA, SEN, JPN)
INSERT INTO match (match_datetime, stadium, status, phase_id, group_id, home_team_id, away_team_id)
VALUES
('2026-06-11 18:00:00','Estadio Azteca, Mexico City','SCHEDULED',1,(SELECT group_id FROM group_stage WHERE name='A'),
 (SELECT team_id FROM team WHERE code='USA'),(SELECT team_id FROM team WHERE code='JPN')),
('2026-06-11 21:00:00','Estadio Azteca, Mexico City','SCHEDULED',1,(SELECT group_id FROM group_stage WHERE name='A'),
 (SELECT team_id FROM team WHERE code='FRA'),(SELECT team_id FROM team WHERE code='SEN'));

-- GROUP B
INSERT INTO match (match_datetime, stadium, status, phase_id, group_id, home_team_id, away_team_id)
VALUES
('2026-06-12 18:00:00','SoFi Stadium, Los Angeles','SCHEDULED',1,(SELECT group_id FROM group_stage WHERE name='B'),
 (SELECT team_id FROM team WHERE code='MEX'),(SELECT team_id FROM team WHERE code='KOR')),
('2026-06-12 21:00:00','SoFi Stadium, Los Angeles','SCHEDULED',1,(SELECT group_id FROM group_stage WHERE name='B'),
 (SELECT team_id FROM team WHERE code='BRA'),(SELECT team_id FROM team WHERE code='MAR'));

-- GROUP C
INSERT INTO match (match_datetime, stadium, status, phase_id, group_id, home_team_id, away_team_id)
VALUES
('2026-06-13 18:00:00','BMO Field, Toronto','SCHEDULED',1,(SELECT group_id FROM group_stage WHERE name='C'),
 (SELECT team_id FROM team WHERE code='CAN'),(SELECT team_id FROM team WHERE code='EGY')),
('2026-06-13 21:00:00','BMO Field, Toronto','SCHEDULED',1,(SELECT group_id FROM group_stage WHERE name='C'),
 (SELECT team_id FROM team WHERE code='ARG'),(SELECT team_id FROM team WHERE code='DEN'));

-- GROUP D
INSERT INTO match (match_datetime, stadium, status, phase_id, group_id, home_team_id, away_team_id)
VALUES
('2026-06-14 18:00:00','MetLife Stadium, New York/New Jersey','SCHEDULED',1,(SELECT group_id FROM group_stage WHERE name='D'),
 (SELECT team_id FROM team WHERE code='ENG'),(SELECT team_id FROM team WHERE code='IRN')),
('2026-06-14 21:00:00','MetLife Stadium, New York/New Jersey','SCHEDULED',1,(SELECT group_id FROM group_stage WHERE name='D'),
 (SELECT team_id FROM team WHERE code='URU'),(SELECT team_id FROM team WHERE code='TUN'));

-- GROUP E
INSERT INTO match (match_datetime, stadium, status, phase_id, group_id, home_team_id, away_team_id)
VALUES
('2026-06-15 18:00:00','AT&T Stadium, Dallas','SCHEDULED',1,(SELECT group_id FROM group_stage WHERE name='E'),
 (SELECT team_id FROM team WHERE code='ESP'),(SELECT team_id FROM team WHERE code='AUS')),
('2026-06-15 21:00:00','AT&T Stadium, Dallas','SCHEDULED',1,(SELECT group_id FROM group_stage WHERE name='E'),
 (SELECT team_id FROM team WHERE code='COL'),(SELECT team_id FROM team WHERE code='NGA'));

-- GROUP F
INSERT INTO match (match_datetime, stadium, status, phase_id, group_id, home_team_id, away_team_id)
VALUES
('2026-06-16 18:00:00','NRG Stadium, Houston','SCHEDULED',1,(SELECT group_id FROM group_stage WHERE name='F'),
 (SELECT team_id FROM team WHERE code='GER'),(SELECT team_id FROM team WHERE code='QAT')),
('2026-06-16 21:00:00','NRG Stadium, Houston','SCHEDULED',1,(SELECT group_id FROM group_stage WHERE name='F'),
 (SELECT team_id FROM team WHERE code='ECU'),(SELECT team_id FROM team WHERE code='CMR'));

-- GROUP G
INSERT INTO match (match_datetime, stadium, status, phase_id, group_id, home_team_id, away_team_id)
VALUES
('2026-06-17 18:00:00','Hard Rock Stadium, Miami','SCHEDULED',1,(SELECT group_id FROM group_stage WHERE name='G'),
 (SELECT team_id FROM team WHERE code='POR'),(SELECT team_id FROM team WHERE code='NZL')),
('2026-06-17 21:00:00','Hard Rock Stadium, Miami','SCHEDULED',1,(SELECT group_id FROM group_stage WHERE name='G'),
 (SELECT team_id FROM team WHERE code='CHI'),(SELECT team_id FROM team WHERE code='GHA'));

-- GROUP H
INSERT INTO match (match_datetime, stadium, status, phase_id, group_id, home_team_id, away_team_id)
VALUES
('2026-06-18 18:00:00','Levi''s Stadium, San Francisco Bay Area','SCHEDULED',1,(SELECT group_id FROM group_stage WHERE name='H'),
 (SELECT team_id FROM team WHERE code='NED'),(SELECT team_id FROM team WHERE code='CRC')),
('2026-06-18 21:00:00','Levi''s Stadium, San Francisco Bay Area','SCHEDULED',1,(SELECT group_id FROM group_stage WHERE name='H'),
 (SELECT team_id FROM team WHERE code='CRO'),(SELECT team_id FROM team WHERE code='ALG'));

-- GROUP I
INSERT INTO match (match_datetime, stadium, status, phase_id, group_id, home_team_id, away_team_id)
VALUES
('2026-06-19 18:00:00','BC Place, Vancouver','SCHEDULED',1,(SELECT group_id FROM group_stage WHERE name='I'),
 (SELECT team_id FROM team WHERE code='BEL'),(SELECT team_id FROM team WHERE code='PAN')),
('2026-06-19 21:00:00','BC Place, Vancouver','SCHEDULED',1,(SELECT group_id FROM group_stage WHERE name='I'),
 (SELECT team_id FROM team WHERE code='SUI'),(SELECT team_id FROM team WHERE code='CIV'));

-- GROUP J
INSERT INTO match (match_datetime, stadium, status, phase_id, group_id, home_team_id, away_team_id)
VALUES
('2026-06-20 18:00:00','Mercedes-Benz Stadium, Atlanta','SCHEDULED',1,(SELECT group_id FROM group_stage WHERE name='J'),
 (SELECT team_id FROM team WHERE code='ITA'),(SELECT team_id FROM team WHERE code='JAM')),
('2026-06-20 21:00:00','Mercedes-Benz Stadium, Atlanta','SCHEDULED',1,(SELECT group_id FROM group_stage WHERE name='J'),
 (SELECT team_id FROM team WHERE code='POL'),(SELECT team_id FROM team WHERE code='RSA'));

-- GROUP K
INSERT INTO match (match_datetime, stadium, status, phase_id, group_id, home_team_id, away_team_id)
VALUES
('2026-06-21 18:00:00','Lincoln Financial Field, Philadelphia','SCHEDULED',1,(SELECT group_id FROM group_stage WHERE name='K'),
 (SELECT team_id FROM team WHERE code='SWE'),(SELECT team_id FROM team WHERE code='HAI')),
('2026-06-21 21:00:00','Lincoln Financial Field, Philadelphia','SCHEDULED',1,(SELECT group_id FROM group_stage WHERE name='K'),
 (SELECT team_id FROM team WHERE code='SRB'),(SELECT team_id FROM team WHERE code='CPV'));

-- GROUP L
INSERT INTO match (match_datetime, stadium, status, phase_id, group_id, home_team_id, away_team_id)
VALUES
('2026-06-22 18:00:00','Lumen Field, Seattle','SCHEDULED',1,(SELECT group_id FROM group_stage WHERE name='L'),
 (SELECT team_id FROM team WHERE code='AUT'),(SELECT team_id FROM team WHERE code='JOR')),
('2026-06-22 21:00:00','Lumen Field, Seattle','SCHEDULED',1,(SELECT group_id FROM group_stage WHERE name='L'),
 (SELECT team_id FROM team WHERE code='NOR'),(SELECT team_id FROM team WHERE code='UZB'));
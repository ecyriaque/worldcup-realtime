BEGIN;

-- 0) Clean (optional). Comment out if you don't want to reset.
TRUNCATE TABLE match RESTART IDENTITY CASCADE;
TRUNCATE TABLE group_standing RESTART IDENTITY CASCADE;
TRUNCATE TABLE group_stage RESTART IDENTITY CASCADE;
TRUNCATE TABLE phase RESTART IDENTITY CASCADE;
TRUNCATE TABLE team RESTART IDENTITY CASCADE;
TRUNCATE TABLE competition RESTART IDENTITY CASCADE;

-- 1) Competition
INSERT INTO competition (name, year_competition)
VALUES ('FIFA World Cup 2026', 2026);

-- 2) Phases (must match ENUM phase_type)
INSERT INTO phase (name, type, display_order, competition_id) VALUES
('Group Stage',    'GROUP_STAGE',   1, 1),
('Round of 32',    'ROUND_OF_32',   2, 1),
('Round of 16',    'ROUND_OF_16',   3, 1),
('Quarter Finals', 'QUARTER_FINAL', 4, 1),
('Semi Finals',    'SEMI_FINAL',    5, 1),
('Third Place',    'THIRD_PLACE',   6, 1),
('Final',          'FINAL',         7, 1);

-- 3) Groups (A-L) for Group Stage (phase_id = 1)
INSERT INTO group_stage (name, phase_id) VALUES
('A', 1), ('B', 1), ('C', 1), ('D', 1),
('E', 1), ('F', 1), ('G', 1), ('H', 1),
('I', 1), ('J', 1), ('K', 1), ('L', 1);

-- 4) Teams (48) - realistic selection for development/simulation
-- flag_url uses flagcdn alpha-2 when possible. For non-standard codes (ENG, etc.), we still keep a URL for display.
INSERT INTO team (name, code, flag_url) VALUES
-- Hosts (CONCACAF)
('United States', 'USA', 'https://flagcdn.com/us.svg'),
('Canada', 'CAN', 'https://flagcdn.com/ca.svg'),
('Mexico', 'MEX', 'https://flagcdn.com/mx.svg'),

-- CONMEBOL (6)
('Argentina', 'ARG', 'https://flagcdn.com/ar.svg'),
('Brazil', 'BRA', 'https://flagcdn.com/br.svg'),
('Uruguay', 'URU', 'https://flagcdn.com/uy.svg'),
('Colombia', 'COL', 'https://flagcdn.com/co.svg'),
('Chile', 'CHI', 'https://flagcdn.com/cl.svg'),
('Ecuador', 'ECU', 'https://flagcdn.com/ec.svg'),

-- UEFA (16)
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

-- AFC (8)
('Japan', 'JPN', 'https://flagcdn.com/jp.svg'),
('South Korea', 'KOR', 'https://flagcdn.com/kr.svg'),
('Iran', 'IRN', 'https://flagcdn.com/ir.svg'),
('Saudi Arabia', 'KSA', 'https://flagcdn.com/sa.svg'),
('Qatar', 'QAT', 'https://flagcdn.com/qa.svg'),
('Australia', 'AUS', 'https://flagcdn.com/au.svg'),
('Uzbekistan', 'UZB', 'https://flagcdn.com/uz.svg'),
('Jordan', 'JOR', 'https://flagcdn.com/jo.svg'),

-- CAF (9)
('Senegal', 'SEN', 'https://flagcdn.com/sn.svg'),
('Morocco', 'MAR', 'https://flagcdn.com/ma.svg'),
('Egypt', 'EGY', 'https://flagcdn.com/eg.svg'),
('Tunisia', 'TUN', 'https://flagcdn.com/tn.svg'),
('Algeria', 'ALG', 'https://flagcdn.com/dz.svg'),
('Nigeria', 'NGA', 'https://flagcdn.com/ng.svg'),
('Ghana', 'GHA', 'https://flagcdn.com/gh.svg'),
('Cameroon', 'CMR', 'https://flagcdn.com/cm.svg'),
('Ivory Coast', 'CIV', 'https://flagcdn.com/ci.svg'),

-- CONCACAF (additional 3 to reach 6 total incl hosts)
('Costa Rica', 'CRC', 'https://flagcdn.com/cr.svg'),
('Panama', 'PAN', 'https://flagcdn.com/pa.svg'),
('Jamaica', 'JAM', 'https://flagcdn.com/jm.svg'),

-- OFC (1)
('New Zealand', 'NZL', 'https://flagcdn.com/nz.svg'),

-- Intercontinental playoff style additions (2)
('Turkey', 'TUR', 'https://flagcdn.com/tr.svg'),
('Ukraine', 'UKR', 'https://flagcdn.com/ua.svg');

-- ---- Sanity check: must be 48
-- SELECT COUNT(*) AS team_count FROM team;

-- 5) Assign teams to groups (A-L), 4 teams each
-- We use a deterministic mapping by code.
CREATE TEMP TABLE tmp_group_team (
  group_name VARCHAR(5) NOT NULL,
  slot INT NOT NULL CHECK (slot BETWEEN 1 AND 4),
  team_code VARCHAR(10) NOT NULL
) ON COMMIT DROP;

INSERT INTO tmp_group_team (group_name, slot, team_code) VALUES
('A',1,'USA'), ('A',2,'FRA'), ('A',3,'SEN'), ('A',4,'JPN'),
('B',1,'MEX'), ('B',2,'BRA'), ('B',3,'MAR'), ('B',4,'KOR'),
('C',1,'CAN'), ('C',2,'ARG'), ('C',3,'DEN'), ('C',4,'EGY'),
('D',1,'ENG'), ('D',2,'URU'), ('D',3,'TUN'), ('D',4,'IRN'),
('E',1,'ESP'), ('E',2,'COL'), ('E',3,'NGA'), ('E',4,'AUS'),
('F',1,'GER'), ('F',2,'ECU'), ('F',3,'CMR'), ('F',4,'QAT'),
('G',1,'POR'), ('G',2,'CHI'), ('G',3,'GHA'), ('G',4,'NZL'),
('H',1,'NED'), ('H',2,'CRO'), ('H',3,'ALG'), ('H',4,'CRC'),
('I',1,'BEL'), ('I',2,'SUI'), ('I',3,'CIV'), ('I',4,'PAN'),
('J',1,'ITA'), ('J',2,'POL'), ('J',3,'JAM'), ('J',4,'KSA'),
('K',1,'SWE'), ('K',2,'SRB'), ('K',3,'AUT'), ('K',4,'UKR'),
('L',1,'NOR'), ('L',2,'TUR'), ('L',3,'UZB'), ('L',4,'JOR');

-- Insert standings initial rows (0 everywhere, computed later)
INSERT INTO group_standing (group_id, team_id)
SELECT g.group_id, t.team_id
FROM tmp_group_team gt
JOIN group_stage g ON g.name = gt.group_name
JOIN team t ON t.code = gt.team_code;

-- 6) Insert full GROUP STAGE matches (6 per group) with FINISHED results.
-- Pairings for 4-team group (slots 1..4):
--  M1: 1 vs 2
--  M2: 3 vs 4
--  M3: 1 vs 3
--  M4: 2 vs 4
--  M5: 1 vs 4
--  M6: 2 vs 3
--
-- Scores are deterministic, "realistic-ish", and differ per group.

CREATE TEMP TABLE tmp_group_scores (
  group_name VARCHAR(5),
  match_no INT,
  home_goals INT,
  away_goals INT
) ON COMMIT DROP;

-- 12 groups x 6 matches = 72 lines
INSERT INTO tmp_group_scores VALUES
('A',1,2,1), ('A',2,1,1), ('A',3,1,0), ('A',4,2,2), ('A',5,3,0), ('A',6,0,1),
('B',1,1,1), ('B',2,2,1), ('B',3,0,1), ('B',4,2,0), ('B',5,1,0), ('B',6,2,2),
('C',1,2,0), ('C',2,1,2), ('C',3,1,1), ('C',4,0,0), ('C',5,2,2), ('C',6,3,1),
('D',1,1,0), ('D',2,2,2), ('D',3,0,1), ('D',4,1,1), ('D',5,2,0), ('D',6,1,3),
('E',1,2,1), ('E',2,0,0), ('E',3,1,1), ('E',4,2,1), ('E',5,1,0), ('E',6,2,2),
('F',1,3,1), ('F',2,1,0), ('F',3,2,2), ('F',4,0,1), ('F',5,2,0), ('F',6,1,1),
('G',1,1,0), ('G',2,2,1), ('G',3,0,0), ('G',4,3,2), ('G',5,2,2), ('G',6,1,0),
('H',1,2,0), ('H',2,1,1), ('H',3,1,2), ('H',4,0,0), ('H',5,3,1), ('H',6,2,2),
('I',1,1,1), ('I',2,2,0), ('I',3,0,1), ('I',4,1,2), ('I',5,2,1), ('I',6,1,1),
('J',1,2,0), ('J',2,1,1), ('J',3,1,0), ('J',4,2,2), ('J',5,0,0), ('J',6,3,1),
('K',1,1,1), ('K',2,2,0), ('K',3,0,1), ('K',4,1,0), ('K',5,2,2), ('K',6,1,3),
('L',1,0,0), ('L',2,2,1), ('L',3,1,2), ('L',4,2,2), ('L',5,3,1), ('L',6,0,1);

-- Venues rotation (host-like)
CREATE TEMP TABLE tmp_venues (idx INT, stadium VARCHAR(150)) ON COMMIT DROP;
INSERT INTO tmp_venues VALUES
(1,'Estadio Azteca, Mexico City'),
(2,'SoFi Stadium, Los Angeles'),
(3,'MetLife Stadium, New York/New Jersey'),
(4,'AT&T Stadium, Dallas'),
(5,'NRG Stadium, Houston'),
(6,'Hard Rock Stadium, Miami'),
(7,'Levi''s Stadium, San Francisco Bay Area'),
(8,'BC Place, Vancouver'),
(9,'BMO Field, Toronto'),
(10,'Mercedes-Benz Stadium, Atlanta'),
(11,'Lincoln Financial Field, Philadelphia'),
(12,'Lumen Field, Seattle');

-- Build group matches using the group slots mapping
WITH g AS (
  SELECT
    gt.group_name,
    (SELECT group_id FROM group_stage WHERE name = gt.group_name) AS group_id,
    MAX(CASE WHEN gt.slot=1 THEN t.team_id END) AS t1,
    MAX(CASE WHEN gt.slot=2 THEN t.team_id END) AS t2,
    MAX(CASE WHEN gt.slot=3 THEN t.team_id END) AS t3,
    MAX(CASE WHEN gt.slot=4 THEN t.team_id END) AS t4
  FROM tmp_group_team gt
  JOIN team t ON t.code = gt.team_code
  GROUP BY gt.group_name
),
pairs AS (
  SELECT group_name, group_id, 1 AS match_no, t1 AS home_id, t2 AS away_id FROM g
  UNION ALL SELECT group_name, group_id, 2, t3, t4 FROM g
  UNION ALL SELECT group_name, group_id, 3, t1, t3 FROM g
  UNION ALL SELECT group_name, group_id, 4, t2, t4 FROM g
  UNION ALL SELECT group_name, group_id, 5, t1, t4 FROM g
  UNION ALL SELECT group_name, group_id, 6, t2, t3 FROM g
),
with_scores AS (
  SELECT
    p.group_name, p.group_id, p.match_no, p.home_id, p.away_id,
    s.home_goals, s.away_goals
  FROM pairs p
  JOIN tmp_group_scores s
    ON s.group_name = p.group_name AND s.match_no = p.match_no
),
with_meta AS (
  SELECT
    ws.*,
    -- spread dates per group deterministically
    (TIMESTAMP '2026-06-11 18:00:00'
      + ((ASCII(ws.group_name) - ASCII('A')) * INTERVAL '1 day')
      + ((ws.match_no - 1) * INTERVAL '3 hours')
    ) AS match_datetime,
    (SELECT stadium FROM tmp_venues v WHERE v.idx = (ASCII(ws.group_name) - ASCII('A') + 1)) AS stadium
  FROM with_scores ws
)
INSERT INTO match (match_datetime, stadium, status, home_score, away_score, phase_id, group_id, home_team_id, away_team_id)
SELECT match_datetime, stadium, 'FINISHED', home_goals, away_goals, 1, group_id, home_id, away_id
FROM with_meta
ORDER BY group_name, match_no;

-- 7) Compute standings from group matches (phase_id = 1)
WITH m AS (
  SELECT
    group_id,
    home_team_id AS team_id,
    home_score AS gf,
    away_score AS ga,
    CASE WHEN home_score > away_score THEN 3 WHEN home_score = away_score THEN 1 ELSE 0 END AS pts,
    CASE WHEN home_score > away_score THEN 1 ELSE 0 END AS w,
    CASE WHEN home_score = away_score THEN 1 ELSE 0 END AS d,
    CASE WHEN home_score < away_score THEN 1 ELSE 0 END AS l
  FROM match
  WHERE phase_id = 1 AND group_id IS NOT NULL

  UNION ALL

  SELECT
    group_id,
    away_team_id AS team_id,
    away_score AS gf,
    home_score AS ga,
    CASE WHEN away_score > home_score THEN 3 WHEN away_score = home_score THEN 1 ELSE 0 END AS pts,
    CASE WHEN away_score > home_score THEN 1 ELSE 0 END AS w,
    CASE WHEN away_score = home_score THEN 1 ELSE 0 END AS d,
    CASE WHEN away_score < home_score THEN 1 ELSE 0 END AS l
  FROM match
  WHERE phase_id = 1 AND group_id IS NOT NULL
),
agg AS (
  SELECT
    group_id,
    team_id,
    COUNT(*) AS played,
    SUM(w) AS wins,
    SUM(d) AS draw,
    SUM(l) AS losses,
    SUM(gf) AS goals_for,
    SUM(ga) AS goals_against,
    SUM(gf) - SUM(ga) AS goal_difference,
    SUM(pts) AS points
  FROM m
  GROUP BY group_id, team_id
)
UPDATE group_standing gs
SET
  played = a.played,
  wins = a.wins,
  draw = a.draw,
  losses = a.losses,
  goals_for = a.goals_for,
  goals_against = a.goals_against,
  goal_difference = a.goal_difference,
  points = a.points,
  updated_at = CURRENT_TIMESTAMP
FROM agg a
WHERE gs.group_id = a.group_id AND gs.team_id = a.team_id;

-- 8) Determine qualified teams for Round of 32:
--   - Top 2 in each group (24)
--   - Best 8 third-placed teams (8)
CREATE TEMP TABLE tmp_group_rank AS
WITH ranked AS (
  SELECT
    gs.group_id,
    g.name AS group_name,
    gs.team_id,
    gs.points,
    gs.goal_difference,
    gs.goals_for,
    ROW_NUMBER() OVER (
      PARTITION BY gs.group_id
      ORDER BY gs.points DESC, gs.goal_difference DESC, gs.goals_for DESC, gs.team_id ASC
    ) AS pos_in_group
  FROM group_standing gs
  JOIN group_stage g ON g.group_id = gs.group_id
)
SELECT * FROM ranked;

CREATE TEMP TABLE tmp_qualified AS
WITH top2 AS (
  SELECT team_id, 1 AS seed_bucket
  FROM tmp_group_rank
  WHERE pos_in_group <= 2
),
thirds AS (
  SELECT team_id, 2 AS seed_bucket
  FROM tmp_group_rank
  WHERE pos_in_group = 3
  ORDER BY points DESC, goal_difference DESC, goals_for DESC, team_id ASC
  LIMIT 8
)
SELECT * FROM top2
UNION ALL
SELECT * FROM thirds;

-- 9) Build bracket by seeding qualified teams deterministically:
-- order by seed_bucket (top2 first), then by team_id to keep it stable.
CREATE TEMP TABLE tmp_seeded AS
SELECT
  team_id,
  ROW_NUMBER() OVER (ORDER BY seed_bucket ASC, team_id ASC) AS seed
FROM tmp_qualified;

-- Round of 32: pair seed 1 vs 32, 2 vs 31, ..., 16 vs 17
CREATE TEMP TABLE tmp_r32_pairs AS
SELECT
  a.seed AS seed_home,
  b.seed AS seed_away,
  a.team_id AS home_team_id,
  b.team_id AS away_team_id
FROM tmp_seeded a
JOIN tmp_seeded b ON b.seed = (33 - a.seed)
WHERE a.seed <= 16
ORDER BY a.seed;

-- Insert Round of 32 matches (phase_id = 2)
WITH ins AS (
  INSERT INTO match (match_datetime, stadium, status, home_score, away_score, phase_id, group_id, home_team_id, away_team_id)
  SELECT
    TIMESTAMP '2026-06-29 18:00:00' + ((seed_home - 1) * INTERVAL '2 hours') AS match_datetime,
    (SELECT stadium FROM tmp_venues v WHERE v.idx = ((seed_home - 1) % 12) + 1) AS stadium,
    'FINISHED',
    CASE WHEN seed_home % 3 = 0 THEN 2 WHEN seed_home % 3 = 1 THEN 1 ELSE 3 END AS home_score,
    CASE WHEN seed_home % 2 = 0 THEN 0 ELSE 1 END AS away_score,
    2,
    NULL,
    home_team_id,
    away_team_id
  FROM tmp_r32_pairs
  RETURNING match_id, home_team_id, away_team_id, home_score, away_score
),
winners AS (
  SELECT
    match_id,
    CASE WHEN home_score >= away_score THEN home_team_id ELSE away_team_id END AS winner_team_id
  FROM ins
)
SELECT 1;

-- Round of 16 from winners of R32 (phase_id = 3)
CREATE TEMP TABLE tmp_r32_winners AS
SELECT
  m.match_id,
  CASE WHEN m.home_score >= m.away_score THEN m.home_team_id ELSE m.away_team_id END AS winner_team_id
FROM match m
WHERE m.phase_id = 2
ORDER BY m.match_id;

CREATE TEMP TABLE tmp_r16_pairs AS
SELECT
  ROW_NUMBER() OVER () AS pair_no,
  w1.winner_team_id AS home_team_id,
  w2.winner_team_id AS away_team_id
FROM (
  SELECT winner_team_id, ROW_NUMBER() OVER (ORDER BY match_id) AS rn
  FROM tmp_r32_winners
) w1
JOIN (
  SELECT winner_team_id, ROW_NUMBER() OVER (ORDER BY match_id) AS rn
  FROM tmp_r32_winners
) w2 ON w2.rn = w1.rn + 1
WHERE w1.rn % 2 = 1
ORDER BY w1.rn;

INSERT INTO match (match_datetime, stadium, status, home_score, away_score, phase_id, group_id, home_team_id, away_team_id)
SELECT
  TIMESTAMP '2026-07-03 18:00:00' + ((pair_no - 1) * INTERVAL '3 hours'),
  (SELECT stadium FROM tmp_venues v WHERE v.idx = ((pair_no - 1) % 12) + 1),
  'FINISHED',
  CASE WHEN pair_no % 2 = 0 THEN 2 ELSE 1 END,
  CASE WHEN pair_no % 2 = 0 THEN 1 ELSE 0 END,
  3,
  NULL,
  home_team_id,
  away_team_id
FROM tmp_r16_pairs;

-- Quarter Finals (phase_id = 4)
CREATE TEMP TABLE tmp_r16_winners AS
SELECT
  m.match_id,
  CASE WHEN m.home_score >= m.away_score THEN m.home_team_id ELSE m.away_team_id END AS winner_team_id
FROM match m
WHERE m.phase_id = 3
ORDER BY m.match_id;

CREATE TEMP TABLE tmp_qf_pairs AS
SELECT
  ROW_NUMBER() OVER () AS pair_no,
  w1.winner_team_id AS home_team_id,
  w2.winner_team_id AS away_team_id
FROM (
  SELECT winner_team_id, ROW_NUMBER() OVER (ORDER BY match_id) AS rn FROM tmp_r16_winners
) w1
JOIN (
  SELECT winner_team_id, ROW_NUMBER() OVER (ORDER BY match_id) AS rn FROM tmp_r16_winners
) w2 ON w2.rn = w1.rn + 1
WHERE w1.rn % 2 = 1
ORDER BY w1.rn;

INSERT INTO match (match_datetime, stadium, status, home_score, away_score, phase_id, group_id, home_team_id, away_team_id)
SELECT
  TIMESTAMP '2026-07-07 18:00:00' + ((pair_no - 1) * INTERVAL '4 hours'),
  (SELECT stadium FROM tmp_venues v WHERE v.idx = ((pair_no - 1) % 12) + 1),
  'FINISHED',
  CASE WHEN pair_no % 2 = 1 THEN 2 ELSE 1 END,
  CASE WHEN pair_no % 2 = 1 THEN 1 ELSE 0 END,
  4,
  NULL,
  home_team_id,
  away_team_id
FROM tmp_qf_pairs;

-- Semi Finals (phase_id = 5)
CREATE TEMP TABLE tmp_qf_winners AS
SELECT
  m.match_id,
  CASE WHEN m.home_score >= m.away_score THEN m.home_team_id ELSE m.away_team_id END AS winner_team_id
FROM match m
WHERE m.phase_id = 4
ORDER BY m.match_id;

CREATE TEMP TABLE tmp_sf_pairs AS
SELECT
  ROW_NUMBER() OVER () AS pair_no,
  w1.winner_team_id AS home_team_id,
  w2.winner_team_id AS away_team_id
FROM (
  SELECT winner_team_id, ROW_NUMBER() OVER (ORDER BY match_id) AS rn FROM tmp_qf_winners
) w1
JOIN (
  SELECT winner_team_id, ROW_NUMBER() OVER (ORDER BY match_id) AS rn FROM tmp_qf_winners
) w2 ON w2.rn = w1.rn + 1
WHERE w1.rn % 2 = 1
ORDER BY w1.rn;

INSERT INTO match (match_datetime, stadium, status, home_score, away_score, phase_id, group_id, home_team_id, away_team_id)
SELECT
  TIMESTAMP '2026-07-11 20:00:00' + ((pair_no - 1) * INTERVAL '1 day'),
  (SELECT stadium FROM tmp_venues v WHERE v.idx = ((pair_no - 1) % 12) + 1),
  'FINISHED',
  1,
  0,
  5,
  NULL,
  home_team_id,
  away_team_id
FROM tmp_sf_pairs;

-- Third Place (phase_id = 6) and Final (phase_id = 7)
-- For SF: we need both winners and losers to create final + 3rd place.
CREATE TEMP TABLE tmp_sf_results AS
SELECT
  match_id,
  home_team_id,
  away_team_id,
  home_score,
  away_score,
  CASE WHEN home_score >= away_score THEN home_team_id ELSE away_team_id END AS winner_team_id,
  CASE WHEN home_score >= away_score THEN away_team_id ELSE home_team_id END AS loser_team_id
FROM match
WHERE phase_id = 5
ORDER BY match_id;

-- Final: winners of SF (2 teams)
INSERT INTO match (match_datetime, stadium, status, home_score, away_score, phase_id, group_id, home_team_id, away_team_id)
SELECT
  TIMESTAMP '2026-07-19 20:00:00',
  'MetLife Stadium, New York/New Jersey',
  'FINISHED',
  2,
  1,
  7,
  NULL,
  (SELECT winner_team_id FROM tmp_sf_results ORDER BY match_id LIMIT 1),
  (SELECT winner_team_id FROM tmp_sf_results ORDER BY match_id OFFSET 1 LIMIT 1);

-- Third place: losers of SF (2 teams)
INSERT INTO match (match_datetime, stadium, status, home_score, away_score, phase_id, group_id, home_team_id, away_team_id)
SELECT
  TIMESTAMP '2026-07-18 20:00:00',
  'AT&T Stadium, Dallas',
  'FINISHED',
  1,
  2,
  6,
  NULL,
  (SELECT loser_team_id FROM tmp_sf_results ORDER BY match_id LIMIT 1),
  (SELECT loser_team_id FROM tmp_sf_results ORDER BY match_id OFFSET 1 LIMIT 1);

COMMIT;

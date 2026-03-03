-- Seed players for teams in the competition
-- Using team codes instead of hardcoded IDs for robustness

-- United States (USA)
INSERT INTO player (team_id, first_name, last_name, jersey_number, position, date_of_birth, nationality) VALUES
((SELECT team_id FROM team WHERE code='USA'), 'Christian', 'Pulisic', 10, 'FORWARD', '1998-09-18', 'United States'),
((SELECT team_id FROM team WHERE code='USA'), 'Weston', 'McKennie', 8, 'MIDFIELDER', '1998-08-28', 'United States'),
((SELECT team_id FROM team WHERE code='USA'), 'Tyler', 'Adams', 4, 'MIDFIELDER', '1999-02-14', 'United States'),
((SELECT team_id FROM team WHERE code='USA'), 'Matt', 'Turner', 1, 'GOALKEEPER', '1994-06-24', 'United States'),
((SELECT team_id FROM team WHERE code='USA'), 'Sergiño', 'Dest', 2, 'DEFENDER', '2000-11-03', 'United States'),
((SELECT team_id FROM team WHERE code='USA'), 'Antonee', 'Robinson', 5, 'DEFENDER', '1997-08-08', 'United States'),
((SELECT team_id FROM team WHERE code='USA'), 'Yunus', 'Musah', 6, 'MIDFIELDER', '2002-11-29', 'United States'),
((SELECT team_id FROM team WHERE code='USA'), 'Gio', 'Reyna', 7, 'MIDFIELDER', '2002-11-13', 'United States'),
((SELECT team_id FROM team WHERE code='USA'), 'Timothy', 'Weah', 21, 'FORWARD', '2000-02-22', 'United States'),
((SELECT team_id FROM team WHERE code='USA'), 'Ricardo', 'Pepi', 9, 'FORWARD', '2003-01-09', 'United States'),
((SELECT team_id FROM team WHERE code='USA'), 'Walker', 'Zimmerman', 3, 'DEFENDER', '1993-05-19', 'United States');

-- France (FRA)
INSERT INTO player (team_id, first_name, last_name, jersey_number, position, date_of_birth, nationality) VALUES
((SELECT team_id FROM team WHERE code='FRA'), 'Kylian', 'Mbappé', 10, 'FORWARD', '1998-12-20', 'France'),
((SELECT team_id FROM team WHERE code='FRA'), 'Antoine', 'Griezmann', 7, 'FORWARD', '1991-03-21', 'France'),
((SELECT team_id FROM team WHERE code='FRA'), 'Aurélien', 'Tchouaméni', 8, 'MIDFIELDER', '2000-01-27', 'France'),
((SELECT team_id FROM team WHERE code='FRA'), 'N''Golo', 'Kanté', 13, 'MIDFIELDER', '1991-03-29', 'France'),
((SELECT team_id FROM team WHERE code='FRA'), 'Hugo', 'Lloris', 1, 'GOALKEEPER', '1986-12-26', 'France'),
((SELECT team_id FROM team WHERE code='FRA'), 'Raphaël', 'Varane', 4, 'DEFENDER', '1993-04-25', 'France'),
((SELECT team_id FROM team WHERE code='FRA'), 'Theo', 'Hernández', 22, 'DEFENDER', '1997-10-06', 'France'),
((SELECT team_id FROM team WHERE code='FRA'), 'Ousmane', 'Dembélé', 11, 'FORWARD', '1997-05-15', 'France'),
((SELECT team_id FROM team WHERE code='FRA'), 'Kingsley', 'Coman', 20, 'FORWARD', '1996-06-13', 'France'),
((SELECT team_id FROM team WHERE code='FRA'), 'Adrien', 'Rabiot', 14, 'MIDFIELDER', '1995-04-03', 'France'),
((SELECT team_id FROM team WHERE code='FRA'), 'Jules', 'Koundé', 5, 'DEFENDER', '1998-11-12', 'France');

-- Brazil (BRA)
INSERT INTO player (team_id, first_name, last_name, jersey_number, position, date_of_birth, nationality) VALUES
((SELECT team_id FROM team WHERE code='BRA'), 'Neymar', 'Jr', 10, 'FORWARD', '1992-02-05', 'Brazil'),
((SELECT team_id FROM team WHERE code='BRA'), 'Vinícius', 'Júnior', 20, 'FORWARD', '2000-07-12', 'Brazil'),
((SELECT team_id FROM team WHERE code='BRA'), 'Casemiro', 'Santos', 5, 'MIDFIELDER', '1992-02-23', 'Brazil'),
((SELECT team_id FROM team WHERE code='BRA'), 'Raphinha', 'Dias', 11, 'FORWARD', '1996-12-14', 'Brazil'),
((SELECT team_id FROM team WHERE code='BRA'), 'Alisson', 'Becker', 1, 'GOALKEEPER', '1992-10-02', 'Brazil'),
((SELECT team_id FROM team WHERE code='BRA'), 'Thiago', 'Silva', 3, 'DEFENDER', '1984-09-22', 'Brazil'),
((SELECT team_id FROM team WHERE code='BRA'), 'Marquinhos', 'Aoás', 4, 'DEFENDER', '1994-05-14', 'Brazil'),
((SELECT team_id FROM team WHERE code='BRA'), 'Lucas', 'Paquetá', 8, 'MIDFIELDER', '1997-08-27', 'Brazil'),
((SELECT team_id FROM team WHERE code='BRA'), 'Gabriel', 'Jesus', 9, 'FORWARD', '1997-04-03', 'Brazil'),
((SELECT team_id FROM team WHERE code='BRA'), 'Rodrygo', 'Goes', 21, 'FORWARD', '2001-01-09', 'Brazil'),
((SELECT team_id FROM team WHERE code='BRA'), 'Danilo', 'Luiz', 2, 'DEFENDER', '1991-07-15', 'Brazil');

-- Argentina (ARG)
INSERT INTO player (team_id, first_name, last_name, jersey_number, position, date_of_birth, nationality) VALUES
((SELECT team_id FROM team WHERE code='ARG'), 'Lionel', 'Messi', 10, 'FORWARD', '1987-06-24', 'Argentina'),
((SELECT team_id FROM team WHERE code='ARG'), 'Ángel', 'Di María', 11, 'FORWARD', '1988-02-14', 'Argentina'),
((SELECT team_id FROM team WHERE code='ARG'), 'Lautaro', 'Martínez', 22, 'FORWARD', '1997-08-22', 'Argentina'),
((SELECT team_id FROM team WHERE code='ARG'), 'Rodrigo', 'De Paul', 7, 'MIDFIELDER', '1994-05-24', 'Argentina'),
((SELECT team_id FROM team WHERE code='ARG'), 'Emiliano', 'Martínez', 23, 'GOALKEEPER', '1992-09-02', 'Argentina'),
((SELECT team_id FROM team WHERE code='ARG'), 'Nicolás', 'Otamendi', 19, 'DEFENDER', '1988-02-12', 'Argentina'),
((SELECT team_id FROM team WHERE code='ARG'), 'Cristian', 'Romero', 13, 'DEFENDER', '1998-04-27', 'Argentina'),
((SELECT team_id FROM team WHERE code='ARG'), 'Leandro', 'Paredes', 5, 'MIDFIELDER', '1994-06-29', 'Argentina'),
((SELECT team_id FROM team WHERE code='ARG'), 'Julián', 'Álvarez', 9, 'FORWARD', '2000-01-31', 'Argentina'),
((SELECT team_id FROM team WHERE code='ARG'), 'Enzo', 'Fernández', 24, 'MIDFIELDER', '2001-01-17', 'Argentina'),
((SELECT team_id FROM team WHERE code='ARG'), 'Marcos', 'Acuña', 8, 'DEFENDER', '1991-10-28', 'Argentina');

-- Portugal (POR)
INSERT INTO player (team_id, first_name, last_name, jersey_number, position, date_of_birth, nationality) VALUES
((SELECT team_id FROM team WHERE code='POR'), 'Cristiano', 'Ronaldo', 7, 'FORWARD', '1985-02-05', 'Portugal'),
((SELECT team_id FROM team WHERE code='POR'), 'Bruno', 'Fernandes', 8, 'MIDFIELDER', '1994-09-08', 'Portugal'),
((SELECT team_id FROM team WHERE code='POR'), 'João', 'Félix', 11, 'FORWARD', '1999-11-10', 'Portugal'),
((SELECT team_id FROM team WHERE code='POR'), 'Bernardo', 'Silva', 10, 'MIDFIELDER', '1994-08-10', 'Portugal'),
((SELECT team_id FROM team WHERE code='POR'), 'Diogo', 'Costa', 1, 'GOALKEEPER', '1999-09-19', 'Portugal'),
((SELECT team_id FROM team WHERE code='POR'), 'Rúben', 'Dias', 3, 'DEFENDER', '1997-05-14', 'Portugal'),
((SELECT team_id FROM team WHERE code='POR'), 'João', 'Cancelo', 20, 'DEFENDER', '1994-05-27', 'Portugal'),
((SELECT team_id FROM team WHERE code='POR'), 'Rafael', 'Leão', 17, 'FORWARD', '1999-06-10', 'Portugal'),
((SELECT team_id FROM team WHERE code='POR'), 'Pepe', 'Ferreira', 4, 'DEFENDER', '1983-02-26', 'Portugal'),
((SELECT team_id FROM team WHERE code='POR'), 'William', 'Carvalho', 14, 'MIDFIELDER', '1992-04-07', 'Portugal'),
((SELECT team_id FROM team WHERE code='POR'), 'Diogo', 'Jota', 21, 'FORWARD', '1996-12-04', 'Portugal');

-- Germany (GER)
INSERT INTO player (team_id, first_name, last_name, jersey_number, position, date_of_birth, nationality) VALUES
((SELECT team_id FROM team WHERE code='GER'), 'Kai', 'Havertz', 7, 'FORWARD', '1999-06-11', 'Germany'),
((SELECT team_id FROM team WHERE code='GER'), 'Joshua', 'Kimmich', 6, 'MIDFIELDER', '1995-02-08', 'Germany'),
((SELECT team_id FROM team WHERE code='GER'), 'Serge', 'Gnabry', 10, 'FORWARD', '1995-07-14', 'Germany'),
((SELECT team_id FROM team WHERE code='GER'), 'Jamal', 'Musiala', 14, 'MIDFIELDER', '2003-02-26', 'Germany'),
((SELECT team_id FROM team WHERE code='GER'), 'Marc-André', 'ter Stegen', 22, 'GOALKEEPER', '1992-04-30', 'Germany'),
((SELECT team_id FROM team WHERE code='GER'), 'Antonio', 'Rüdiger', 2, 'DEFENDER', '1993-03-03', 'Germany'),
((SELECT team_id FROM team WHERE code='GER'), 'Ilkay', 'Gündogan', 21, 'MIDFIELDER', '1990-10-24', 'Germany'),
((SELECT team_id FROM team WHERE code='GER'), 'Thomas', 'Müller', 25, 'FORWARD', '1989-09-13', 'Germany'),
((SELECT team_id FROM team WHERE code='GER'), 'Leroy', 'Sané', 19, 'FORWARD', '1996-01-11', 'Germany'),
((SELECT team_id FROM team WHERE code='GER'), 'Niklas', 'Süle', 15, 'DEFENDER', '1995-09-03', 'Germany'),
((SELECT team_id FROM team WHERE code='GER'), 'Leon', 'Goretzka', 8, 'MIDFIELDER', '1995-02-06', 'Germany');

-- England (ENG)
INSERT INTO player (team_id, first_name, last_name, jersey_number, position, date_of_birth, nationality) VALUES
((SELECT team_id FROM team WHERE code='ENG'), 'Harry', 'Kane', 9, 'FORWARD', '1993-07-28', 'England'),
((SELECT team_id FROM team WHERE code='ENG'), 'Jude', 'Bellingham', 22, 'MIDFIELDER', '2003-06-29', 'England'),
((SELECT team_id FROM team WHERE code='ENG'), 'Phil', 'Foden', 11, 'MIDFIELDER', '2000-05-28', 'England'),
((SELECT team_id FROM team WHERE code='ENG'), 'Bukayo', 'Saka', 7, 'FORWARD', '2001-09-05', 'England'),
((SELECT team_id FROM team WHERE code='ENG'), 'Jordan', 'Pickford', 1, 'GOALKEEPER', '1994-03-07', 'England'),
((SELECT team_id FROM team WHERE code='ENG'), 'John', 'Stones', 5, 'DEFENDER', '1994-05-28', 'England'),
((SELECT team_id FROM team WHERE code='ENG'), 'Declan', 'Rice', 4, 'MIDFIELDER', '1999-01-14', 'England'),
((SELECT team_id FROM team WHERE code='ENG'), 'Marcus', 'Rashford', 10, 'FORWARD', '1997-10-31', 'England'),
((SELECT team_id FROM team WHERE code='ENG'), 'Kyle', 'Walker', 2, 'DEFENDER', '1990-05-28', 'England'),
((SELECT team_id FROM team WHERE code='ENG'), 'Raheem', 'Sterling', 20, 'FORWARD', '1994-12-08', 'England'),
((SELECT team_id FROM team WHERE code='ENG'), 'Harry', 'Maguire', 6, 'DEFENDER', '1993-03-05', 'England');

-- Spain (ESP)
INSERT INTO player (team_id, first_name, last_name, jersey_number, position, date_of_birth, nationality) VALUES
((SELECT team_id FROM team WHERE code='ESP'), 'Pedri', 'González', 8, 'MIDFIELDER', '2002-11-25', 'Spain'),
((SELECT team_id FROM team WHERE code='ESP'), 'Gavi', 'Páez', 9, 'MIDFIELDER', '2004-08-05', 'Spain'),
((SELECT team_id FROM team WHERE code='ESP'), 'Álvaro', 'Morata', 7, 'FORWARD', '1992-10-23', 'Spain'),
((SELECT team_id FROM team WHERE code='ESP'), 'Ferran', 'Torres', 11, 'FORWARD', '2000-02-29', 'Spain'),
((SELECT team_id FROM team WHERE code='ESP'), 'Unai', 'Simón', 23, 'GOALKEEPER', '1997-06-11', 'Spain'),
((SELECT team_id FROM team WHERE code='ESP'), 'Sergio', 'Busquets', 5, 'MIDFIELDER', '1988-07-16', 'Spain'),
((SELECT team_id FROM team WHERE code='ESP'), 'Rodri', 'Hernández', 16, 'MIDFIELDER', '1996-06-22', 'Spain'),
((SELECT team_id FROM team WHERE code='ESP'), 'Dani', 'Olmo', 10, 'MIDFIELDER', '1998-05-07', 'Spain'),
((SELECT team_id FROM team WHERE code='ESP'), 'Pau', 'Torres', 4, 'DEFENDER', '1997-01-16', 'Spain'),
((SELECT team_id FROM team WHERE code='ESP'), 'Aymeric', 'Laporte', 24, 'DEFENDER', '1994-05-27', 'Spain'),
((SELECT team_id FROM team WHERE code='ESP'), 'Jordi', 'Alba', 18, 'DEFENDER', '1989-03-21', 'Spain');

-- Japan (JPN)
INSERT INTO player (team_id, first_name, last_name, jersey_number, position, date_of_birth, nationality) VALUES
((SELECT team_id FROM team WHERE code='JPN'), 'Takumi', 'Minamino', 8, 'FORWARD', '1995-01-16', 'Japan'),
((SELECT team_id FROM team WHERE code='JPN'), 'Kaoru', 'Mitoma', 9, 'FORWARD', '1997-05-20', 'Japan'),
((SELECT team_id FROM team WHERE code='JPN'), 'Takefusa', 'Kubo', 20, 'MIDFIELDER', '2001-06-04', 'Japan'),
((SELECT team_id FROM team WHERE code='JPN'), 'Ritsu', 'Doan', 10, 'FORWARD', '1998-06-16', 'Japan'),
((SELECT team_id FROM team WHERE code='JPN'), 'Shuichi', 'Gonda', 12, 'GOALKEEPER', '1989-03-03', 'Japan'),
((SELECT team_id FROM team WHERE code='JPN'), 'Maya', 'Yoshida', 22, 'DEFENDER', '1988-08-24', 'Japan'),
((SELECT team_id FROM team WHERE code='JPN'), 'Wataru', 'Endo', 6, 'MIDFIELDER', '1993-02-09', 'Japan'),
((SELECT team_id FROM team WHERE code='JPN'), 'Ao', 'Tanaka', 17, 'MIDFIELDER', '1998-09-10', 'Japan'),
((SELECT team_id FROM team WHERE code='JPN'), 'Daichi', 'Kamada', 13, 'MIDFIELDER', '1996-08-05', 'Japan'),
((SELECT team_id FROM team WHERE code='JPN'), 'Ko', 'Itakura', 4, 'DEFENDER', '1997-01-27', 'Japan'),
((SELECT team_id FROM team WHERE code='JPN'), 'Takehiro', 'Tomiyasu', 16, 'DEFENDER', '1998-11-05', 'Japan');

-- Canada (CAN)
INSERT INTO player (team_id, first_name, last_name, jersey_number, position, date_of_birth, nationality) VALUES
((SELECT team_id FROM team WHERE code='CAN'), 'Alphonso', 'Davies', 19, 'DEFENDER', '2000-11-02', 'Canada'),
((SELECT team_id FROM team WHERE code='CAN'), 'Jonathan', 'David', 9, 'FORWARD', '2000-01-14', 'Canada'),
((SELECT team_id FROM team WHERE code='CAN'), 'Cyle', 'Larin', 17, 'FORWARD', '1995-04-17', 'Canada'),
((SELECT team_id FROM team WHERE code='CAN'), 'Tajon', 'Buchanan', 7, 'MIDFIELDER', '1999-02-08', 'Canada'),
((SELECT team_id FROM team WHERE code='CAN'), 'Milan', 'Borjan', 18, 'GOALKEEPER', '1987-10-23', 'Canada'),
((SELECT team_id FROM team WHERE code='CAN'), 'Stephen', 'Eustáquio', 8, 'MIDFIELDER', '1996-12-21', 'Canada'),
((SELECT team_id FROM team WHERE code='CAN'), 'Alistair', 'Johnston', 2, 'DEFENDER', '1998-10-08', 'Canada'),
((SELECT team_id FROM team WHERE code='CAN'), 'Sam', 'Adekugbe', 3, 'DEFENDER', '1995-01-16', 'Canada'),
((SELECT team_id FROM team WHERE code='CAN'), 'Kamal', 'Miller', 13, 'DEFENDER', '1997-06-16', 'Canada'),
((SELECT team_id FROM team WHERE code='CAN'), 'Atiba', 'Hutchinson', 15, 'MIDFIELDER', '1983-02-08', 'Canada'),
((SELECT team_id FROM team WHERE code='CAN'), 'Junior', 'Hoilett', 10, 'FORWARD', '1990-06-05', 'Canada');

-- Mexico (MEX)
INSERT INTO player (team_id, first_name, last_name, jersey_number, position, date_of_birth, nationality) VALUES
((SELECT team_id FROM team WHERE code='MEX'), 'Hirving', 'Lozano', 22, 'FORWARD', '1995-07-30', 'Mexico'),
((SELECT team_id FROM team WHERE code='MEX'), 'Raúl', 'Jiménez', 9, 'FORWARD', '1991-05-05', 'Mexico'),
((SELECT team_id FROM team WHERE code='MEX'), 'Edson', 'Álvarez', 4, 'MIDFIELDER', '1997-10-24', 'Mexico'),
((SELECT team_id FROM team WHERE code='MEX'), 'Guillermo', 'Ochoa', 13, 'GOALKEEPER', '1985-07-13', 'Mexico'),
((SELECT team_id FROM team WHERE code='MEX'), 'Jesús', 'Corona', 17, 'MIDFIELDER', '1993-01-06', 'Mexico'),
((SELECT team_id FROM team WHERE code='MEX'), 'Héctor', 'Herrera', 16, 'MIDFIELDER', '1990-04-19', 'Mexico'),
((SELECT team_id FROM team WHERE code='MEX'), 'César', 'Montes', 3, 'DEFENDER', '1997-02-24', 'Mexico'),
((SELECT team_id FROM team WHERE code='MEX'), 'Jorge', 'Sánchez', 2, 'DEFENDER', '1998-01-10', 'Mexico'),
((SELECT team_id FROM team WHERE code='MEX'), 'Luis', 'Romo', 7, 'MIDFIELDER', '1995-06-05', 'Mexico'),
((SELECT team_id FROM team WHERE code='MEX'), 'Santiago', 'Giménez', 11, 'FORWARD', '2001-04-18', 'Mexico'),
((SELECT team_id FROM team WHERE code='MEX'), 'Johan', 'Vásquez', 5, 'DEFENDER', '1998-10-22', 'Mexico');

-- Uruguay (URU)
INSERT INTO player (team_id, first_name, last_name, jersey_number, position, date_of_birth, nationality) VALUES
((SELECT team_id FROM team WHERE code='URU'), 'Darwin', 'Núñez', 11, 'FORWARD', '1999-06-24', 'Uruguay'),
((SELECT team_id FROM team WHERE code='URU'), 'Luis', 'Suárez', 9, 'FORWARD', '1987-01-24', 'Uruguay'),
((SELECT team_id FROM team WHERE code='URU'), 'Federico', 'Valverde', 15, 'MIDFIELDER', '1998-07-22', 'Uruguay'),
((SELECT team_id FROM team WHERE code='URU'), 'Rodrigo', 'Bentancur', 6, 'MIDFIELDER', '1997-06-25', 'Uruguay'),
((SELECT team_id FROM team WHERE code='URU'), 'Sergio', 'Rochet', 23, 'GOALKEEPER', '1993-03-23', 'Uruguay'),
((SELECT team_id FROM team WHERE code='URU'), 'José', 'Giménez', 2, 'DEFENDER', '1995-01-20', 'Uruguay'),
((SELECT team_id FROM team WHERE code='URU'), 'Ronald', 'Araújo', 4, 'DEFENDER', '1999-03-07', 'Uruguay'),
((SELECT team_id FROM team WHERE code='URU'), 'Nicolás', 'de la Cruz', 7, 'MIDFIELDER', '1997-06-01', 'Uruguay'),
((SELECT team_id FROM team WHERE code='URU'), 'Mathías', 'Olivera', 16, 'DEFENDER', '1997-10-31', 'Uruguay'),
((SELECT team_id FROM team WHERE code='URU'), 'Facundo', 'Pellistri', 20, 'FORWARD', '2001-12-20', 'Uruguay'),
((SELECT team_id FROM team WHERE code='URU'), 'Manuel', 'Ugarte', 5, 'MIDFIELDER', '2001-04-11', 'Uruguay');

-- Colombia (COL)
INSERT INTO player (team_id, first_name, last_name, jersey_number, position, date_of_birth, nationality) VALUES
((SELECT team_id FROM team WHERE code='COL'), 'Luis', 'Díaz', 7, 'FORWARD', '1997-01-13', 'Colombia'),
((SELECT team_id FROM team WHERE code='COL'), 'Juan', 'Cuadrado', 11, 'MIDFIELDER', '1988-05-26', 'Colombia'),
((SELECT team_id FROM team WHERE code='COL'), 'James', 'Rodríguez', 10, 'MIDFIELDER', '1991-07-12', 'Colombia'),
((SELECT team_id FROM team WHERE code='COL'), 'David', 'Ospina', 1, 'GOALKEEPER', '1988-08-31', 'Colombia'),
((SELECT team_id FROM team WHERE code='COL'), 'Davinson', 'Sánchez', 23, 'DEFENDER', '1996-06-12', 'Colombia'),
((SELECT team_id FROM team WHERE code='COL'), 'Yerry', 'Mina', 13, 'DEFENDER', '1994-09-23', 'Colombia'),
((SELECT team_id FROM team WHERE code='COL'), 'Wilmar', 'Barrios', 5, 'MIDFIELDER', '1993-10-16', 'Colombia'),
((SELECT team_id FROM team WHERE code='COL'), 'Rafael', 'Borré', 19, 'FORWARD', '1995-09-15', 'Colombia'),
((SELECT team_id FROM team WHERE code='COL'), 'Mateus', 'Uribe', 15, 'MIDFIELDER', '1991-03-21', 'Colombia'),
((SELECT team_id FROM team WHERE code='COL'), 'Johan', 'Mojica', 17, 'DEFENDER', '1992-08-21', 'Colombia'),
((SELECT team_id FROM team WHERE code='COL'), 'Luis', 'Sinisterra', 20, 'FORWARD', '1999-06-17', 'Colombia');

-- Netherlands (NED)
INSERT INTO player (team_id, first_name, last_name, jersey_number, position, date_of_birth, nationality) VALUES
((SELECT team_id FROM team WHERE code='NED'), 'Virgil', 'van Dijk', 4, 'DEFENDER', '1991-07-08', 'Netherlands'),
((SELECT team_id FROM team WHERE code='NED'), 'Frenkie', 'de Jong', 21, 'MIDFIELDER', '1997-05-12', 'Netherlands'),
((SELECT team_id FROM team WHERE code='NED'), 'Memphis', 'Depay', 10, 'FORWARD', '1994-02-13', 'Netherlands'),
((SELECT team_id FROM team WHERE code='NED'), 'Cody', 'Gakpo', 8, 'FORWARD', '1999-05-07', 'Netherlands'),
((SELECT team_id FROM team WHERE code='NED'), 'Andries', 'Noppert', 1, 'GOALKEEPER', '1994-04-07', 'Netherlands'),
((SELECT team_id FROM team WHERE code='NED'), 'Nathan', 'Aké', 5, 'DEFENDER', '1995-02-18', 'Netherlands'),
((SELECT team_id FROM team WHERE code='NED'), 'Denzel', 'Dumfries', 22, 'DEFENDER', '1996-04-18', 'Netherlands'),
((SELECT team_id FROM team WHERE code='NED'), 'Steven', 'Bergwijn', 7, 'FORWARD', '1997-10-08', 'Netherlands'),
((SELECT team_id FROM team WHERE code='NED'), 'Teun', 'Koopmeiners', 14, 'MIDFIELDER', '1998-02-28', 'Netherlands'),
((SELECT team_id FROM team WHERE code='NED'), 'Xavi', 'Simons', 17, 'MIDFIELDER', '2003-04-21', 'Netherlands'),
((SELECT team_id FROM team WHERE code='NED'), 'Marten', 'de Roon', 15, 'MIDFIELDER', '1991-03-29', 'Netherlands');

-- Belgium (BEL)
INSERT INTO player (team_id, first_name, last_name, jersey_number, position, date_of_birth, nationality) VALUES
((SELECT team_id FROM team WHERE code='BEL'), 'Kevin', 'De Bruyne', 7, 'MIDFIELDER', '1991-06-28', 'Belgium'),
((SELECT team_id FROM team WHERE code='BEL'), 'Romelu', 'Lukaku', 9, 'FORWARD', '1993-05-13', 'Belgium'),
((SELECT team_id FROM team WHERE code='BEL'), 'Thibaut', 'Courtois', 1, 'GOALKEEPER', '1992-05-11', 'Belgium'),
((SELECT team_id FROM team WHERE code='BEL'), 'Eden', 'Hazard', 10, 'FORWARD', '1991-01-07', 'Belgium'),
((SELECT team_id FROM team WHERE code='BEL'), 'Yannick', 'Carrasco', 11, 'MIDFIELDER', '1993-09-04', 'Belgium'),
((SELECT team_id FROM team WHERE code='BEL'), 'Axel', 'Witsel', 6, 'MIDFIELDER', '1989-01-12', 'Belgium'),
((SELECT team_id FROM team WHERE code='BEL'), 'Leandro', 'Trossard', 14, 'FORWARD', '1994-12-04', 'Belgium'),
((SELECT team_id FROM team WHERE code='BEL'), 'Timothy', 'Castagne', 21, 'DEFENDER', '1995-12-05', 'Belgium'),
((SELECT team_id FROM team WHERE code='BEL'), 'Arthur', 'Theate', 3, 'DEFENDER', '2000-05-25', 'Belgium'),
((SELECT team_id FROM team WHERE code='BEL'), 'Jérémy', 'Doku', 20, 'FORWARD', '2002-05-27', 'Belgium'),
((SELECT team_id FROM team WHERE code='BEL'), 'Amadou', 'Onana', 24, 'MIDFIELDER', '2001-08-16', 'Belgium');

-- Italy (ITA)
INSERT INTO player (team_id, first_name, last_name, jersey_number, position, date_of_birth, nationality) VALUES
((SELECT team_id FROM team WHERE code='ITA'), 'Gianluigi', 'Donnarumma', 1, 'GOALKEEPER', '1999-02-25', 'Italy'),
((SELECT team_id FROM team WHERE code='ITA'), 'Leonardo', 'Bonucci', 19, 'DEFENDER', '1987-05-01', 'Italy'),
((SELECT team_id FROM team WHERE code='ITA'), 'Marco', 'Verratti', 6, 'MIDFIELDER', '1992-11-05', 'Italy'),
((SELECT team_id FROM team WHERE code='ITA'), 'Federico', 'Chiesa', 14, 'FORWARD', '1997-10-25', 'Italy'),
((SELECT team_id FROM team WHERE code='ITA'), 'Ciro', 'Immobile', 17, 'FORWARD', '1990-02-20', 'Italy'),
((SELECT team_id FROM team WHERE code='ITA'), 'Jorginho', 'Frello', 8, 'MIDFIELDER', '1991-12-20', 'Italy'),
((SELECT team_id FROM team WHERE code='ITA'), 'Lorenzo', 'Insigne', 10, 'FORWARD', '1991-06-04', 'Italy'),
((SELECT team_id FROM team WHERE code='ITA'), 'Giovanni', 'Di Lorenzo', 2, 'DEFENDER', '1993-08-04', 'Italy'),
((SELECT team_id FROM team WHERE code='ITA'), 'Nicolò', 'Barella', 18, 'MIDFIELDER', '1997-02-07', 'Italy'),
((SELECT team_id FROM team WHERE code='ITA'), 'Alessandro', 'Bastoni', 23, 'DEFENDER', '1999-04-13', 'Italy'),
((SELECT team_id FROM team WHERE code='ITA'), 'Sandro', 'Tonali', 4, 'MIDFIELDER', '2000-05-08', 'Italy');

-- Croatia (CRO)
INSERT INTO player (team_id, first_name, last_name, jersey_number, position, date_of_birth, nationality) VALUES
((SELECT team_id FROM team WHERE code='CRO'), 'Luka', 'Modrić', 10, 'MIDFIELDER', '1985-09-09', 'Croatia'),
((SELECT team_id FROM team WHERE code='CRO'), 'Ivan', 'Perišić', 14, 'MIDFIELDER', '1989-02-02', 'Croatia'),
((SELECT team_id FROM team WHERE code='CRO'), 'Mateo', 'Kovačić', 8, 'MIDFIELDER', '1994-05-06', 'Croatia'),
((SELECT team_id FROM team WHERE code='CRO'), 'Dominik', 'Livaković', 1, 'GOALKEEPER', '1995-01-09', 'Croatia'),
((SELECT team_id FROM team WHERE code='CRO'), 'Joško', 'Gvardiol', 4, 'DEFENDER', '2002-01-23', 'Croatia'),
((SELECT team_id FROM team WHERE code='CRO'), 'Marcelo', 'Brozović', 11, 'MIDFIELDER', '1992-11-16', 'Croatia'),
((SELECT team_id FROM team WHERE code='CRO'), 'Andrej', 'Kramarić', 9, 'FORWARD', '1991-06-19', 'Croatia'),
((SELECT team_id FROM team WHERE code='CRO'), 'Josip', 'Juranović', 22, 'DEFENDER', '1995-08-16', 'Croatia'),
((SELECT team_id FROM team WHERE code='CRO'), 'Bruno', 'Petković', 18, 'FORWARD', '1994-09-16', 'Croatia'),
((SELECT team_id FROM team WHERE code='CRO'), 'Dejan', 'Lovren', 6, 'DEFENDER', '1989-07-05', 'Croatia'),
((SELECT team_id FROM team WHERE code='CRO'), 'Mario', 'Pašalić', 15, 'MIDFIELDER', '1995-02-09', 'Croatia');

-- Switzerland (SUI)
INSERT INTO player (team_id, first_name, last_name, jersey_number, position, date_of_birth, nationality) VALUES
((SELECT team_id FROM team WHERE code='SUI'), 'Granit', 'Xhaka', 10, 'MIDFIELDER', '1992-09-27', 'Switzerland'),
((SELECT team_id FROM team WHERE code='SUI'), 'Xherdan', 'Shaqiri', 23, 'MIDFIELDER', '1991-10-10', 'Switzerland'),
((SELECT team_id FROM team WHERE code='SUI'), 'Breel', 'Embolo', 7, 'FORWARD', '1997-02-14', 'Switzerland'),
((SELECT team_id FROM team WHERE code='SUI'), 'Yann', 'Sommer', 1, 'GOALKEEPER', '1988-12-17', 'Switzerland'),
((SELECT team_id FROM team WHERE code='SUI'), 'Manuel', 'Akanji', 5, 'DEFENDER', '1995-07-19', 'Switzerland'),
((SELECT team_id FROM team WHERE code='SUI'), 'Nico', 'Elvedi', 4, 'DEFENDER', '1996-09-30', 'Switzerland'),
((SELECT team_id FROM team WHERE code='SUI'), 'Remo', 'Freuler', 8, 'MIDFIELDER', '1992-04-15', 'Switzerland'),
((SELECT team_id FROM team WHERE code='SUI'), 'Ruben', 'Vargas', 17, 'FORWARD', '1998-08-05', 'Switzerland'),
((SELECT team_id FROM team WHERE code='SUI'), 'Silvan', 'Widmer', 3, 'DEFENDER', '1993-03-05', 'Switzerland'),
((SELECT team_id FROM team WHERE code='SUI'), 'Djibril', 'Sow', 15, 'MIDFIELDER', '1997-02-06', 'Switzerland'),
((SELECT team_id FROM team WHERE code='SUI'), 'Noah', 'Okafor', 11, 'FORWARD', '2000-05-24', 'Switzerland');

-- Denmark (DEN)
INSERT INTO player (team_id, first_name, last_name, jersey_number, position, date_of_birth, nationality) VALUES
((SELECT team_id FROM team WHERE code='DEN'), 'Christian', 'Eriksen', 10, 'MIDFIELDER', '1992-02-14', 'Denmark'),
((SELECT team_id FROM team WHERE code='DEN'), 'Kasper', 'Schmeichel', 1, 'GOALKEEPER', '1986-11-05', 'Denmark'),
((SELECT team_id FROM team WHERE code='DEN'), 'Pierre-Emile', 'Højbjerg', 23, 'MIDFIELDER', '1995-08-05', 'Denmark'),
((SELECT team_id FROM team WHERE code='DEN'), 'Simon', 'Kjær', 4, 'DEFENDER', '1989-03-26', 'Denmark'),
((SELECT team_id FROM team WHERE code='DEN'), 'Andreas', 'Christensen', 6, 'DEFENDER', '1996-04-10', 'Denmark'),
((SELECT team_id FROM team WHERE code='DEN'), 'Joakim', 'Mæhle', 5, 'DEFENDER', '1997-05-20', 'Denmark'),
((SELECT team_id FROM team WHERE code='DEN'), 'Rasmus', 'Højlund', 9, 'FORWARD', '2003-02-04', 'Denmark'),
((SELECT team_id FROM team WHERE code='DEN'), 'Mikkel', 'Damsgaard', 14, 'MIDFIELDER', '2000-07-03', 'Denmark'),
((SELECT team_id FROM team WHERE code='DEN'), 'Jesper', 'Lindstrøm', 18, 'MIDFIELDER', '2000-02-29', 'Denmark'),
((SELECT team_id FROM team WHERE code='DEN'), 'Jonas', 'Wind', 19, 'FORWARD', '1999-02-07', 'Denmark'),
((SELECT team_id FROM team WHERE code='DEN'), 'Victor', 'Nelsson', 13, 'DEFENDER', '1998-10-14', 'Denmark');

-- South Korea (KOR)
INSERT INTO player (team_id, first_name, last_name, jersey_number, position, date_of_birth, nationality) VALUES
((SELECT team_id FROM team WHERE code='KOR'), 'Son', 'Heung-min', 7, 'FORWARD', '1992-07-08', 'South Korea'),
((SELECT team_id FROM team WHERE code='KOR'), 'Lee', 'Kang-in', 18, 'MIDFIELDER', '2001-02-19', 'South Korea'),
((SELECT team_id FROM team WHERE code='KOR'), 'Kim', 'Min-jae', 3, 'DEFENDER', '1996-11-15', 'South Korea'),
((SELECT team_id FROM team WHERE code='KOR'), 'Hwang', 'Hee-chan', 11, 'FORWARD', '1996-01-26', 'South Korea'),
((SELECT team_id FROM team WHERE code='KOR'), 'Kim', 'Seung-gyu', 21, 'GOALKEEPER', '1990-09-30', 'South Korea'),
((SELECT team_id FROM team WHERE code='KOR'), 'Hwang', 'In-beom', 6, 'MIDFIELDER', '1996-09-20', 'South Korea'),
((SELECT team_id FROM team WHERE code='KOR'), 'Jung', 'Woo-young', 5, 'MIDFIELDER', '1989-09-14', 'South Korea'),
((SELECT team_id FROM team WHERE code='KOR'), 'Cho', 'Gue-sung', 9, 'FORWARD', '1998-01-25', 'South Korea'),
((SELECT team_id FROM team WHERE code='KOR'), 'Lee', 'Jae-sung', 10, 'MIDFIELDER', '1992-08-10', 'South Korea'),
((SELECT team_id FROM team WHERE code='KOR'), 'Kim', 'Young-gwon', 19, 'DEFENDER', '1990-02-27', 'South Korea'),
((SELECT team_id FROM team WHERE code='KOR'), 'Hong', 'Hyun-seok', 16, 'MIDFIELDER', '1999-03-17', 'South Korea');

-- Morocco (MAR)
INSERT INTO player (team_id, first_name, last_name, jersey_number, position, date_of_birth, nationality) VALUES
((SELECT team_id FROM team WHERE code='MAR'), 'Achraf', 'Hakimi', 2, 'DEFENDER', '1998-11-04', 'Morocco'),
((SELECT team_id FROM team WHERE code='MAR'), 'Hakim', 'Ziyech', 7, 'MIDFIELDER', '1993-03-19', 'Morocco'),
((SELECT team_id FROM team WHERE code='MAR'), 'Yassine', 'Bounou', 1, 'GOALKEEPER', '1991-04-05', 'Morocco'),
((SELECT team_id FROM team WHERE code='MAR'), 'Sofyan', 'Amrabat', 4, 'MIDFIELDER', '1996-08-21', 'Morocco'),
((SELECT team_id FROM team WHERE code='MAR'), 'Youssef', 'En-Nesyri', 19, 'FORWARD', '1997-06-01', 'Morocco'),
((SELECT team_id FROM team WHERE code='MAR'), 'Romain', 'Saïss', 6, 'DEFENDER', '1990-03-26', 'Morocco'),
((SELECT team_id FROM team WHERE code='MAR'), 'Noussair', 'Mazraoui', 3, 'DEFENDER', '1997-11-14', 'Morocco'),
((SELECT team_id FROM team WHERE code='MAR'), 'Azzedine', 'Ounahi', 8, 'MIDFIELDER', '2000-04-19', 'Morocco'),
((SELECT team_id FROM team WHERE code='MAR'), 'Sofiane', 'Boufal', 17, 'MIDFIELDER', '1993-09-17', 'Morocco'),
((SELECT team_id FROM team WHERE code='MAR'), 'Abdelhamid', 'Sabiri', 11, 'MIDFIELDER', '1996-11-28', 'Morocco'),
((SELECT team_id FROM team WHERE code='MAR'), 'Zakaria', 'Aboukhlal', 20, 'FORWARD', '2000-02-18', 'Morocco');

-- Senegal (SEN)
INSERT INTO player (team_id, first_name, last_name, jersey_number, position, date_of_birth, nationality) VALUES
((SELECT team_id FROM team WHERE code='SEN'), 'Sadio', 'Mané', 10, 'FORWARD', '1992-04-10', 'Senegal'),
((SELECT team_id FROM team WHERE code='SEN'), 'Kalidou', 'Koulibaly', 3, 'DEFENDER', '1991-06-20', 'Senegal'),
((SELECT team_id FROM team WHERE code='SEN'), 'Édouard', 'Mendy', 16, 'GOALKEEPER', '1992-03-01', 'Senegal'),
((SELECT team_id FROM team WHERE code='SEN'), 'Idrissa', 'Gueye', 5, 'MIDFIELDER', '1989-09-26', 'Senegal'),
((SELECT team_id FROM team WHERE code='SEN'), 'Ismaïla', 'Sarr', 18, 'FORWARD', '1998-02-25', 'Senegal'),
((SELECT team_id FROM team WHERE code='SEN'), 'Cheikhou', 'Kouyaté', 8, 'MIDFIELDER', '1989-12-21', 'Senegal'),
((SELECT team_id FROM team WHERE code='SEN'), 'Boulaye', 'Dia', 9, 'FORWARD', '1996-11-16', 'Senegal'),
((SELECT team_id FROM team WHERE code='SEN'), 'Abdou', 'Diallo', 22, 'DEFENDER', '1996-05-04', 'Senegal'),
((SELECT team_id FROM team WHERE code='SEN'), 'Nampalys', 'Mendy', 6, 'MIDFIELDER', '1992-06-23', 'Senegal'),
((SELECT team_id FROM team WHERE code='SEN'), 'Pape', 'Gueye', 26, 'MIDFIELDER', '1999-01-24', 'Senegal'),
((SELECT team_id FROM team WHERE code='SEN'), 'Youssouf', 'Sabaly', 21, 'DEFENDER', '1993-03-05', 'Senegal');

-- Australia (AUS)
INSERT INTO player (team_id, first_name, last_name, jersey_number, position, date_of_birth, nationality) VALUES
((SELECT team_id FROM team WHERE code='AUS'), 'Mathew', 'Ryan', 1, 'GOALKEEPER', '1992-04-08', 'Australia'),
((SELECT team_id FROM team WHERE code='AUS'), 'Aaron', 'Mooy', 13, 'MIDFIELDER', '1990-09-15', 'Australia'),
((SELECT team_id FROM team WHERE code='AUS'), 'Mathew', 'Leckie', 7, 'FORWARD', '1991-02-04', 'Australia'),
((SELECT team_id FROM team WHERE code='AUS'), 'Jackson', 'Irvine', 22, 'MIDFIELDER', '1993-03-07', 'Australia'),
((SELECT team_id FROM team WHERE code='AUS'), 'Awer', 'Mabil', 11, 'FORWARD', '1995-09-15', 'Australia'),
((SELECT team_id FROM team WHERE code='AUS'), 'Harry', 'Souttar', 19, 'DEFENDER', '1998-10-22', 'Australia'),
((SELECT team_id FROM team WHERE code='AUS'), 'Ajdin', 'Hrustic', 8, 'MIDFIELDER', '1996-07-05', 'Australia'),
((SELECT team_id FROM team WHERE code='AUS'), 'Mitchell', 'Duke', 15, 'FORWARD', '1991-01-18', 'Australia'),
((SELECT team_id FROM team WHERE code='AUS'), 'Riley', 'McGree', 14, 'MIDFIELDER', '1998-11-02', 'Australia'),
((SELECT team_id FROM team WHERE code='AUS'), 'Aziz', 'Behich', 16, 'DEFENDER', '1990-12-16', 'Australia'),
((SELECT team_id FROM team WHERE code='AUS'), 'Kye', 'Rowles', 4, 'DEFENDER', '1998-06-24', 'Australia');

-- Remaining teams with basic squads
-- Poland (POL)
INSERT INTO player (team_id, first_name, last_name, jersey_number, position, date_of_birth, nationality) VALUES
((SELECT team_id FROM team WHERE code='POL'), 'Robert', 'Lewandowski', 9, 'FORWARD', '1988-08-21', 'Poland'),
((SELECT team_id FROM team WHERE code='POL'), 'Wojciech', 'Szczęsny', 1, 'GOALKEEPER', '1990-04-18', 'Poland'),
((SELECT team_id FROM team WHERE code='POL'), 'Piotr', 'Zieliński', 10, 'MIDFIELDER', '1994-05-20', 'Poland'),
((SELECT team_id FROM team WHERE code='POL'), 'Jan', 'Bednarek', 5, 'DEFENDER', '1996-04-12', 'Poland'),
((SELECT team_id FROM team WHERE code='POL'), 'Krzysztof', 'Piątek', 23, 'FORWARD', '1995-07-01', 'Poland');

-- Serbia (SRB)
INSERT INTO player (team_id, first_name, last_name, jersey_number, position, date_of_birth, nationality) VALUES
((SELECT team_id FROM team WHERE code='SRB'), 'Dušan', 'Vlahović', 9, 'FORWARD', '2000-01-28', 'Serbia'),
((SELECT team_id FROM team WHERE code='SRB'), 'Sergej', 'Milinković-Savić', 20, 'MIDFIELDER', '1995-02-27', 'Serbia'),
((SELECT team_id FROM team WHERE code='SRB'), 'Dušan', 'Tadić', 10, 'MIDFIELDER', '1988-11-20', 'Serbia'),
((SELECT team_id FROM team WHERE code='SRB'), 'Aleksandar', 'Mitrović', 18, 'FORWARD', '1994-09-16', 'Serbia'),
((SELECT team_id FROM team WHERE code='SRB'), 'Vanja', 'Milinković-Savić', 1, 'GOALKEEPER', '1997-02-20', 'Serbia');

-- Sweden (SWE)
INSERT INTO player (team_id, first_name, last_name, jersey_number, position, date_of_birth, nationality) VALUES
((SELECT team_id FROM team WHERE code='SWE'), 'Alexander', 'Isak', 9, 'FORWARD', '1999-09-21', 'Sweden'),
((SELECT team_id FROM team WHERE code='SWE'), 'Dejan', 'Kulusevski', 21, 'MIDFIELDER', '2000-04-25', 'Sweden'),
((SELECT team_id FROM team WHERE code='SWE'), 'Victor', 'Lindelöf', 3, 'DEFENDER', '1994-07-17', 'Sweden'),
((SELECT team_id FROM team WHERE code='SWE'), 'Emil', 'Forsberg', 10, 'MIDFIELDER', '1991-10-23', 'Sweden'),
((SELECT team_id FROM team WHERE code='SWE'), 'Robin', 'Olsen', 1, 'GOALKEEPER', '1990-01-08', 'Sweden');

-- Additional squads for remaining teams (simplified)
-- Austria (AUT)
INSERT INTO player (team_id, first_name, last_name, jersey_number, position, date_of_birth, nationality) VALUES
((SELECT team_id FROM team WHERE code='AUT'), 'David', 'Alaba', 8, 'DEFENDER', '1992-06-24', 'Austria'),
((SELECT team_id FROM team WHERE code='AUT'), 'Marko', 'Arnautović', 7, 'FORWARD', '1989-04-19', 'Austria'),
((SELECT team_id FROM team WHERE code='AUT'), 'Marcel', 'Sabitzer', 9, 'MIDFIELDER', '1994-03-17', 'Austria');

-- Other teams basic entries
INSERT INTO player (team_id, first_name, last_name, jersey_number, position, date_of_birth, nationality) VALUES
((SELECT team_id FROM team WHERE code='CHI'), 'Alexis', 'Sánchez', 7, 'FORWARD', '1988-12-19', 'Chile'),
((SELECT team_id FROM team WHERE code='CHI'), 'Arturo', 'Vidal', 8, 'MIDFIELDER', '1987-05-22', 'Chile'),
((SELECT team_id FROM team WHERE code='CHI'), 'Claudio', 'Bravo', 1, 'GOALKEEPER', '1983-04-13', 'Chile'),
((SELECT team_id FROM team WHERE code='ECU'), 'Enner', 'Valencia', 13, 'FORWARD', '1989-11-04', 'Ecuador'),
((SELECT team_id FROM team WHERE code='ECU'), 'Moisés', 'Caicedo', 23, 'MIDFIELDER', '2001-11-02', 'Ecuador'),
((SELECT team_id FROM team WHERE code='ECU'), 'Pervis', 'Estupiñán', 7, 'DEFENDER', '1998-01-21', 'Ecuador'),
((SELECT team_id FROM team WHERE code='IRN'), 'Sardar', 'Azmoun', 9, 'FORWARD', '1995-01-01', 'Iran'),
((SELECT team_id FROM team WHERE code='IRN'), 'Alireza', 'Jahanbakhsh', 7, 'MIDFIELDER', '1993-08-11', 'Iran'),
((SELECT team_id FROM team WHERE code='IRN'), 'Alireza', 'Beiranvand', 1, 'GOALKEEPER', '1992-09-21', 'Iran'),
((SELECT team_id FROM team WHERE code='KSA'), 'Salem', 'Al-Dawsari', 10, 'FORWARD', '1991-08-19', 'Saudi Arabia'),
((SELECT team_id FROM team WHERE code='KSA'), 'Mohammed', 'Al-Owais', 1, 'GOALKEEPER', '1991-10-10', 'Saudi Arabia'),
((SELECT team_id FROM team WHERE code='KSA'), 'Salman', 'Al-Faraj', 7, 'MIDFIELDER', '1989-08-01', 'Saudi Arabia'),
((SELECT team_id FROM team WHERE code='QAT'), 'Akram', 'Afif', 11, 'FORWARD', '1996-11-18', 'Qatar'),
((SELECT team_id FROM team WHERE code='QAT'), 'Almoez', 'Ali', 19, 'FORWARD', '1996-08-19', 'Qatar'),
((SELECT team_id FROM team WHERE code='QAT'), 'Saad', 'Al-Sheeb', 1, 'GOALKEEPER', '1990-02-19', 'Qatar'),
((SELECT team_id FROM team WHERE code='NGA'), 'Victor', 'Osimhen', 9, 'FORWARD', '1998-12-29', 'Nigeria'),
((SELECT team_id FROM team WHERE code='NGA'), 'Wilfred', 'Ndidi', 25, 'MIDFIELDER', '1996-12-16', 'Nigeria'),
((SELECT team_id FROM team WHERE code='NGA'), 'Francis', 'Uzoho', 23, 'GOALKEEPER', '1998-10-28', 'Nigeria'),
((SELECT team_id FROM team WHERE code='GHA'), 'Thomas', 'Partey', 5, 'MIDFIELDER', '1993-06-13', 'Ghana'),
((SELECT team_id FROM team WHERE code='GHA'), 'Mohammed', 'Kudus', 20, 'FORWARD', '2000-08-02', 'Ghana'),
((SELECT team_id FROM team WHERE code='GHA'), 'André', 'Ayew', 10, 'FORWARD', '1989-12-17', 'Ghana'),
((SELECT team_id FROM team WHERE code='CMR'), 'André-Frank', 'Zambo Anguissa', 8, 'MIDFIELDER', '1995-11-16', 'Cameroon'),
((SELECT team_id FROM team WHERE code='CMR'), 'Vincent', 'Aboubakar', 10, 'FORWARD', '1992-01-22', 'Cameroon'),
((SELECT team_id FROM team WHERE code='CMR'), 'André', 'Onana', 1, 'GOALKEEPER', '1996-04-02', 'Cameroon'),
((SELECT team_id FROM team WHERE code='TUN'), 'Wahbi', 'Khazri', 10, 'MIDFIELDER', '1991-02-08', 'Tunisia'),
((SELECT team_id FROM team WHERE code='TUN'), 'Youssef', 'Msakni', 7, 'FORWARD', '1990-09-28', 'Tunisia'),
((SELECT team_id FROM team WHERE code='TUN'), 'Bechir', 'Ben Said', 1, 'GOALKEEPER', '1997-01-28', 'Tunisia'),
((SELECT team_id FROM team WHERE code='ALG'), 'Riyad', 'Mahrez', 26, 'MIDFIELDER', '1991-02-21', 'Algeria'),
((SELECT team_id FROM team WHERE code='ALG'), 'Islam', 'Slimani', 13, 'FORWARD', '1988-06-18', 'Algeria'),
((SELECT team_id FROM team WHERE code='ALG'), 'Rais', 'M''Bolhi', 23, 'GOALKEEPER', '1986-04-25', 'Algeria'),
((SELECT team_id FROM team WHERE code='CIV'), 'Wilfried', 'Zaha', 12, 'FORWARD', '1992-11-10', 'Ivory Coast'),
((SELECT team_id FROM team WHERE code='CIV'), 'Franck', 'Kessié', 8, 'MIDFIELDER', '1996-12-19', 'Ivory Coast'),
((SELECT team_id FROM team WHERE code='CIV'), 'Nicolas', 'Pépé', 19, 'FORWARD', '1995-05-29', 'Ivory Coast'),
((SELECT team_id FROM team WHERE code='EGY'), 'Mohamed', 'Salah', 11, 'FORWARD', '1992-06-15', 'Egypt'),
((SELECT team_id FROM team WHERE code='EGY'), 'Mohamed', 'Elneny', 17, 'MIDFIELDER', '1992-07-11', 'Egypt'),
((SELECT team_id FROM team WHERE code='EGY'), 'Mohamed', 'El Shenawy', 1, 'GOALKEEPER', '1988-12-18', 'Egypt'),
((SELECT team_id FROM team WHERE code='CRC'), 'Keylor', 'Navas', 1, 'GOALKEEPER', '1986-12-15', 'Costa Rica'),
((SELECT team_id FROM team WHERE code='CRC'), 'Joel', 'Campbell', 12, 'FORWARD', '1992-06-26', 'Costa Rica'),
((SELECT team_id FROM team WHERE code='CRC'), 'Celso', 'Borges', 5, 'MIDFIELDER', '1988-05-27', 'Costa Rica'),
((SELECT team_id FROM team WHERE code='JAM'), 'Leon', 'Bailey', 7, 'FORWARD', '1997-08-09', 'Jamaica'),
((SELECT team_id FROM team WHERE code='JAM'), 'Michail', 'Antonio', 9, 'FORWARD', '1990-03-28', 'Jamaica'),
((SELECT team_id FROM team WHERE code='JAM'), 'Bobby', 'Reid', 11, 'MIDFIELDER', '1993-02-02', 'Jamaica'),
((SELECT team_id FROM team WHERE code='PAN'), 'Édgar', 'Bárcenas', 10, 'MIDFIELDER', '1993-03-14', 'Panama'),
((SELECT team_id FROM team WHERE code='PAN'), 'Luis', 'Mejía', 22, 'GOALKEEPER', '1990-09-12', 'Panama'),
((SELECT team_id FROM team WHERE code='PAN'), 'Aníbal', 'Godoy', 20, 'MIDFIELDER', '1990-02-10', 'Panama'),
((SELECT team_id FROM team WHERE code='JOR'), 'Musa', 'Al-Taamari', 9, 'FORWARD', '1997-10-12', 'Jordan'),
((SELECT team_id FROM team WHERE code='JOR'), 'Yazan', 'Al-Arab', 22, 'GOALKEEPER', '1992-09-10', 'Jordan'),
((SELECT team_id FROM team WHERE code='JOR'), 'Mousa', 'Suleiman', 5, 'MIDFIELDER', '1994-03-15', 'Jordan'),
((SELECT team_id FROM team WHERE code='UZB'), 'Eldor', 'Shomurodov', 14, 'FORWARD', '1995-06-29', 'Uzbekistan'),
((SELECT team_id FROM team WHERE code='UZB'), 'Otabek', 'Shukurov', 9, 'MIDFIELDER', '2000-02-12', 'Uzbekistan'),
((SELECT team_id FROM team WHERE code='UZB'), 'Utkir', 'Yusupov', 1, 'GOALKEEPER', '1996-06-04', 'Uzbekistan'),
((SELECT team_id FROM team WHERE code='NOR'), 'Erling', 'Haaland', 9, 'FORWARD', '2000-07-21', 'Norway'),
((SELECT team_id FROM team WHERE code='NOR'), 'Martin', 'Ødegaard', 10, 'MIDFIELDER', '1998-12-17', 'Norway'),
((SELECT team_id FROM team WHERE code='NOR'), 'Ørjan', 'Nyland', 1, 'GOALKEEPER', '1990-09-10', 'Norway'),
((SELECT team_id FROM team WHERE code='NZL'), 'Chris', 'Wood', 9, 'FORWARD', '1991-12-07', 'New Zealand'),
((SELECT team_id FROM team WHERE code='NZL'), 'Winston', 'Reid', 5, 'DEFENDER', '1988-07-03', 'New Zealand'),
((SELECT team_id FROM team WHERE code='NZL'), 'Stefan', 'Marinovic', 23, 'GOALKEEPER', '1991-07-15', 'New Zealand');

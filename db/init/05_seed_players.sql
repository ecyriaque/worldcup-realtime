-- Seed players for teams in the competition
-- Adding key players for some major teams

-- United States (team_id = 1)
INSERT INTO player (team_id, first_name, last_name, jersey_number, position, date_of_birth, nationality) VALUES
(1, 'Christian', 'Pulisic', 10, 'FORWARD', '1998-09-18', 'United States'),
(1, 'Weston', 'McKennie', 8, 'MIDFIELDER', '1998-08-28', 'United States'),
(1, 'Tyler', 'Adams', 4, 'MIDFIELDER', '1999-02-14', 'United States'),
(1, 'Matt', 'Turner', 1, 'GOALKEEPER', '1994-06-24', 'United States'),
(1, 'Sergiño', 'Dest', 2, 'DEFENDER', '2000-11-03', 'United States'),
(1, 'Antonee', 'Robinson', 5, 'DEFENDER', '1997-08-08', 'United States'),
(1, 'Yunus', 'Musah', 6, 'MIDFIELDER', '2002-11-29', 'United States'),
(1, 'Gio', 'Reyna', 7, 'MIDFIELDER', '2002-11-13', 'United States'),
(1, 'Timothy', 'Weah', 21, 'FORWARD', '2000-02-22', 'United States'),
(1, 'Ricardo', 'Pepi', 9, 'FORWARD', '2003-01-09', 'United States'),
(1, 'Walker', 'Zimmerman', 3, 'DEFENDER', '1993-05-19', 'United States');

-- France (team_id = 2)
INSERT INTO player (team_id, first_name, last_name, jersey_number, position, date_of_birth, nationality) VALUES
(2, 'Kylian', 'Mbappé', 10, 'FORWARD', '1998-12-20', 'France'),
(2, 'Antoine', 'Griezmann', 7, 'FORWARD', '1991-03-21', 'France'),
(2, 'Aurélien', 'Tchouaméni', 8, 'MIDFIELDER', '2000-01-27', 'France'),
(2, 'N''Golo', 'Kanté', 13, 'MIDFIELDER', '1991-03-29', 'France'),
(2, 'Hugo', 'Lloris', 1, 'GOALKEEPER', '1986-12-26', 'France'),
(2, 'Raphaël', 'Varane', 4, 'DEFENDER', '1993-04-25', 'France'),
(2, 'Theo', 'Hernández', 22, 'DEFENDER', '1997-10-06', 'France'),
(2, 'Ousmane', 'Dembélé', 11, 'FORWARD', '1997-05-15', 'France'),
(2, 'Kingsley', 'Coman', 20, 'FORWARD', '1996-06-13', 'France'),
(2, 'Adrien', 'Rabiot', 14, 'MIDFIELDER', '1995-04-03', 'France'),
(2, 'Jules', 'Koundé', 5, 'DEFENDER', '1998-11-12', 'France');

-- Brazil (team_id = 3)
INSERT INTO player (team_id, first_name, last_name, jersey_number, position, date_of_birth, nationality) VALUES
(3, 'Neymar', 'Jr', 10, 'FORWARD', '1992-02-05', 'Brazil'),
(3, 'Vinícius', 'Júnior', 20, 'FORWARD', '2000-07-12', 'Brazil'),
(3, 'Casemiro', 'Santos', 5, 'MIDFIELDER', '1992-02-23', 'Brazil'),
(3, 'Raphinha', 'Dias', 11, 'FORWARD', '1996-12-14', 'Brazil'),
(3, 'Alisson', 'Becker', 1, 'GOALKEEPER', '1992-10-02', 'Brazil'),
(3, 'Thiago', 'Silva', 3, 'DEFENDER', '1984-09-22', 'Brazil'),
(3, 'Marquinhos', 'Aoás', 4, 'DEFENDER', '1994-05-14', 'Brazil'),
(3, 'Lucas', 'Paquetá', 8, 'MIDFIELDER', '1997-08-27', 'Brazil'),
(3, 'Gabriel', 'Jesus', 9, 'FORWARD', '1997-04-03', 'Brazil'),
(3, 'Rodrygo', 'Goes', 21, 'FORWARD', '2001-01-09', 'Brazil'),
(3, 'Danilo', 'Luiz', 2, 'DEFENDER', '1991-07-15', 'Brazil');

-- Argentina (team_id = 4)
INSERT INTO player (team_id, first_name, last_name, jersey_number, position, date_of_birth, nationality) VALUES
(4, 'Lionel', 'Messi', 10, 'FORWARD', '1987-06-24', 'Argentina'),
(4, 'Ángel', 'Di María', 11, 'FORWARD', '1988-02-14', 'Argentina'),
(4, 'Lautaro', 'Martínez', 22, 'FORWARD', '1997-08-22', 'Argentina'),
(4, 'Rodrigo', 'De Paul', 7, 'MIDFIELDER', '1994-05-24', 'Argentina'),
(4, 'Emiliano', 'Martínez', 23, 'GOALKEEPER', '1992-09-02', 'Argentina'),
(4, 'Nicolás', 'Otamendi', 19, 'DEFENDER', '1988-02-12', 'Argentina'),
(4, 'Cristian', 'Romero', 13, 'DEFENDER', '1998-04-27', 'Argentina'),
(4, 'Leandro', 'Paredes', 5, 'MIDFIELDER', '1994-06-29', 'Argentina'),
(4, 'Julián', 'Álvarez', 9, 'FORWARD', '2000-01-31', 'Argentina'),
(4, 'Enzo', 'Fernández', 24, 'MIDFIELDER', '2001-01-17', 'Argentina'),
(4, 'Marcos', 'Acuña', 8, 'DEFENDER', '1991-10-28', 'Argentina');

-- Portugal (team_id = 5)
INSERT INTO player (team_id, first_name, last_name, jersey_number, position, date_of_birth, nationality) VALUES
(5, 'Cristiano', 'Ronaldo', 7, 'FORWARD', '1985-02-05', 'Portugal'),
(5, 'Bruno', 'Fernandes', 8, 'MIDFIELDER', '1994-09-08', 'Portugal'),
(5, 'João', 'Félix', 11, 'FORWARD', '1999-11-10', 'Portugal'),
(5, 'Bernardo', 'Silva', 10, 'MIDFIELDER', '1994-08-10', 'Portugal'),
(5, 'Diogo', 'Costa', 1, 'GOALKEEPER', '1999-09-19', 'Portugal'),
(5, 'Rúben', 'Dias', 3, 'DEFENDER', '1997-05-14', 'Portugal'),
(5, 'João', 'Cancelo', 20, 'DEFENDER', '1994-05-27', 'Portugal'),
(5, 'Rafael', 'Leão', 17, 'FORWARD', '1999-06-10', 'Portugal'),
(5, 'Pepe', 'Ferreira', 4, 'DEFENDER', '1983-02-26', 'Portugal'),
(5, 'William', 'Carvalho', 14, 'MIDFIELDER', '1992-04-07', 'Portugal'),
(5, 'Diogo', 'Jota', 21, 'FORWARD', '1996-12-04', 'Portugal');

-- Germany (team_id = 6)
INSERT INTO player (team_id, first_name, last_name, jersey_number, position, date_of_birth, nationality) VALUES
(6, 'Kai', 'Havertz', 7, 'FORWARD', '1999-06-11', 'Germany'),
(6, 'Joshua', 'Kimmich', 6, 'MIDFIELDER', '1995-02-08', 'Germany'),
(6, 'Serge', 'Gnabry', 10, 'FORWARD', '1995-07-14', 'Germany'),
(6, 'Jamal', 'Musiala', 14, 'MIDFIELDER', '2003-02-26', 'Germany'),
(6, 'Marc-André', 'ter Stegen', 22, 'GOALKEEPER', '1992-04-30', 'Germany'),
(6, 'Antonio', 'Rüdiger', 2, 'DEFENDER', '1993-03-03', 'Germany'),
(6, 'Ilkay', 'Gündogan', 21, 'MIDFIELDER', '1990-10-24', 'Germany'),
(6, 'Thomas', 'Müller', 25, 'FORWARD', '1989-09-13', 'Germany'),
(6, 'Leroy', 'Sané', 19, 'FORWARD', '1996-01-11', 'Germany'),
(6, 'Niklas', 'Süle', 15, 'DEFENDER', '1995-09-03', 'Germany'),
(6, 'Leon', 'Goretzka', 8, 'MIDFIELDER', '1995-02-06', 'Germany');

-- England (team_id = 7)
INSERT INTO player (team_id, first_name, last_name, jersey_number, position, date_of_birth, nationality) VALUES
(7, 'Harry', 'Kane', 9, 'FORWARD', '1993-07-28', 'England'),
(7, 'Jude', 'Bellingham', 22, 'MIDFIELDER', '2003-06-29', 'England'),
(7, 'Phil', 'Foden', 11, 'MIDFIELDER', '2000-05-28', 'England'),
(7, 'Bukayo', 'Saka', 7, 'FORWARD', '2001-09-05', 'England'),
(7, 'Jordan', 'Pickford', 1, 'GOALKEEPER', '1994-03-07', 'England'),
(7, 'John', 'Stones', 5, 'DEFENDER', '1994-05-28', 'England'),
(7, 'Declan', 'Rice', 4, 'MIDFIELDER', '1999-01-14', 'England'),
(7, 'Marcus', 'Rashford', 10, 'FORWARD', '1997-10-31', 'England'),
(7, 'Kyle', 'Walker', 2, 'DEFENDER', '1990-05-28', 'England'),
(7, 'Raheem', 'Sterling', 20, 'FORWARD', '1994-12-08', 'England'),
(7, 'Harry', 'Maguire', 6, 'DEFENDER', '1993-03-05', 'England');

-- Spain (team_id = 8)
INSERT INTO player (team_id, first_name, last_name, jersey_number, position, date_of_birth, nationality) VALUES
(8, 'Pedri', 'González', 8, 'MIDFIELDER', '2002-11-25', 'Spain'),
(8, 'Gavi', 'Páez', 9, 'MIDFIELDER', '2004-08-05', 'Spain'),
(8, 'Álvaro', 'Morata', 7, 'FORWARD', '1992-10-23', 'Spain'),
(8, 'Ferran', 'Torres', 11, 'FORWARD', '2000-02-29', 'Spain'),
(8, 'Unai', 'Simón', 23, 'GOALKEEPER', '1997-06-11', 'Spain'),
(8, 'Sergio', 'Busquets', 5, 'MIDFIELDER', '1988-07-16', 'Spain'),
(8, 'Rodri', 'Hernández', 16, 'MIDFIELDER', '1996-06-22', 'Spain'),
(8, 'Dani', 'Olmo', 10, 'MIDFIELDER', '1998-05-07', 'Spain'),
(8, 'Pau', 'Torres', 4, 'DEFENDER', '1997-01-16', 'Spain'),
(8, 'Aymeric', 'Laporte', 24, 'DEFENDER', '1994-05-27', 'Spain'),
(8, 'Jordi', 'Alba', 18, 'DEFENDER', '1989-03-21', 'Spain');

-- Japan (team_id = 26)
INSERT INTO player (team_id, first_name, last_name, jersey_number, position, date_of_birth, nationality) VALUES
(26, 'Takumi', 'Minamino', 8, 'FORWARD', '1995-01-16', 'Japan'),
(26, 'Kaoru', 'Mitoma', 9, 'FORWARD', '1997-05-20', 'Japan'),
(26, 'Takefusa', 'Kubo', 20, 'MIDFIELDER', '2001-06-04', 'Japan'),
(26, 'Ritsu', 'Doan', 10, 'FORWARD', '1998-06-16', 'Japan'),
(26, 'Shuichi', 'Gonda', 12, 'GOALKEEPER', '1989-03-03', 'Japan'),
(26, 'Maya', 'Yoshida', 22, 'DEFENDER', '1988-08-24', 'Japan'),
(26, 'Wataru', 'Endo', 6, 'MIDFIELDER', '1993-02-09', 'Japan'),
(26, 'Ao', 'Tanaka', 17, 'MIDFIELDER', '1998-09-10', 'Japan'),
(26, 'Daichi', 'Kamada', 13, 'MIDFIELDER', '1996-08-05', 'Japan'),
(26, 'Ko', 'Itakura', 4, 'DEFENDER', '1997-01-27', 'Japan'),
(26, 'Takehiro', 'Tomiyasu', 16, 'DEFENDER', '1998-11-05', 'Japan');

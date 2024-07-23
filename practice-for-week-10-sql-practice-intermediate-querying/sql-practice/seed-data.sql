DROP TABLE IF EXISTS albums;
CREATE TABLE albums (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title VARCHAR(100) NOT NULL,
  band_id INTEGER,
  year INTEGER NOT NULL,
  num_sold INTEGER NOT NULL DEFAULT 0
);
INSERT INTO albums (title, band_id, year, num_sold)
VALUES ('The Falling Box', 1, 2015, 25000),
  ('Again', 1, 2018, 30000),
  ('The End', 1, 2020, 120000),
  ('The Prelude', 2, 2020, 60000),
  ('Bases Loaded', 2, 2021, 75000),
  ('One', 3, 2018, 55000),
  ('Two', 3, 2020, 80000),
  ('Three?', 3, 2021, 17000),
  ('Back To The Middle', 4, 2019, 12000),
  ('Where We Go', 4, 2020, 63000),
  ('The King River', 5, 2017, 85000),
  ('Under Water', 5, 2020, 106000),
  ('Another Fork', 5, 2021, 140000);

.shell clear

.print
.print --------------------------------------------------------------------------------------------
.print  Query 1: SELECT with a comparison operator
.print  Run the SQL command that returns the albums that have sold at least 100,000 copies.
.print --------------------------------------------------------------------------------------------
.print

SELECT title FROM albums
  WHERE num_sold >= 100000;

.print
.print --------------------------------------------------------------------------------------------
.print  Query 2: SELECT matching a range of values
.print  Run the SQL command that returns the albums released between 2018 and 2020.
.print --------------------------------------------------------------------------------------------
.print

SELECT title FROM albums
  WHERE year BETWEEN 2018 AND 2020;

.print
.print --------------------------------------------------------------------------------------------
.print  Query 3: SELECT for attributes matching a list of values
.print  Run the SQL command that returns the albums with band_ids of either 1, 3, or 4.
.print --------------------------------------------------------------------------------------------
.print

SELECT title FROM albums
  WHERE band_id IN (1, 3, 4);

.print
.print --------------------------------------------------------------------------------------------
.print  INTERMEDIATE Query 1: SELECT for attributes matching a pattern
.print  Run the SQL command that returns the albums with titles that start with 'The'.
.print --------------------------------------------------------------------------------------------
.print

SELECT title FROM albums
  WHERE title LIKE 'The%';

.print
.print --------------------------------------------------------------------------------------------
.print  INTERMEDIATE Query 2: SELECT ordered data
.print  Run the SQL command that returns the albums that have the two highest sales numbers.
.print --------------------------------------------------------------------------------------------
.print

SELECT title FROM albums
  ORDER BY num_sold DESC
  LIMIT 2;

.print
.print --------------------------------------------------------------------------------------------
.print  ADVANCED Query 3: SELECT in the middle of ordered data
.print  Run the SQL command that returns the next two highest sales numbers (only the third and fourth highest sales).
.print --------------------------------------------------------------------------------------------
.print

SELECT title FROM albums
  ORDER BY num_sold DESC
  LIMIT 2 OFFSET 2;

.print

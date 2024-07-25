
-- STEP 1: Write a query to determine the number of cats stored in the database.
.print Total Cats:
SELECT COUNT(*) AS cat_count
FROM cats;
.print

-- STEP 2: Write a query for the oldest cat, and the year it was born.
--         Write a query for the youngest cat, and the year it was born.

-- Oldest Cat:
.print Oldest Cat:

-- SELECT name, MIN(birth_year) AS year_born FROM cats;

SELECT name FROM cats
WHERE birth_year = (
    SELECT MIN(birth_year) FROM cats
    );

.print

-- Youngest Cat:
.print Youngest Cat:

-- SELECT name, MAX(birth_year) AS year_born FROM cats;

SELECT name FROM cats
WHERE birth_year = (
    SELECT MAX(birth_year) FROM cats
    );
.print

-- Combined Queries
.print Oldest and Youngest cats:
SELECT name, birth_year FROM cats
WHERE birth_year = (
        SELECT MIN(birth_year) FROM cats
    )
    OR
    birth_year = (
        SELECT MAX(birth_year) FROM cats
    );
.print

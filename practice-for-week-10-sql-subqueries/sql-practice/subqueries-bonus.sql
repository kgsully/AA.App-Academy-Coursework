-- Phase 1: Dynamic INSERT using subquery with multiple insertions
-- Give all cats born before the year 2013 a new toy named "Cat Bed" using a subquery.
-- Verify the insertion created a new toy named "Cat Bed" for the cats "Tiger", "Oscar", and "Garfield".
.print
.print Inserting Cat Bed as toy for cats born before 2013
INSERT INTO toys (name, cat_id)
SELECT 'Cat Bed', id
FROM cats
WHERE birth_year < 2013;

.print
.print Verifying for Tiger, Oscar, & Garfield
SELECT cats.name, toys.name FROM cats
JOIN toys ON (toys.cat_id = cats.id)
WHERE cats.name IN ('Tiger', 'Oscar', 'Garfield') AND toys.name = 'Cat Bed';

-- Phase 2: Backup the tables using subquery

-- Backup the cats table in a table called cats_backup using a subquery.
-- The cats_backup table has already been created for you in build-db.sql.
-- Verify that the cats_backup table has the same rows as the cats table.
.print
.print Backup cats table to cats_backup & verify # of rows are the same

INSERT INTO cats_backup
SELECT * FROM cats;

.print Count - cats:
SELECT COUNT(*) from cats;
.print Count - cats_backup:
SELECT COUNT(*) from cats_backup;


-- Backup the toys table in a table called toys_backup using a subquery.
-- The toys_backup table has already been created for you in build-db.sql.
-- Verify that the toys_backup table has the same rows as the toys table.
.print
.print Backup cats table to cats_backup & verify # of rows are the same

INSERT INTO toys_backup
SELECT * FROM toys;

.print Count - toys:
SELECT COUNT(*) from toys;
.print Count - toys_backup:
SELECT COUNT(*) from toys_backup;

.print

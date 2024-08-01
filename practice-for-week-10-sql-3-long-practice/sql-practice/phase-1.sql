.read build-cats.sql

--Insert new cat named "Red" born this year
-- Your code here
INSERT INTO cats (name, birth_year)
VALUES
    ('Red', '2024');


--Assign ownership of new cat to George Beatty using subqueries
-- Your code here

INSERT INTO cat_owners (cat_id, owner_id)
VALUES (
    (SELECT id FROM cats WHERE name = 'Red'),
    (SELECT id FROM owners WHERE first_name = 'George' AND last_name = 'Beatty')
    );

--Query to verify INSERTs worked properly
-- Your code here
.print
.print Phase 1:
SELECT cats.name, concat(owners.first_name, ' ', owners.last_name) FROM cat_owners
JOIN cats ON (cat_owners.cat_id = cats.id)
JOIN owners ON (cat_owners.owner_id = owners.id)
WHERE cats.name = 'Red';
.print

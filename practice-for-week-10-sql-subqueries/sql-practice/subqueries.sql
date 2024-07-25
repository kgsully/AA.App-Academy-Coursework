-- Phase 1: Replace JOIN query with subquery
-- Write a JOIN query to get the list of toys belonging to Garfield.
-- Rewrite the JOIN query using a subquery instead.
.print
.print JOIN query:
SELECT toys.name FROM toys
JOIN cats ON (toys.cat_id = cats.id)
WHERE cats.name = 'Garfield';

.print
.print Subquery:
SELECT toys.name FROM toys
WHERE cat_id IN (
    SELECT id FROM cats
    WHERE name = 'Garfield'
    );
.print

-- Phase 2: Dynamic INSERT using subquery
-- Give Garfield a new toy named "Pepperoni" using a subquery for Garfield's id.
-- Verify the insertion worked using one of the queries above.
.print Insert toy:
INSERT INTO toys (name, cat_id)
VALUES (
    'Pepperoni',
    (
    SELECT id FROM cats
    WHERE name = 'Garfield'
    )
);

.print
.print Verify Toy:
SELECT toys.name FROM toys
WHERE cat_id IN (
    SELECT id FROM cats
    WHERE name = 'Garfield'
    );
.print

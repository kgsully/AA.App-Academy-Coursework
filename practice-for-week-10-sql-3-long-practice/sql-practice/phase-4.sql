.read phase-3.sql

-- Give "Red" the cat one of every toy the other cats have
-- Your code here

    -- Syntax for dynamic number of multiple insertions:
    -- INSERT INTO toys (name, cat_id)
    -- SELECT 'New Toy', id
    -- FROM cats
    -- WHERE name='Lucky' OR name='Garfield';

.print Phase 4:

INSERT INTO toys (cat_id, name)
SELECT
    -- this is for cat_id
    (SELECT id from cats
    Where (name = 'Red')
    ),
    -- this is for toy name
    name FROM toys
    WHERE cat_id <> (
        SELECT id FROM cats
        WHERE name = 'Red'
    );

-- Query spoiled cats reporting the most spoiled first
-- Your code here
.print

SELECT cats.name, COUNT(toys.name) AS toys_count FROM toys
JOIN cats ON (toys.cat_id = cats.id)
GROUP BY cats.id
HAVING toys_count >= 2
ORDER BY toys_count DESC;

.print

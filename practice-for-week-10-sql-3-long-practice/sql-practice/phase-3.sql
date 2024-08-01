.read phase-2.sql

-- Find the name of the cats co-owned by both George Beatty and Melynda Abshire
-- Your code here

.print Phase 3:

SELECT DISTINCT name
FROM cats
WHERE id IN (
    (SELECT cat_id from cat_owners
     WHERE owner_id IN
        (
            (SELECT id FROM owners
             WHERE (first_name = 'George' AND last_name = 'Beatty')
            )
        )
    )
    )
    AND
    id IN (
    (SELECT cat_id from cat_owners
     WHERE owner_id IN
        (
            (SELECT id FROM owners
             WHERE (first_name = 'Melynda' AND last_name = 'Abshire')
            )
        )
    )
    );

.print

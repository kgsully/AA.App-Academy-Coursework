.read phase-1.sql

-- Using subqueries, find the names of the cats whose owners are either George Beatty or Melynda Abshire
-- Your code here

-- Rewrite the following JOIN query using subqueries instead.

-- SELECT DISTINCT cats.name
-- FROM cats
-- JOIN cat_owners ON cats.id = cat_owners.cat_id
-- JOIN owners ON owners.id = cat_owners.owner_id
-- WHERE (owners.first_name = 'George' AND owners.last_name = 'Beatty')
--    OR (owners.first_name = 'Melynda' AND owners.last_name = 'Abshire');

-- SELECT name FROM cats
-- WHERE (id = (
--     SELECT cat_id from cat_owners
--     WHERE (owner_id =
--             (SELECT id FROM owners
--             WHERE (first_name = 'George' AND last_name = 'Beatty')
--                 OR (first_name = 'Melynda' AND last_name = 'Abshire')
--             )
--         )
--     )
-- );

.print Phase 2:
SELECT DISTINCT name
FROM cats
WHERE id IN (
    (SELECT cat_id from cat_owners
     WHERE owner_id IN
        (
            (SELECT id FROM owners
             WHERE (first_name = 'George' AND last_name = 'Beatty')
                OR (first_name = 'Melynda' AND last_name = 'Abshire')
            )
        )
    )
);
.print

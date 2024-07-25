-- Find All the Toys for Hermione's cats
-- Your code here

-- Query 2: Find All the Toys for Hermione's cats
-- -------------------------------------------------------------------------------------------
-- Write a query to find all toys' names for all the cats with an owner with the first name of "Hermione".
-- You must do this in one query.

--- THREE JOINS
-- SELECT toys.name FROM toys
--     JOIN cats ON (toys.cat_id = cats.id)
--     JOIN cat_owners ON (cat_owners.cat_id = cats.id)
--     JOIN owners ON (cat_owners.owner_id = owners.id)
--     WHERE owners.first_name = 'Hermione';

-- TWO JOINS
SELECT toys.name FROM toys
    JOIN cat_owners ON (cat_owners.cat_id = toys.cat_id)
    JOIN owners ON (cat_owners.owner_id = owners.id)
    WHERE owners.first_name = 'Hermione';

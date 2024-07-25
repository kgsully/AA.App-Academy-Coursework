-- Find Hermione's cats
-- Your code here

-- Query 1: Find Hermione's cats
-- -------------------------------------------------------------------------------------------
-- Write a query to find all the cats' names for the owner with the first name of "Hermione".
-- You must do this in one query.

SELECT cats.name FROM cat_owners
    JOIN cats ON (cat_owners.cat_id = cats.id)
    JOIN owners ON (cat_owners.owner_id = owners.id)
    WHERE owners.first_name = 'Hermione';

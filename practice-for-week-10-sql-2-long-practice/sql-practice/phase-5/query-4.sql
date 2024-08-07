-- Find the first and last names of the owner whose cats are born after the year 2015
-- Your code here

SELECT owners.first_name, owners.last_name from cat_owners
    JOIN cats ON (cat_owners.cat_id = cats.id)
    JOIN owners ON (cat_owners.owner_id = owners.id)
    WHERE cats.birth_year > 2015;

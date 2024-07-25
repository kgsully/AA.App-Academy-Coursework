-- Step 1: Write a query to list the number of toys per cat. (GROUP BY)
.print
.print Number of toys per cat:
SELECT cats.name, COUNT(toys.id) FROM cats
JOIN toys ON (toys.cat_id = cats.id)
GROUP BY cats.name;

-- Step 2: Write a query to determine which cats have been "spoiled" with two or more toys. (HAVING)
.print
.print Cats that have >= 2 toys:
SELECT cats.name, COUNT(toys.id) as num_toys FROM cats
JOIN toys ON (toys.cat_id = cats.id)
GROUP BY cats.name
HAVING num_toys >= 2;
.print

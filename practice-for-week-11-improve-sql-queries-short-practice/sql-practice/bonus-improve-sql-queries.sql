----------
-- Step 0 - Create a Query
----------
-- Query: Find a count of `toys` records that have a price greater than
    -- 55 and belong to a cat that has the color "Olive".

    -- Your code here
-- SELECT COUNT(cats.id) FROM cat_toys
-- JOIN cats ON (cat_toys.cat_id = cats.id)
-- JOIN toys ON (cat_toys.toy_id = toys.id)
-- WHERE cats.color = 'Olive' AND toys.price > 55;

-- Paste your results below (as a comment):
-- 215




----------
-- Step 1 - Analyze the Query
----------
-- Query:

    -- Your code here
-- EXPLAIN QUERY PLAN
-- SELECT COUNT(cats.id) FROM cat_toys
-- JOIN cats ON (cat_toys.cat_id = cats.id)
-- JOIN toys ON (cat_toys.toy_id = toys.id)
-- WHERE cats.color = 'Olive' AND toys.price > 55;

-- Paste your results below (as a comment):
-- |--SCAN cat_toys
-- |--SEARCH cats USING INTEGER PRIMARY KEY (rowid=?)
-- `--SEARCH toys USING INTEGER PRIMARY KEY (rowid=?)

-- What do your results mean?

    -- Was this a SEARCH or SCAN?
    -- It is both. Initially it is a SCAN within the cat_toys table
    -- cat_toys is not indexed and every record is searched

    -- What does that mean?
    -- An index within the cat_toys table may improve efficiency



----------
-- Step 2 - Time the Query to get a baseline
----------
-- Query (to be used in the sqlite CLI):

    -- Your code here
-- .timer on
-- SELECT COUNT(cats.id) FROM cat_toys
-- JOIN cats ON (cat_toys.cat_id = cats.id)
-- JOIN toys ON (cat_toys.toy_id = toys.id)
-- WHERE cats.color = 'Olive' AND toys.price > 55;
-- .timer off

-- Paste your results below (as a comment):
-- 215
-- Run Time: real 0.012 user 0.011689 sys 0.000509


----------
-- Step 3 - Add an index and analyze how the query is executing
----------

-- Create index:

    -- Your code here
-- DROP INDEX IF EXISTS idx_cats_color;
-- CREATE INDEX
--     idx_cats_color
--     ON cats(color);

-- DROP INDEX IF EXISTS idx_toys_price;
-- CREATE INDEX
--     idx_toys_price
--     ON toys(price);

-- DROP INDEX IF EXISTS idx_cat_toys_cat_id;
-- CREATE INDEX
--     idx_cat_toys_cat_id
--     ON cat_toys(cat_id);


-- Analyze Query:
    -- Your code here
-- EXPLAIN QUERY PLAN
-- SELECT COUNT(cats.id) FROM cat_toys
-- JOIN cats ON (cat_toys.cat_id = cats.id)
-- JOIN toys ON (cat_toys.toy_id = toys.id)
-- WHERE cats.color = 'Olive' AND toys.price > 55;

-- Paste your results below (as a comment):
-- |--SEARCH cats USING COVERING INDEX idx_cats_color (color=?)
-- |--SEARCH cat_toys USING INDEX idx_cat_toys_cat_id (cat_id=?)
-- `--SEARCH toys USING INTEGER PRIMARY KEY (rowid=?)


-- Analyze Results:

    -- Is the new index being applied in this query?
    -- Yes




----------
-- Step 4 - Re-time the query using the new index
----------
-- Query (to be used in the sqlite CLI):

    -- Your code here
-- .timer on
-- SELECT COUNT(cats.id) FROM cat_toys
-- JOIN cats ON (cat_toys.cat_id = cats.id)
-- JOIN toys ON (cat_toys.toy_id = toys.id)
-- WHERE cats.color = 'Olive' AND toys.price > 55;
-- .timer off

-- Paste your results below (as a comment):
-- 215
-- Run Time: real 0.001 user 0.000595 sys 0.000865



-- Analyze Results:
    -- Are you still getting the correct query results?
    -- Yes


    -- Did the execution time improve (decrease)?
    -- Yes, although marginally


    -- Do you see any other opportunities for making this query more efficient?
    -- Not for this use case


---------------------------------
-- Notes From Further Exploration
---------------------------------

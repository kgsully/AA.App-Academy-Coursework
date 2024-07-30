----------
-- Step 0 - Create a Query
----------
-- Query: Select all cats that have a toy with an id of 5

    -- Your code here
-- SELECT * FROM cats
-- JOIN cat_toys ON (cats.id = cat_toys.cat_id)
-- WHERE cat_toys.toy_id = 5;

-- Paste your results below (as a comment):

-- 4002|Rachele|Maroon|Foldex Cat|4509|4002|5
-- 31|Rodger|Lavender|Oregon Rex|10008|31|5
-- 77|Jamal|Orange|Sam Sawet|10051|77|5


----------
-- Step 1 - Analyze the Query
----------
-- Query:

    -- Your code here
-- EXPLAIN QUERY PLAN
-- SELECT * FROM cats
-- JOIN cat_toys ON (cats.id = cat_toys.cat_id)
-- WHERE cat_toys.toy_id = 5;

-- Paste your results below (as a comment):
-- |--SCAN cat_toys
-- `--SEARCH cats USING INTEGER PRIMARY KEY (rowid=?)


-- What do your results mean?

    -- Was this a SEARCH or SCAN?
    -- It was both:
    -- It will use a scan (look at every row) on cat_toys to find records with toy_id 5,
    -- it will then use the primary key index in cats to find records which match those for id
    -- for the records from cat_toys that have id of 5

    -- What does that mean?
    -- This means that it will be O(n) time as it includes a SCAN operation to find the intial rows
    -- based upon the WHERE critera



----------
-- Step 2 - Time the Query to get a baseline
----------
-- Query (to be used in the sqlite CLI):

    -- Your code here
-- .timer on
-- SELECT * FROM cats
-- JOIN cat_toys ON (cats.id = cat_toys.cat_id)
-- WHERE cat_toys.toy_id = 5;
-- .timer off

-- Paste your results below (as a comment):
-- 4002|Rachele|Maroon|Foldex Cat|4509|4002|5
-- 31|Rodger|Lavender|Oregon Rex|10008|31|5
-- 77|Jamal|Orange|Sam Sawet|10051|77|5
-- Run Time: real 0.003 user 0.001229 sys 0.001364


----------
-- Step 3 - Add an index and analyze how the query is executing
----------

-- Create index:

    -- Your code here
-- DROP INDEX IF EXISTS idx_cat_toys_cat_id_toy_id;
-- CREATE INDEX
--     idx_cat_toys_toy_id
--     ON cat_toys(toy_id);

-- Analyze Query:
    -- Your code here
-- EXPLAIN QUERY PLAN
-- SELECT * FROM cats
-- JOIN cat_toys ON (cats.id = cat_toys.cat_id)
-- WHERE cat_toys.toy_id = 5;


-- Paste your results below (as a comment):
-- |--SEARCH cat_toys USING INDEX idx_cat_toys_toy_id (toy_id=?)
-- `--SEARCH cats USING INTEGER PRIMARY KEY (rowid=?)


-- Analyze Results:

    -- Is the new index being applied in this query?
    -- Yes, it is now searching cat_toys instead of scanning cat_toys




----------
-- Step 4 - Re-time the query using the new index
----------
-- Query (to be used in the sqlite CLI):

    -- Your code here
-- .timer on
-- SELECT * FROM cats
-- JOIN cat_toys ON (cats.id = cat_toys.cat_id)
-- WHERE cat_toys.toy_id = 5;
-- .timer off

-- Paste your results below (as a comment):
-- 4002|Rachele|Maroon|Foldex Cat|4509|4002|5
-- 31|Rodger|Lavender|Oregon Rex|10008|31|5
-- 77|Jamal|Orange|Sam Sawet|10051|77|5
-- Run Time: real 0.000 user 0.000176 sys 0.000082



-- Analyze Results:
    -- Are you still getting the correct query results?
    -- Yes

    -- Did the execution time improve (decrease)?
    -- Yes

    -- Do you see any other opportunities for making this query more efficient?
    -- Not for this particular use case... explain query plan has search only, no scan.

---------------------------------
-- Notes From Further Exploration
---------------------------------

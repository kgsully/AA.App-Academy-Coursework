-- Step 2
-- Just like with one-to-many relationships, you can filter one table by any
-- associated data on a conected table.
-- Your code here

-- COMMENTING OUT FOR TESTS
-- .print
-- .print --------------------------------------------------------------------------------
-- .print Initial Tables
-- .print --------------------------------------------------------------------------------
-- .print
-- .print Musicians:
-- SELECT * FROM musicians;
-- .print
-- .print Instruments:
-- SELECT * FROM instruments;
-- .print
-- .print Musician / Instruments Join Table:
-- SELECT * FROM musician_instruments;
-- .print

-- .print --------------------------------------------------------------------------------
-- .print Step 2: Filter a query across a joined table
-- .print Run the SQL command that selects the first and last name of each musician
-- .print that plays the piano.
-- .print --------------------------------------------------------------------------------
-- .print

SELECT musicians.first_name, musicians.last_name FROM musician_instruments
    JOIN musicians ON (musician_instruments.musician_id = musicians.id)
    JOIN instruments ON (musician_instruments.instrument_id = instruments.id)
    WHERE instruments.type = 'piano';

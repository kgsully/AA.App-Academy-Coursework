-- Step 1
-- Connecting both sides of a many-to-many relationship involves JOINing the
-- join table on to one side of the relationship, then JOINing the other side
-- on to the join table.
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
-- .print Step 1: SELECT the result of a joined table
-- .print Run the SQL command that joins the musicians and instruments tables together,
-- .print SELECTing both the first name of the musician and the type of instrument.
-- .print --------------------------------------------------------------------------------
-- .print

SELECT musicians.first_name, instruments.type FROM musician_instruments
    JOIN musicians ON (musician_instruments.musician_id = musicians.id)
    JOIN instruments ON (musician_instruments.instrument_id = instruments.id);

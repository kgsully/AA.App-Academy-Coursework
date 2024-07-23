-- This ensures that SQLite enforces FOREIGN KEY constraints
PRAGMA foreign_keys = 1;
DROP TABLE IF EXISTS instruments;
DROP TABLE IF EXISTS musicians;
DROP TABLE IF EXISTS bands;
DROP TABLE IF EXISTS musicians_instruments;

CREATE TABLE bands (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name VARCHAR(100)
);

CREATE TABLE musicians (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100),
  member_of INTEGER NOT NULL,
  FOREIGN KEY (member_of) REFERENCES bands (id),
);

CREATE TABLE instruments (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  type VARCHAR(100) NOT NULL
);

CREATE TABLE musicians_instruments (
  musician_id INTEGER NOT NULL,
  instrument_id INTEGER NOT NULL,
  FOREIGN KEY (musician_id) REFERENCES musicians (id),
  FOREIGN KEY (instrument_id) REFERENCES instruments (id)
);

.print

INSERT INTO bands (name)
  VALUES ('Stone Temple Pilots'),
         ('The Offspring');

.print BANDS:
SELECT * FROM bands;
.print

INSERT INTO musicians (first_name, last_name, member_of)
  VALUES (
    'Scott',
    'Wyland',
    (SELECT id FROM bands
      WHERE name = 'Stone Temple Pilots'
    )
    ),
    (
    'Dexter',
    'Holland',
    (SELECT id FROM bands
      WHERE name = 'The Offspring'
    )
    );

.print MUSICIANS:
SELECT * FROM musicians;
.print

INSERT INTO instruments (type)
  VALUES ('Vocals'),
         ('Guitar');

.print INSTRUMENTS:
SELECT * FROM instruments;
.print

INSERT INTO musicians_instruments (musician_id, instrument_id)
  VALUES (
    (SELECT id FROM musicians WHERE first_name = 'Dexter' AND last_name = 'Holland'),
    (SELECT id FROM instruments WHERE type = 'Vocals')
  ),
  (
    (SELECT id FROM musicians WHERE first_name = 'Dexter' AND last_name = 'Holland'),
    (SELECT id FROM instruments WHERE type = 'Guitar')
  ),
  (
    (SELECT id FROM musicians WHERE first_name = 'Scott' AND last_name = 'Wyland'),
    (SELECT id FROM instruments WHERE type = 'Vocals')
  );

.print musicians_instruments
SELECT * FROM musicians_instruments;
.print

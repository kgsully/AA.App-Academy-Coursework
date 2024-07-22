-- Your code here
DROP TABLE IF EXISTS employees;
DROP TABLE IF EXISTS reviews;
DROP TABLE IF EXISTS parties;

-- .headers on

-- .print
-- .print '----------------------------------------------------'
-- .print ' Database Schema:'
-- .print '----------------------------------------------------'
-- .print

CREATE TABLE employees (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    first_name VARCHAR(20) NOT NULL,
    last_name VARCHAR(20) NOT NULL,
    department VARCHAR(40),
    role VARCHAR(20),
    relationship_with INTEGER DEFAULT NULL
);

CREATE TABLE reviews (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    employee_id INTEGER NOT NULL,
    score DECIMAL(3, 1) NOT NULL CHECK (score BETWEEN 1 AND 10),
    FOREIGN KEY (employee_id) REFERENCES employees (id)
);

CREATE TABLE parties (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    budget DECIMAL (8, 2) NOT NULL DEFAULT 0,
    onsite BOOLEAN DEFAULT 1
);

-- Print schema when initalized
-- .schema

-- .print
-- .print '----------------------------------------------------'
-- .print ' Add Employees:'
-- .print '----------------------------------------------------'
-- .print

-- 01. Add "Michael Scott" to your list of employees in the "Management" department in the role of "Regional Manager"
-- 02. Add "Dwight Schrute" to your list of employees in the "Sales" department in the role of "Assistant Regional Manager"
-- 03. Add "Jim Halpert" to your list of employees in the "Sales" department in the role of "Sales Representative"
-- 04. Add "Pam Beesly" to your list of employees in the "Reception" department in the role of "Receptionist"
-- 05. Add "Kelly Kapoor" to your list of employees in the "Product Oversight" department in the role of "Customer Service Representative"
-- 06. Add "Angela Martin" to your list of employees in the "Accounting" department in the role of "Head of Accounting"
-- 07. Add "Roy Anderson" to your list of employees in the "Warehouse" department in the role of "Warehouse Staff"

INSERT INTO employees (first_name, last_name, department, role)
    VALUES ('Michael', 'Scott', 'Management', 'Regional Manager'),
           ('Dwight', 'Schrute', 'Sales', 'Assistant Regional Manager'),
           ('Jim', 'Halpert', 'Sales', 'Sales Representative'),
           ('Pam', 'Beesly', 'Reception', 'Receptionist'),
           ('Kelly', 'Kapoor', 'Product Oversight', 'Customer Service Representative'),
           ('Angela', 'Martin', 'Accounting', 'Head of Accounting'),
           ('Roy', 'Anderson', 'Warehouse', 'Warehouse Staff');

-- 08. "Roy Anderson" and "Pam Beesly" are in a romantic relationship.
UPDATE employees
    SET relationship_with = (
        SELECT id FROM employees
            WHERE first_name = 'Pam' AND last_name = 'Beesly'
    )
    WHERE first_name = 'Roy' AND last_name = 'Anderson';

UPDATE employees
    SET relationship_with = (
        SELECT id FROM employees
            WHERE first_name = 'Roy' AND last_name = 'Anderson'
    )
    WHERE first_name = 'Pam' AND last_name = 'Beesly';

-- 09. "Ryan Howard" is hired in the "Reception" department as a "Temp" role.
INSERT INTO employees (first_name, last_name, department, role)
    VALUES ('Ryan', 'Howard', 'Reception', 'Temp');

-- 10. An onsite office party is scheduled with a budget of $100.00.
INSERT INTO parties (budget, onsite)
    VALUES (100.00, 1);

-- 11. "Dwight Schrute" gets a performance review with a score of 3.3.
INSERT INTO reviews (employee_id, score)
    VALUES (
        (SELECT id FROM employees WHERE first_name = 'Dwight' AND last_name = 'Schrute'),
        3.3
    );

-- 12. Jim Halpert" gets a performance review with a score of 4.2.
INSERT INTO reviews (employee_id, score)
    VALUES (
        (SELECT id FROM employees WHERE first_name = 'Jim' AND last_name = 'Halpert'),
        4.2
    );

-- 13. "Dwight Schrute"'s past performance review needs to be changed to a score of 9.0.
UPDATE reviews
    SET score = 9.0
    WHERE employee_id = (SELECT id FROM employees WHERE first_name = 'Dwight' AND last_name = 'Schrute');

-- 14. "Jim Halpert"'s past performance review needs to be changed to a score of 9.3.
UPDATE reviews
    SET score = 9.3
    WHERE employee_id = (SELECT id FROM employees WHERE first_name = 'Jim' AND last_name = 'Halpert');

-- 15. "Jim Halpert" is promoted to the role of "Assistant Regional Manager".
UPDATE employees
    SET role = 'Assistant Regional Manager'
    WHERE first_name = 'Jim' AND last_name = 'Halpert';

-- 16. "Ryan Howard" is promoted to the "Sales" department as the role of "Sales Representative".
UPDATE employees
    set department = 'Sales',
        role = 'Sales Representative'
    WHERE first_name = 'Ryan' AND last_name = 'Howard';

-- 17. An onsite office party is scheduled with a budget of $200.00.
INSERT INTO parties (budget, onsite)
    VALUES (200.00, 1);

-- 18. "Angela Martin" and "Dwight Schrute" are in a romantic relationship.
UPDATE employees
    SET relationship_with = (SELECT id FROM employees WHERE first_name = 'Dwight' AND last_name = 'Schrute')
    WHERE first_name = 'Angela' AND last_name = 'Martin';

UPDATE employees
    SET relationship_with = (SELECT id FROM employees WHERE first_name = 'Angela' AND last_name = 'Martin')
    WHERE first_name = 'Dwight' AND last_name = 'Schrute';

-- 19. "Angela Martin" gets a performance review score of 6.2.
INSERT INTO reviews (employee_id, score)
    VALUES(
        (SELECT id FROM employees WHERE first_name = 'Angela' AND last_name = 'Martin'),
        6.2
    );

-- 20. Ryan Howard" and "Kelly Kapoor" are in a romantic relationship.
UPDATE employees
    SET relationship_with = (SELECT id FROM employees WHERE first_name = 'Kelly' AND last_name = 'Kapoor')
    WHERE first_name = 'Ryan' AND last_name = 'Howard';

UPDATE employees
    SET relationship_with = (SELECT id FROM employees WHERE first_name = 'Ryan' AND last_name = 'Howard')
    WHERE first_name = 'Kelly' AND last_name = 'Kapoor';

-- 21. An onsite office party is scheduled with a budget of $50.00.
INSERT INTO parties (budget, onsite)
    VALUES (50.00, 1);

-- 22. "Jim Halpert" moves to another office branch (make sure to remove his relationships and performance reviews if he has any).
--      Jim still works for the company, but at a different branch, so won't remove him from the DB, just null out his fields
UPDATE employees
    SET department = NULL,
        role = NULL,
        relationship_with = NULL
    WHERE first_name = 'Jim' AND last_name = 'Halpert';

-- 23. "Roy Anderson" and "Pam Beesly" are NO LONGER in a romantic relationship.
UPDATE employees
    SET relationship_with = NULL
    WHERE first_name = 'Roy' AND last_name = 'Anderson';

UPDATE employees
    SET relationship_with = NULL
    WHERE first_name = 'Pam' AND last_name = 'Beesly';

-- 24. "Pam Beesly" gets a performance review score of 7.6.
INSERT INTO reviews (employee_id, score)
    VALUES (
        (SELECT id FROM employees WHERE first_name = 'Pam' AND last_name = 'Beesly'),
        7.6
    );

-- 25. "Dwight Schrute" gets another performance review score of 8.7.
INSERT INTO reviews (employee_id, score)
    VALUES (
        (SELECT id FROM employees WHERE first_name = 'Dwight' AND last_name = 'Schrute'),
        8.7
    );

-- 26. "Ryan Howard" quits the office (make sure to remove his relationships and performance reviews if he has any).
DELETE FROM reviews
    WHERE employee_id = (SELECT id FROM employees WHERE first_name = 'Ryan' AND last_name = 'Howard');

UPDATE employees
    SET relationship_with = NULL
    WHERE relationship_with = (SELECT id FROM employees WHERE first_name = 'Ryan' AND last_name = 'Howard');

DELETE FROM employees
    WHERE first_name = 'Ryan' AND last_name = 'Howard';

-- 27. "Jim Halpert" moves back to this office branch's "Sales" department in the role of "Sales Representative"
UPDATE employees
    SET department = 'Sales',
        role = 'Sales Representative'
    WHERE first_name = 'Jim' AND last_name = 'Halpert';

-- 28. "Karen Filippelli" moves from a different office into this office's "Sales" department in the role of "Sales Representative"
INSERT INTO employees (first_name, last_name, department, role)
    VALUES ('Karen', 'Filippelli', 'Sales', 'Sales Representative');

-- 29. "Karen Filippelli" and "Jim Halpert" are in a romantic relationship.
UPDATE employees
    SET relationship_with = (SELECT id FROM employees WHERE first_name = 'Jim' AND last_name = 'Halpert')
    WHERE first_name = 'Karen' AND last_name = 'Filippelli';

UPDATE employees
    SET relationship_with = (SELECT id FROM employees WHERE first_name = 'Karen' AND last_name = 'Filippelli')
    WHERE first_name = 'Jim' AND last_name = 'Halpert';

-- 30. An onsite office party is scheduled with a budget of $120.00.
INSERT INTO parties (budget, onsite)
    VALUES (120.00, 1);

-- 31. The onsite office party scheduled right before this is canceled, and an offsite office party is scheduled instead with a budget of $300.00.
DELETE FROM parties
    ORDER BY id DESC LIMIT 1;

INSERT INTO parties (budget, onsite)
    VALUES (300.00, 0);

-- 32. "Karen Filippelli" and "Jim Halpert" are NO LONGER in a romantic relationship.
UPDATE employees
    SET relationship_with = NULL
    WHERE first_name = 'Jim' AND last_name = 'Halpert';

UPDATE employees
    SET relationship_with = NULL
    WHERE first_name = 'Karen' AND last_name = 'Filippelli';

-- 33. "Pam Beesly" and "Jim Halpert" are in a romantic relationship.
UPDATE employees
    SET relationship_with = (SELECT id FROM employees WHERE first_name = 'Jim' AND last_name = 'Halpert')
    WHERE first_name = 'Pam' AND last_name = 'Beesly';

UPDATE employees
    SET relationship_with = (SELECT id FROM employees WHERE first_name = 'Pam' AND last_name = 'Beesly')
    WHERE first_name = 'Jim' AND last_name = 'Halpert';

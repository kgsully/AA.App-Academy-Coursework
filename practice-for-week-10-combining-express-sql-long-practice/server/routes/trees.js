// Instantiate router - DO NOT MODIFY
const express = require('express');
const router = express.Router();

/**
 * BASIC PHASE 2, Step A - Instantiate SQLite and database
 *   - Database file: "data_source" environment variable
 *   - Database permissions: read/write records in tables
 */
// Your code here
const data_source = process.env.DATA_SOURCE;
const sqlite3 = require('sqlite3');
const db = new sqlite3.Database(data_source, sqlite3.OPEN_READWRITE);

/**
 * BASIC PHASE 2, Step B - List of all trees in the database
 *
 * Protocol: GET
 * Path: /
 * Parameters: None
 * Response: JSON array of objects
 *   - Object properties: height-ft, tree, id
 *   - Ordered by the height_ft from tallest to shortest
 */
// Your code here
router.get('/', (req, res, next) => {
    const query = 'SELECT id, tree FROM trees ORDER BY tree';
    const params = [];

    db.all(query, params, (err, rows) => {
        if(err) {
            next(err);
        } else {
            res.status(200).json(rows);
        }
    });
});

/**
 * BASIC PHASE 3 - Retrieve one tree with the matching id
 *
 * Path: /:id
 * Protocol: GET
 * Parameter: id
 * Response: JSON Object
 *   - Properties: id, tree, location, height_ft, ground_circumference_ft
 */
// Your code here
router.get('/:id', (req, res, next) => {
    // check to see if the id in the GET request is a number
    if (!(/^\d+$/.test(req.params.id))) {
        res.status(400).json({message: "Error: Invalid tree ID"});
    }

    // if it is an integer numeric value, query the database for the id
    else {
        const treeId = Number(req.params.id);
        const params = [treeId];

        const query = 'SELECT * FROM trees WHERE id = ?';

        db.get(query, params, (err, row) => {
            if (err) {
                next(err);
            } else if (!row){
                res.status(400).json({message: "Tree ID not found in database..."});
            } else {
                res.status(200).json(row);
            }
        });
    }
});

/**
 * INTERMEDIATE PHASE 4 - INSERT tree row into the database
 *
 * Path: /trees
 * Protocol: POST
 * Parameters: None
 * Response: JSON Object
 *   - Property: message
 *   - Value: success
 */
// Your code here
router.post('/', (req, res) => {
    const {name, location, height, size} = req.body;
    if (name && location && height && size) {
        const query = `INSERT INTO trees (tree, location, height_ft, ground_circumference_ft)
                            VALUES (?, ?, ?, ?);`

        const params = [name, location, height, size];

        db.run(query, params, (err, rows) => {
            if (err) {
                next(err);
            } else {
                res.status(201).json({message: "success"});
            }
        })

    } else {
        res.status(400).json({message: "Error with POST body"});
    }
});

/**
 * INTERMEDIATE PHASE 5 - DELETE a tree row from the database
 *
 * Path: /trees/:id
 * Protocol: DELETE
 * Parameter: id
 * Response: JSON Object
 *   - Property: message
 *   - Value: success
 */
// Your code here
router.delete('/:id', (req, res) => {
    // check to see if the id in the GET request is a number
    if (!(/^\d+$/.test(req.params.id))) {
        res.status(400).json({message: "Error: Invalid tree ID"});
    }

    // if it is an integer numeric value, query the database for the id
    else {
        const treeId = Number(req.params.id);
        const selQuery = 'SELECT * FROM trees WHERE id = ?;';
        const delQuery = `DELETE FROM trees
                       WHERE id = ?;`;
        const params = [treeId];

        // SELECT to determine if requested tree id exists:
        db.get(selQuery, params, (err, row) => {
            console.log(row);
            if (row) {
                db.run(delQuery, params, (err, rows) => {
                    if (err) {
                        next(err);
                    } else {
                        res.status(200).json({message: 'success'});
                    }
                });
            } else {
                res.status(400).json({message: "Tree ID not found in database"})
            }
        });
    }
});

/**
 * INTERMEDIATE PHASE 6 - UPDATE a tree row in the database
 *
 * Path: /trees/:id
 * Protocol: PUT
 * Parameter: id
 * Response: JSON Object
 *   - Property: message
 *   - Value: success
 */
// Your code here
router.put('/:id', (req, res, next) => {
    // check to see if the id in the GET request is a number
    if (!(/^\d+$/.test(req.params.id))) {
        res.status(400).json({message: "Error: Invalid tree ID"});
    }

    // if it is an integer numeric value, query the database for the id
    else {
        const treeId = Number(req.params.id);
        const {id, name, location, height, size} = req.body;
        const params = [name, location, height, size, id];
        const updQuery = `UPDATE trees
                       SET
                        tree = ?,
                        location = ?,
                        height_ft = ?,
                        ground_circumference_ft = ?
                       WHERE id = ?;`;

        if (treeId !== id) {
            res.status(400).json({error: "ids do not match"});
        } else {
            db.run(updQuery, params, (err, rows) => {
                if (err) {
                    next(err);
                } else {
                    db.get('SELECT * FROM trees WHERE id = ?', [id], (err, row) => {
                        if (err) {
                            next(err);
                        } else {
                            res.status(200).json(row);
                        }
                    });
                }
            });
        }
    }
});

// Export class - DO NOT MODIFY
module.exports = router;

// Instantiate router - DO NOT MODIFY
const express = require('express');
const router = express.Router();

// Import models - DO NOT MODIFY
const { Insect, Tree } = require('../db/models');
const { Op } = require("sequelize");

/**
 * PHASE 7 - Step A: List of all trees with insects that are near them
 *
 * Approach: Eager Loading
 *
 * Path: /trees-insects
 * Protocol: GET
 * Response: JSON array of objects
 *   - Tree properties: id, tree, location, heightFt, insects (array)
 *   - Trees ordered by the tree heightFt from tallest to shortest
 *   - Insect properties: id, name
 *   - Insects for each tree ordered alphabetically by name
 */
router.get('/trees-insects', async (req, res, next) => {
    let trees = [];

    trees = await Tree.findAll({
        attributes: ['id', 'tree', 'location', 'heightFt'],
        where: {

        },
        include: {
            model: Insect,
            // use required: true to force the query to return only records which have an associated model, effectively
            // converting the query from the default outer join to an inner join. Also works on nested includes
            required: true,
            attributes: ['id', 'name'],
            // for many to many attributes, the 'through' option defines what gets returned from the join table,
            // providing an empty array will then not fetch the extra properties from the join table
            through: {
                attributes: []
            },
        },
        // order: 1st [] is for top level ordering, second [] is for 1st level of nested values, etc
        order: [ ['heightFt', 'DESC'], [Insect, 'name', 'ASC'] ]
    });


    res.json(trees);
});

/**
 * PHASE 7 - Step B: List of all insects with the trees they are near
 *
 * Approach: Lazy Loading
 *
 * Path: /insects-trees
 * Protocol: GET
 * Response: JSON array of objects
 *   - Insect properties: id, name, trees (array)
 *   - Insects for each tree ordered alphabetically by name
 *   - Tree properties: id, tree
 *   - Trees ordered alphabetically by tree
 */
router.get('/insects-trees', async (req, res, next) => {
    let payload = [];

    const insects = await Insect.findAll({
        attributes: ['id', 'name', 'description'],
        order: [ ['name'] ],
    });
    for (let i = 0; i < insects.length; i++) {
        const insect = insects[i];

        // Start added code
        const trees = await insect.getTrees({
            attributes: ['id', 'tree'],
            // joinTableAttributes for lazy loading works similarly to the through: { attributes: [] } method in
            // an include (eager loading)
            joinTableAttributes: [],
            order: [ ['tree'] ]
        });
        // End added code

        payload.push({
            id: insect.id,
            name: insect.name,
            description: insect.description,
            // added trees for payload return
            trees: trees
        });
    }

    res.json(payload);
});

/**
 * ADVANCED PHASE 3 - Record information on an insect found near a tree
 *
 * Path: /associate-tree-insect
 * Protocol: POST
 * Parameters: None
 * Request Body: JSON Object
 *   - Property: tree Object
 *     with id, name, location, height, size
 *   - Property: insect Object
 *     with id, name, description, fact, territory, millimeters
 * Response: JSON Object
 *   - Property: status
 *     - Value: success
 *   - Property: message
 *     - Value: Successfully recorded information
 *   - Property: data
 *     - Value: object (the new tree)
 * Expected Behaviors:
 *   - If tree.id is provided, then look for it, otherwise create a new tree
 *   - If insect.id is provided, then look for it, otherwise create a new insect
 *   - Relate the tree to the insect
 * Error Handling: Friendly messages for known errors
 *   - Association already exists between {tree.tree} and {insect.name}
 *   - Could not create association (use details for specific reason)
 *   - (Any others you think of)
 */
// Your code here

router.post('/associate-tree-insect', async (req, res, next) => {
    try {
        const { tree, insect } = req.body;
        let ascTree;
        let ascInsect;
        const error = new Error();

        if (!tree) {
            error = {
                status: "error",
                message: "tree missing in request"
            };

            throw error;
        }

        if (!insect) {
            error = {
                status: "error",
                message: "insect missing in request"
            };
            throw error;
        }


        if (tree) {
            if (tree.id) {
                ascTree = await Tree.findOne({
                    where: {
                        id: id
                    }
                });
                if (!ascTree) {
                    res.status(400).json({
                        status: "not-found",
                        message: "Tree not found"
                    });
                }
            } else {
                ascTree = await Tree.create({
                    tree: tree.name,
                    location: tree.location,
                    heightFt: tree.height,
                    groundCircumferenceFt: tree.size
                });
            }
        }

        if (insect){
            if (insect.id) {
                ascInsect = await Insect.findOne({
                    where: {
                        id: id
                    }
                });
                if (!ascInsect) {
                    res.status(400).json({
                        status: "not-found",
                        message: "Insect not found"
                    });
                }
            } else {
                ascInsect = await Insect.create(insect);
            }
        }

        if (tree && insect) {
            if (await ascTree.hasInsect(ascInsect) && await ascInsect.hasTree(ascTree)) {
                error = {
                    status: "error",
                    message: `Association already exists between ${ascTree.tree} and ${ascInsect.name}`
                };
                throw error;
            } else {
                await ascInsect.addTree(ascTree);
                res.json({
                    status: 'success',
                    message: 'Successfully created association',
                    data: { tree, insect }
                });
            }
        }
    }
    catch (error) {
        next(error);
    }
});

// Export class - DO NOT MODIFY
module.exports = router;

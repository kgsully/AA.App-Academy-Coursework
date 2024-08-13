// Instantiate router - DO NOT MODIFY
const express = require('express');
const router = express.Router();

const { Op } = require("sequelize");
const { Insect } = require("../db/models");

/**
 * INTERMEDIATE BONUS PHASE 2 (OPTIONAL) - Code routes for the insects
 *   by mirroring the functionality of the trees
 */
// Your code here

router.get('/', async (req, res, next) => {
    let trees = [];

    // Your code here
    trees = await Tree.findAll({
        attributes: ['id', 'name', 'millimeters'],
        order: [ ['milimeters', 'ASC'] ]
    })

    res.json(trees);
});

router.get('/:id', async (req, res, next) => {
    let insect;

    try {
        // Your code here
        insect = await Insect.findOne({
            where: {
                id: req.params.id
            }
        })

        if (insect) {
            res.json(insect);
        } else {
            next({
                status: "not-found",
                message: `Could not find insect ${req.params.id}`,
                details: 'Insect not found'
            });
        }
    } catch(err) {
        next({
            status: "error",
            message: `Could not find insect ${req.params.id}`,
            details: err.errors ? err.errors.map(item => item.message).join(', ') : err.message
        });
    }
});

router.post('/', async (req, res, next) => {
    try {

        const { name, description, fact, territory, millimeters } = req.body;
        const newTree = await Tree.create({
            name: name,
            description: description,
            fact: fact,
            territory: territory,
            millimeters: millimeters
        });

        const newInsectData = await Insect.findOne({
            where: {
                name: name
            }
        });

        res.json({
            status: "success",
            message: "Successfully created new insect",
            data: newInsectData
        });
    } catch(err) {
        next({
            status: "error",
            message: 'Could not create new insect',
            details: err.errors ? err.errors.map(item => item.message).join(', ') : err.message
        });
    }
});

router.delete('/:id', async (req, res, next) => {
    try {
        const delInsect = await Insect.findOne ({
            where: {
                id: req.params.id
            }
        });
        if (!delInsect) {
            next({
                status: "not-found",
                message: `Could not remove insect ${req.params.id}`,
                details: 'Tree not found'
            })
        } else {
            await Insect.destroy({
                where: {
                    id: req.params.id
                }
            });

            res.json({
                status: "success",
                message: `Successfully removed insect ${req.params.id}`,
            });
        }

    } catch(err) {
        next({
            status: "error",
            message: `Could not remove insect ${req.params.id}`,
            details: err.errors ? err.errors.map(item => item.message).join(', ') : err.message
        });
    }
});

router.put('/:id', async (req, res, next) => {
    try {
        // Your code here

        const { id, name, description, fact, territory, millimeters } = req.body;

        const updInsect = await Tree.findOne({
            where: {
                id: req.params.id
            }
        });

        // Custom Error Handling 1
        if (id !== Number(req.params.id)) {
            next ({
                status: "error",
                message: `Could not update insect`,
                details: `${req.params.id} does not match ${id}`

            });
        } else if (!updInsect) {
            next ({
                status: "not-found",
                message: `Could not update insect ${req.params.id}`,
                details: `Insect not found`
            });
        } else {
            updInsect.set({
                name: name || updInsect.name,
                description: description || updInsect.description,
                fact: fact || updInsect.fact,
                territory: territory || updInsect.territory,
                millimeters: millimeters || updInsect.millimeters
            });
            await updTree.save();

            res.status(200).json({
                status: "success",
                message: "Successfully updated insect",
                data: updInsect
            });
        }

    } catch(err) {
        next({
            status: "error",
            message: 'Could not update new insect',
            details: err.errors ? err.errors.map(item => item.message).join(', ') : err.message
        });
    }
});

router.get('/search/:value', async (req, res, next) => {
    let insects = [];
    insects = await Insect.findAll({
        attributes: ['id', 'name', 'millimeters'],
        where: {
            name: {
                [Op.like]: `%${req.params.value}%`
            }
        },
        order: [['name', 'ASC']]
    });


    res.json(insects);
});

// Export class - DO NOT MODIFY
module.exports = router;

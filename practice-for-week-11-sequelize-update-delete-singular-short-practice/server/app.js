// Instantiate Express and the application - DO NOT MODIFY
const express = require('express');
const app = express();

// Error handling, env variables, and json middleware - DO NOT MODIFY
require('express-async-errors');
require('dotenv').config();
app.use(express.json());

// Import the models used in these routes - DO NOT MODIFY
const { Puppy } = require('./db/models');

// Index of all puppies - DO NOT MODIFY
app.get('/puppies', async (req, res, next) => {
    const allPuppies = await Puppy.findAll({order: [['name', 'ASC']]});

    res.json(allPuppies);
});


// STEP 1: Update a puppy by id
app.put('/puppies/:puppyId', async (req, res, next) => {
    // Your code here
    const { ageYrs, weightLbs, microchipped } = req.body;

    if (!ageYrs && !weightLbs && !microchipped) {

        res.status(400).json({message: "Error with request body"});

    } else {

        try {

            const updatePuppy = await Puppy.findByPk(req.params.puppyId);

            if (updatePuppy) {

                if (ageYrs) {
                    updatePuppy.ageYrs = ageYrs;
                }
                if (weightLbs) {
                    updatePuppy.weightLbs = weightLbs;
                }
                if (microchipped) {
                    updatePuppy.microchipped = microchipped;
                }

                await updatePuppy.save();
                const updatedPuppy = await Puppy.findByPk(req.params.puppyId);

                res.status(200).json({message: `Successfully updated puppy with id ${req.params.puppyId}.`, puppy: updatedPuppy});

            } else {
                res.status(404).json({message: "Puppy with requested ID not found"});
            }

        }
        catch (err) {
            throw err;
        }
    }
})

// STEP 2: Delete a puppy by id
app.delete('/puppies/:puppyId', async (req, res, next) => {
    // Your code here
    try {
        const delPuppy = await Puppy.findByPk(req.params.puppyId);
        // res.status(200).json({puppy: delPuppy});
        // console.log(JSON.stringify(delPuppy));
        // Verify puppy to delete is in the database, if not send back message indicating as such
        if (!delPuppy) {
            res.status(404).json({message: "Puppy with requested ID not found"});
        } else {
            await delPuppy.destroy();

            res.status(200).json({message: `Successfully deleted puppy with id ${req.params.puppyId}.`, puppy: delPuppy});
        }
    }
    catch(err) {
        throw err;
    }
})


// Root route - DO NOT MODIFY
app.get('/', (req, res) => {
    res.json({
        message: "API server is running"
    });
});

// Set port and listen for incoming requests - DO NOT MODIFY
if (require.main === module) {
    const port = 8000;
    app.listen(port, () => console.log('Server is listening on port', port));
} else {
    module.exports = app;
}

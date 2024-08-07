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
    const allPuppies = await Puppy.findAll({ order: [['name', 'ASC']] });

    res.json(allPuppies);
});


// STEP 1
// Capture the name, ageYrs, breed, weightLbs, and microchipped attributes
// from the body of the request.
// Use these values to BUILD a new Puppy in the database.
// Respond to the request by sending a success message
app.post('/puppies/build', async (req, res, next) => {
    // Your code here

    try{
        const { name, ageYrs, breed, weightLbs, microchipped } = req.body;
        // console.log(name, ageYrs, breed, weightLbs, microchipped);

        const newPuppy = Puppy.build({
            name: name,
            ageYrs: ageYrs,
            breed: breed,
            weightLbs: weightLbs,
            microchipped: microchipped
        });
        // console.log(newPuppy);
        if (!(
            await Puppy.findOne({
                where: {
                    name: name
                }
            })
        )) {
            await newPuppy.save()
            const puppy = await Puppy.findOne({
                where: {
                    name: name
                }
            });
            res.status(200).json({message: "Success", data: puppy});
        } else {
            res.status(400).json({message: "Failed to add puppy - puppy already exists"});
        }
    }
    catch(err) {
        throw err;
    }
})

// STEP 2
// Capture the name, ageYrs, breed, weightLbs, and microchipped attributes
// from the body of the request.
// Use these values to CREATE a new Puppy in the database.
// Respond to the request by sending a success message
app.post('/puppies/create', async (req, res, next) => {
    // Your code here
    try{
        const { name, ageYrs, breed, weightLbs, microchipped } = req.body;
        // console.log(name, ageYrs, breed, weightLbs, microchipped);
        if (!(
            await Puppy.findOne({
                where: {
                    name: name
                }
            })
        )) {
            await Puppy.create({
                name: name,
                ageYrs: ageYrs,
                breed: breed,
                weightLbs: weightLbs,
                microchipped: microchipped
            });
            const puppy = await Puppy.findOne({
                where: {
                    name: name
                }
            })
            res.status(200).json({message: "Success", data: puppy});
        }
        else {
            res.status(400).json({message: "Failed to add puppy - puppy already exists"});
        }
    }
    catch (err) {
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

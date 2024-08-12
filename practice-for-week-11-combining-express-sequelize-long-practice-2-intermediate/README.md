# Long Practice - Intermediate Sequelize

In this long practice, you will be using **Sequelize** in an **Express** server to run migrations, seed the database, and connect `GET`, `PUT`, `DELETE` and `UPDATE` routes to their appropriate database operations.

This project parallels one you completed in SQL. Hopefully through this process, you'll develop a better appreciation for the power of **Sequelize** to simplify database operations.

## Getting started

Download the project using the blue starter link button above. `cd` into **server** folder, and install dependencies using `npm install`.

Create a **server/.env** file in order to store environment variables. Add a variable `DB_FILE` (which is already in use in **server/config/database.js**). You can model the **.env** file after **.env.example**, specifying the location of the database to be created.

Notice that the starter includes **server/.sequelizerc** and **server/config/database.js**, as well as **migrations**, **models**, and **seeders** in the **server/db** folder.

### Migrations and seeders

Run the appropriate `migrate` command using the **Sequelize CLI** to create the database and the table(s) specified in the existing migrations.

> Remember: You'll need `dotenv` before `npx` in order to set the environment variable for the database file location.

Verify that the **db/dev.db** file was created. If you encounter any errors or do not see this file, go back and check that your **.env** file has been accurately set up.

Verify the table exists by checking its `schema` using the **Sqlite CLI**.

Run the appropriate seed command using the **Sequelize CLI**.

Verify the table has data using the **Sqlite CLI**.

### Run the application

Start the **Express** server in development mode using

```
npm run dev
```

In your browser or **Postman**, load the root path: [http://localhost:5000/](http://localhost:5000/)

If all is working correctly, you should see `{"message":"API server is running"}`.

## Phases

This project has been broken down into phases. Complete as much as you can in the time allotted. You can complete any remaining phases for additional practice during assessment prep.

If you get stuck, try moving on to the next phase for now, then come back later in the project to complete or improve your code. Also, you can formulate good questions, and reach out to your instructors for help.

## References

You may refer to your previous work, the [Sequelize documentation](https://sequelize.org/master/manual/getting-started.html#new-databases-versus-existing-databases), the documentation for [Sequelize CLI](https://github.com/sequelize/cli), or online resources to assist you in completing this practice.

Good luck! You can do it!!!

# Phase 1 - Join Table Associations

In this phase, you will upgrade the database to track which insects have been spotted on or near which trees.
{
  ​￼"tree": {
    "id": 1
  },
  ​￼"insect": {
     "id": 3
  }
}
## Review the requirements

Each type of insect can be seen near any type of tree, and each tree could have multiple insects nearby. How do you model this type of relationship in a relational database like **SQL**?

Question: What attributes are needed in the JOIN table and what constraints or validations are required to meet these specifications?

Answer:

|attribute|type|constraints|
|---|---|---|
|insectId|integer|NOT NULL, FOREIGN KEY REFERENCES Insect(id), ON DELETE CASCADE|
|treeId|integer|NOT NULL, FOREIGN KEY REFERENCES Tree(id), ON DELETE CASCADE|

## Create model and migration

Use **Sequelize CLI** command to create the model `InsectTree` with its migration including the appropriate attributes. Modify the migration and/or model files to add the constraints and validations as necessary to meet the specifications above.

> Think about it: Is there anything that needs to be done with `createdAt` or `updatedAt`?

Run the appropriate `migrate` command using the **Sequelize CLI**.

Verify the table exists by checking its `schema` using the **Sqlite CLI**.

## Add associations

In both models of this relationship, `Insect` and `Tree`, create a `belongsToMany` association. Be sure to indicate which model you are connecting to and that you are connecting through the `InsectTree` model.

In the next phase, you will interact with these associations as you implement dynamic seeding. If you run into any errors, you may revisit this phase.

# Phase 2 - Dynamic Seeding

In this phase, you will generate seed data for the insects seen at each tree.

The scientists say that the **Western Pygmy Blue Butterfly** was seen at the biggest trees EXCEPT **President**, and the **Patu Digua Spider** was only found near **Stagg**, so far.

For additional practice, you can pretend to be a scientist and decide which other insects were found near which trees.

## Create seeder

Run the **Sequelize CLI** command to create a new seeder named `starter-insect-tree`.

Open the seeder file for editing.

## Build seed data

Since you want to make sure you are referencing the correct records by content (NOT hard-coded `ids`), you will need to dynamically seed the `InsectTree` JOIN table by first querying references to the `Insects` and `Trees` tables.

Follow the standard steps for dynamic seed data:

- Create a constant to hold the provided seed data:

``` js
[
  {
    insect: { name: "Western Pygmy Blue Butterfly" },
    trees: [
      { tree: "General Sherman" },
      { tree: "General Grant" },
      { tree: "Lincoln" },
      { tree: "Stagg" },
    ],
  },
  {
    insect: { name: "Patu Digua Spider" },
    trees: [
      { tree: "Stagg" },
    ],
  },
]
```

- Modify the `up` function to insert the seed data.
- Modify the `down` function to remove the seed data.
- Use the **Sequelize CLI** to run the seeder.
- Verify the `InsectTrees` records exist using the **Sqlite CLI**.

> Tip: Code and verify incrementally:
>
> - Start with a subset of the seed data in the constant, run the seeder, > and verify it worked.
> - Then undo the seed, add more data, and rerun the seeder. Verify again.
> - Repeat until all seed data is working. :)
>
> Fewer lines of code leaves less room for typos or errors, and speeds up debugging since you can focus just a few changes since it the last working version.

If you get stuck on a particular item, comment it out and move on. You can come back to it later in this practice, or during assessment prep.

If you have an error you can't solve after reasonable debugging and research, formulate a good question, and reach out to your instructors.

# Phase 3 - Fetching Related Records

In this phase, you'll update a couple routes to return data containing both `Trees` and `Insects`.

## Setup

Run the **Express** application:

```
npm run dev
```

Open the routes file where you'll need to make changes: **server/routes/joined.js**.

Look at your notes or the [Sequelize Documentation](https://sequelize.org/master/manual/assocs.html#fetching-associations---eager-loading-vs-lazy-loading) if you need a refresher on Eager vs. Lazy Loading.

## Eager loading

Find the route for the path `/trees-insects`. Implement the eager loading approach, to include the `insects` near each of the trees. Please return only the `id` and `name` for each `Insect`, and order them alphabetically.

### Challenge 1: Only return trees that have insects near them

That means, the trees with `insects: []` would be omitted.

You can find information on the solution by going to the [Eager Loading Documentation](https://sequelize.org/master/manual/eager-loading.html).

> Hint: You may need to look through the first 4-5 sections, or so.

### Challenge 2: Prevent the relationship data from showing up in the output

You can find information on the solution by going to the documentation for [Eager loading with Many-to-Many relationships](https://sequelize.org/master/manual/eager-loading.html#eager-loading-with-many-to-many-relationships).

### Result

If you complete both challenges, the response will look something like

``` json
[{
    "id": 1,
    "tree": "General Sherman",
    "location": "Sequoia National Park",
    "heightFt": 274.9,
    "Insects": [{
        "id": 1,
        "name": "Western Pygmy Blue Butterfly"
    }]
}, {
    "id": 2,
    "tree": "General Grant",
    "location": "Kings Canyon National Park",
    "heightFt": 268.1,
    "Insects": [{
        "id": 1,
        "name": "Western Pygmy Blue Butterfly"
    }]
}, {
    "id": 4,
    "tree": "Lincoln",
    "location": "Sequoia National Park",
    "heightFt": 255.8,
    "Insects": [{
        "id": 1,
        "name": "Western Pygmy Blue Butterfly"
    }]
}, {
    "id": 5,
    "tree": "Stagg",
    "location": "Private Land",
    "heightFt": 243,
    "Insects": [{
        "id": 2,
        "name": "Patu Digua Spider"
    }, {
        "id": 1,
        "name": "Western Pygmy Blue Butterfly"
    }]
}]
```

## Lazy loading

Find the route for the path `/insects-trees`. Implement the lazy loading approach, to include the `insects` near each of the trees. Please return only the `id` and `tree` for each `Tree`, and order them alphabetically.

### Result

If you complete both challenges, the response will look something like

``` json
[{
    "id": 2,
    "name": "Patu Digua Spider",
    "description": "Smaller than even the head of a pin",
    "trees": [{
        "id": 5,
        "tree": "Stagg"
    }]
}, {
    "id": 1,
    "name": "Western Pygmy Blue Butterfly",
    "description": "Copper brown and dull blue pattern at the bases of both wings",
    "trees": [{
        "id": 2,
        "tree": "General Grant"
    }, {
        "id": 1,
        "tree": "General Sherman"
    }, {
        "id": 4,
        "tree": "Lincoln"
    }, {
        "id": 5,
        "tree": "Stagg"
    }]
}]
```

## Congratulations!

You have completed the core phases of this practice!

Several bonus phases have been provided for you to continue to deepen your knowledge, and prepare for the project week. If you don't complete all the bonus phases, now you can revisit them during assessment prep, or when you are preparing your project work.

# Bonus - Phase 1 - Select WHERE Like

In this bonus phase, you'll implement a WHERE clause to allow users to search by the `tree` names.

## Congratulations

Finishing all 6 phases means you've successfully completed the core elements of this project. Congratulations! Now, you may continue with this bonus phase, as you have time. Or you can revisit this phase during the assessment prep.

## Step A: Import `Op`

Near the top of the file (before the route handlers), you will want to require the `Op` package, to perform comparison operations in `WHERE` clauses.

## Step B: Search query

In **server/routes/trees.js**, find the route with the path `/search/:value`.

Add some **Sequelize** code to find all trees which are `like` the request parameter `value`. This value can be anywhere in the `tree` property.

Return 3 attributes: `heightFt`, `tree`, `id`

Order alphabetically by the `tree` property.

## Verify your work

Using your browser or **Postman**, search for "General": [http://localhost:5000/trees/search/General](http://localhost:5000/trees/search/General).

Try other searches as well, include letters that are at the end of the `tree` property or somewhere in the middle.

Also remember to try a combination that is not found in the database.

# Bonus - Phase 2 - Additional CRUD Routes

In this bonus phase, if you choose to do it, you will practice creating **Express** routes which return data using **Sequelize**.

Open **server/routes/insects.js**. Notice there are no routes here, yet.

Your mission is to create the routes for the `Insects` to have the same functionality as the `Trees`.

- List of insects returning `id`, `name`, and `millimeters` ordered by `millimeters` from smallest to largest
- Fetch an insect by `id`
- Create an insect
- Delete an insect
- Update an insect
- Search for an insect by `name`

To test your knowledge, see how much you can do without references, and don't be afraid to copy/paste or look up whatever code you want to make sure you remember correctly.

# Bonus - Phase 3 - Optional Use Route To Create Relationship

In this bonus phase, you will create a route that receives both a `tree` and an `insect`, creates either or both as necessary, and makes the association between them.

The phase is optional and will NOT be covered on the assessment. However, there is a good chance you will want to do something like this in your upcoming project.

## Error handling

It is expected that your code will catch errors anywhere in the route handler and provide friendly messages as the response by calling the `next()` function in **Express**.

The message should be `Could not create association` unless otherwise noted. The details should contain more information on what went wrong.

For example

- tree missing in request
- insect missing in request
- Tree not found
- Insect not found
- The error messages provided by Sequelize
- The message for any other error

## Create route

Open the routes file where associations are handled: **server/routes/joined.js**.

Create a new POST handler for the path `/associate-tree-insect`.

The request `body` is expected to have two attributes: `tree` and `insect`. These will be objects with attributes that match the request body for creating a `Tree` and an `Insect`, respectively. Alternately, either one or both could contain just an id of an existing `Tree` or `Insect`, respectively.

Below you will find some examples you can use to test you solution when it's ready.

## Handle `tree` attribute

Remember, the request will include a body in **JSON** format.

If `tree` is missing in the request body, return an error.

If `tree` in the request body has the property of `id`, the look for that primary key in the `Tree` model. If it's not found, return an error, otherwise store it for making the association (in a moment).

If the `tree` in the request body does NOT have the `id` property, then try to create a new `Tree`. (Remember with `Tree` objects, the request and the model have different attributes.)

## Handle `insect` attribute

Same logic, but for the `insect` attribute in the request body. (Remember that the request and model for `Insect` is the same, so that simplifies the creation.)

## Detect existing relationship

If both the `tree` and the `insect` exist in the database already, then they may already be associated. If so, please return a special error message: `Association already exists between {tree.tree} and {insect.name}`.

## Add the association

If all goes well, you can now add the association. Since the relationship is many-to-many, but the request has just one of each object, you'll need an array somewhere in your implementation.

Finally, return a **JSON** response with the following attributes:

- `status` of "success"
- `message` of "Successfully created association"
- `data` which is an object containing the `tree` and the `insect` used to make the association

## Verification

There are a number of different request bodies you'll need to try in order to verify all the possibilities. Here are a few to get you started. You should come up with more on your own to cover as much of the feature as possible.

### Create both tree and insect

``` json
{
  "tree": {
    "name": "My Special Tree",
    "location": "My Backyard",
    "height": 123.45,
    "size": 57.95
  },
  "insect": {
     "name": "Ny Special Insect",
     "description": "For testing",
     "fact": "This is fun!",
     "territory": "TBD",
     "millimeters": 12.34
  }
}
```

### Existing tree and insect

``` json
{
  "tree": {
    "id": 1
  },
  "insect": {
     "id": 3
  }
}
```

Repeat this again (once successful) to test the handling of a duplicate association.

### Invalid data

Modify one or the other of the above request bodies to trigger the known errors

- Invalid tree id
- Invalid insect id
- `tree` attribute is missing
- `insect` attribute is missing
- Required field(s) are not provided in a new tree and/or insect

Anything else you can think of!

## Congratulations!

You are well on your way to mastering **Sequelize** used in an **Express** application!

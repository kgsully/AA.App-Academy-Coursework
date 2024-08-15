// Instantiate Express and the application - DO NOT MODIFY
const express = require('express');
const app = express();

// Import environment variables in order to connect to database - DO NOT MODIFY
require('dotenv').config();
require('express-async-errors');

// Import the models used in these routes - DO NOT MODIFY
const { Author, Book, Review, Reviewer, sequelize } = require('./db/models');
const { Op } = require("sequelize");


// Express using json - DO NOT MODIFY
app.use(express.json());




// STEP #Ob: Test logging behavior - DO NOT MODIFY
app.get('/test-benchmark-logging', async (req, res) => {   // > 100 ms execution time
    const books = await Book.findAll({
        include: [
            { model: Author },
            { model: Review },
            { model: Reviewer }
        ],
        // Uncomment the lines below to see the data structure more clearly
        // limit: 100,
        // offset: 2000
    });
    res.json(books);
});


// STEP #1: Benchmark a Frequently-Used Query

// ORIGINAL QUERY USED FOR STEPS 1A AND 1B
// app.get('/books', async (req, res) => {

//     let books = await Book.findAll({
//         include: Author,
//     });

//     // Filter by price if there is a maxPrice defined in the query params
//     if (req.query.maxPrice) {
//         books = books.filter(book => book.price < parseInt(req.query.maxPrice));
//     };
//     res.json(books);
// });

    // 1a. Analyze:

        // Record Executed Query and Baseline Benchmark Below:
        // Executed (default): SELECT `Book`.`id`, `Book`.`authorId`, `Book`.`title`, `Book`.`description`, `Book`.`date`, `Book`.`price`,
        // `Book`.`createdAt`, `Book`.`updatedAt`, `Book`.`AuthorId`, `Author`.`id` AS `Author.id`, `Author`.`firstName` AS `Author.firstName`,
        // `Author`.`lastName` AS `Author.lastName`, `Author`.`email` AS `Author.email`, `Author`.`birthdate` AS `Author.birthdate`,
        // `Author`.`createdAt` AS `Author.createdAt`, `Author`.`updatedAt` AS `Author.updatedAt` FROM `Books` AS `Book`
        // LEFT OUTER JOIN `Authors` AS `Author` ON `Book`.`AuthorId` = `Author`.`id`;
        // Elapsed time: 147ms
        // Postman shows 568ms


        // - What is happening in the code of the query itself?
        // sql query is executed to find all books eager loading author. A number of attributes are included from both book and the joined authors table

        // - What exactly is happening as SQL executes this query?
        // SQL is performing a join based upon the association and returning the records
        // which are then filtered if the maxPrice query parameter is employed using JS




// 1b. Identify Opportunities to Make Query More Efficient

    // - What could make this query more efficient?
    // don't use JS to filter the results, include a 'where' clause that will allow the filtering to happen within SQL before returning results to JS


// 1c. Refactor the Query in GET /books
app.get('/books', async (req, res) => {

    let books = await Book.findAll({
        include: Author,
        where: {
            price: {
                [Op.lt]: parseInt(req.query.maxPrice)
            }
        }
    });

    res.json(books);
});


// 1d. Benchmark the Query after Refactoring

    // Record Executed Query and Baseline Benchmark Below:
    // Executed (default): SELECT `Book`.`id`, `Book`.`authorId`, `Book`.`title`, `Book`.`description`, `Book`.`date`, `Book`.`price`, `Book`.`createdAt`,
    // `Book`.`updatedAt`, `Book`.`AuthorId`, `Author`.`id` AS `Author.id`, `Author`.`firstName` AS `Author.firstName`, `Author`.`lastName` AS `Author.lastName`,
    // `Author`.`email` AS `Author.email`, `Author`.`birthdate` AS `Author.birthdate`, `Author`.`createdAt` AS `Author.createdAt`,
    // `Author`.`updatedAt` AS `Author.updatedAt` FROM `Books` AS `Book` LEFT OUTER JOIN `Authors` AS `Author` ON `Book`.`AuthorId` = `Author`.`id` WHERE `Book`.`price` < 50;
    // Elapsed time: 86ms
    // Postman shows 278ms

    // Is the refactored query more efficient than the original? Why or Why Not?
    // Yes it is more efficient. This is because SQL is performing the filtering operation instead of JS and the extra results aren't even returned




// STEP #2: Benchmark and Refactor Another Query

// // ORIGINAL CODE BEFORE REFACTOR:
// app.patch('/authors/:authorId/books', async (req, res) => {
//     const author = await Author.findOne({
//         include: { model: Book },
//         where: {
//             id: req.params.authorId
//         }
//     });

//     if (!author) {
//         res.status(404);
//         return res.json({
//             message: 'Unable to find an author with the specified authorId'
//         });
//     }

//     for (let book of author.Books) {
//         book.price = req.body.price;
//         await book.save();
//     }

//     const books = await Book.findAll({
//         where: {
//             authorId: author.id
//         }
//     });

//     res.json({
//         message: `Successfully updated all authors.`,
//         books
//     });
// });

// ORIGINAL CODE BENCHMARK:
// Executed (default): SELECT `Author`.`id`, `Author`.`firstName`, `Author`.`lastName`, `Author`.`email`, `Author`.`birthdate`, `Author`.`createdAt`, `Author`.`updatedAt`, `Books`.`id` AS `Books.id`, `Books`.`authorId` AS `Books.authorId`, `Books`.`title` AS `Books.title`, `Books`.`description` AS `Books.description`, `Books`.`date` AS `Books.date`, `Books`.`price` AS `Books.price`, `Books`.`createdAt` AS `Books.createdAt`, `Books`.`updatedAt` AS `Books.updatedAt`, `Books`.`AuthorId` AS `Books.AuthorId` FROM `Authors` AS `Author` LEFT OUTER JOIN `Books` AS `Books` ON `Author`.`id` = `Books`.`AuthorId` WHERE `Author`.`id` = '7';
// Elapsed time: 14ms
// Executed (default): SELECT `id`, `authorId`, `title`, `description`, `date`, `price`, `createdAt`, `updatedAt`, `AuthorId` FROM `Books` AS `Book` WHERE `Book`.`authorId` = 7;
// Elapsed time: 5ms
// Postman elapsed time: 69ms

// REFACTORED CODE:
app.patch('/authors/:authorId/books', async (req, res) => {
    // keep this as it will allow for the check and 404 response if author isn't found
    const author = await Author.findOne({
        where: {
            id: req.params.authorId
        }
    });

    if (!author) {
        res.status(404);
        return res.json({
            message: 'Unable to find an author with the specified authorId'
        });
    }

    Book.update(
        { price: req.body.price },
        { where:
            { authorId: author.id }
        }

    );

    const books = await Book.findAll({
        where: { authorId: author.id }
    })

    res.json({
        message: `Successfully updated all authors.`,
        books
    });
});

// REFACTORED CODE BENCHMARK:
// Executed (default): SELECT `id`, `firstName`, `lastName`, `email`, `birthdate`, `createdAt`, `updatedAt` FROM `Authors` AS `Author` WHERE `Author`.`id` = '7';
// Elapsed time: 2ms
// Executed (default): UPDATE `Books` SET `price`=$1,`updatedAt`=$2 WHERE `authorId` = $3; {"$1":19.99,"$2":"2024-08-15 20:10:26.669 +00:00","$3":7}
// Elapsed time: 10ms
// Postman benchmark: 19ms

// BONUS Step: Benchmark and Add Index
// Examples:
    // GET /reviews?firstName=Daisy&lastName=Herzog
    // GET /reviews?firstName=Daisy
    // GET /reviews?lastName=Herzog
app.get('/reviews', async (req, res) => {
    const { firstName, lastName } = req.query;

    // Check values in query parameters to define where conditions of the query
    const whereClause = {};
    if (firstName) whereClause.firstName = firstName;
    if (lastName) whereClause.lastName = lastName;

    const reviews = await Review.findAll({
        include: {
            model: Reviewer,
            where: whereClause,
            attributes: ['firstName', 'lastName']
        },
    });

    res.json(reviews);
});

// sqlite> EXPLAIN QUERY PLAN SELECT `Review`.`id`, `Review`.`bookId`, `Review`.`reviewerId`, `Review`.`content`, `Review`.`date`, `Review`.`createdAt`, `Review`.`updatedAt`, `Review`.`BookId`, `Review`.`ReviewerId`, `Reviewer`.`id` AS `Reviewer.id`, `Reviewer`.`firstName` AS `Reviewer.firstName`, `Reviewer`.`lastName` AS `Reviewer.lastName` FROM `Reviews` AS `Review` INNER JOIN `Reviewers` AS `Reviewer` ON `Review`.`ReviewerId` = `Reviewer`.`id` AND `Reviewer`.`firstName` = 'Daisy' AND `Reviewer`.`lastName` = 'Herzog';
// QUERY PLAN
// |--SCAN Review
// `--SEARCH Reviewer USING INTEGER PRIMARY KEY (rowid=?)




// Root route - DO NOT MODIFY
app.get('/', (req, res) => {
    res.json({
        message: "API server is running"
    });
});

// GET /authors/:authorId/books (test route) - DO NOT MODIFY
app.get('/authors/:authorId/books', async (req, res) => {
    const author = await Author.findOne({
        where: {
            id: req.params.authorId
        }
    });

    if (!author) {
        res.status(404);
        return res.json({ message: 'Unable to find an author with the specified authorId' });
    }

    const books = await Book.findAll({
        where: { authorId: author.id }
    });

    res.json(books);
});

// Set port and listen for incoming requests - DO NOT MODIFY
const port = 5000;
app.listen(port, () => console.log('Server is listening on port', port));

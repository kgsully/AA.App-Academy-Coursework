// Instantiate router - DO NOT MODIFY
const express = require('express');
const router = express.Router();

// Import model(s)
const { Student, Classroom, StudentClassroom } = require('../db/models');
const { Op } = require("sequelize");

// List
router.get('/', async (req, res, next) => {
    let errorResult = { errors: [], count: 0, pageCount: 0 };

    // Phase 2A: Use query params for page & size
    // Your code here
    // let page = (/^[0-9]+$/.test(req.query.page)) ? parseInt(req.query.page) : 1;  // this will check to see if the provided value contains only characters 0-9 (integer)
    let page = req.query.page ? parseInt(req.query.page) : 1;
    let size = req.query.size ? parseInt(req.query.size) : 10;

    // Phase 2B: Calculate limit and offset
    // Phase 2B (optional): Special case to return all students (page=0, size=0)
    // Phase 2B: Add an error message to errorResult.errors of
    // 'Requires valid page and size params' when page or size is invalid
    // Your code here

    // Pre-set limit to null and offset to 0. SQL interprets the null values as 'unlimited'
    let limit = null;
    let offset = 0;

    // VALIDITY CHECKS:
    // Check whether page and size are valid (positive integer) with /^[0-9]+$/.test()
    // Also check if page = 0 but size != 0 / page != 0 but size = 0 --> page & size both required to be 0 to show all results, it is invalid if only page OR size is = 0
    if ( !(/^[0-9]+$/.test(size)) || !(/^[0-9]+$/.test(page)) || (Number(page) === 0 && Number(size) !== 0) || (Number(page) !== 0 && Number(size) === 0)) {
        errorResult.errors.push({ message: 'Requires valid page and size params' });
    } else {
        // page >= 1 && size >= 1 conditional still required as otherwise query result will be empty
        if (page >=1 && size >= 1){
            limit = size > 200 ? 200 : size;    // max size = 200
            offset = size * (page -1);
        }
    }

    // Phase 4: Student Search Filters
    /*
        firstName filter:
            If the firstName query parameter exists, set the firstName query
                filter to find a similar match to the firstName query parameter.
            For example, if firstName query parameter is 'C', then the
                query should match with students whose firstName is 'Cam' or
                'Royce'.

        lastName filter: (similar to firstName)
            If the lastName query parameter exists, set the lastName query
                filter to find a similar match to the lastName query parameter.
            For example, if lastName query parameter is 'Al', then the
                query should match with students whose lastName has 'Alfonsi' or
                'Palazzo'.

        lefty filter:
            If the lefty query parameter is a string of 'true' or 'false', set
                the leftHanded query filter to a boolean of true or false
            If the lefty query parameter is neither of those, add an error
                message of 'Lefty should be either true or false' to
                errorResult.errors
    */
    const where = {};

    // Your code here
    const { firstName, lastName } = req.query;

    if (firstName) {
        where.firstName = {
            [Op.like]: `%${firstName}`
        };
        where.lastName = {
            [Op.like]: `%${lastName}`
        };
    }
    if (req.query.lefty) {
        if (req.query.lefty === 'true') {
            where.leftHanded = true;
        } else if (req.query.lefty === 'false') {
            where.leftHanded = false;
        } else {
            errorResult.errors.push({message: 'Lefty should be either true or false'});
        }
    }

    // Phase 2C: Handle invalid params with "Bad Request" response
    // Phase 3C: Include total student count in the response even if params were
        // invalid
        /*
            If there are elements in the errorResult.errors array, then
            return a "Bad Request" response with the errorResult as the body
            of the response.

            Ex:
                errorResult = {
                    errors: [{ message: 'Grade should be a number' }],
                    count: 267,
                    pageCount: 0
                }
        */
    // Your code here

    if (errorResult.errors.length > 0) {
        errorResult.count = await Student.count({
            where,
        });
        next(errorResult);
    }

    let result = {};

    // Phase 3A: Include total number of results returned from the query without
        // limits and offsets as a property of count on the result
        // Note: This should be a new query
    const count = await Student.count({
        where,
    });

    // MAIN QUERY - PROVIDED CODE
    result.rows = await Student.findAll({
        attributes: ['id', 'firstName', 'lastName', 'leftHanded'],
        // Phase 1A: Order the Students search results
        where,
        order: [ ['lastName'], ['firstName'] ],

        // Phase 2D: Add limit and offset to the query
        limit: limit,
        offset: offset,

        // Phase 8A - Include classroom, order by class that student is performing best in

        include: {
            model: Classroom,
            attributes: ['id', 'name'],
            through: {
                attributes: ['grade']
            }
        },

        order: [ [ Classroom, StudentClassroom, 'grade', 'DESC' ] ]
    });

    // Phase 2E: Include the page number as a key of page in the response data
        // In the special case (page=0, size=0) that returns all students, set
            // page to 1
        /*
            Response should be formatted to look like this:
            {
                rows: [{ id... }] // query results,
                page: 1
            }
        */
    // Your code here
    resPage = page === 0 ? 1 : page;

    // ----> NOTE: Combined the parameters for inclusion into the result object all together,
    //             as such, inclusion of the page key/value is done under Phase 3B

    // Phase 3B:
        // Include the total number of available pages for this query as a key
            // of pageCount in the response data
        // In the special case (page=0, size=0) that returns all students, set
            // pageCount to 1
        /*
            Response should be formatted to look like this:
            {
                count: 17 // total number of query results without pagination
                rows: [{ id... }] // query results,
                page: 2, // current page of this query
                pageCount: 10 // total number of available pages for this query
            }
        */
    // Your code here
    pageCount = page === 0 ? 1 : Math.ceil(count / size);


    // Syntax uses the spread operator to set the page key/parameter to the 'beginning'
    result = {count: count, page: resPage, pageCount: pageCount, ...result};

    // TESTING res.json:
    // res.json({page, size, limit, offset, errorResult, result});
    // ORIGINAL res.json:
    res.json(result);
});

// Export class - DO NOT MODIFY
module.exports = router;

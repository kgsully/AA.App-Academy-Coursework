// Instantiate router - DO NOT MODIFY
const express = require('express');
const router = express.Router();

// Import model(s)
const { Classroom, Supply, Student, StudentClassroom, sequelize } = require('../db/models');
const { Op } = require('sequelize');

// List of classrooms
router.get('/', async (req, res, next) => {
    let errorResult = { errors: [], count: 0, pageCount: 0 };

    // Phase 6A & 6B: Classroom Search Filters
    /*
        6A: name filter:
            If the name query parameter exists, set the name query
                filter to find a similar match to the name query parameter.
            For example, if name query parameter is 'Ms.', then the
                query should match with classrooms whose name includes 'Ms.'

        6B: studentLimit filter:
            If the studentLimit query parameter includes a comma
                And if the studentLimit query parameter is two numbers separated
                    by a comma, set the studentLimit query filter to be between
                    the first number (min) and the second number (max)
                But if the studentLimit query parameter is NOT two integers
                    separated by a comma, or if min is greater than max, add an
                    error message of 'Student Limit should be two integers:
                    min,max' to errorResult.errors
            If the studentLimit query parameter has no commas
                And if the studentLimit query parameter is a single integer, set
                    the studentLimit query parameter to equal the number
                But if the studentLimit query parameter is NOT an integer, add
                    an error message of 'Student Limit should be a integer' to
                    errorResult.errors
    */
    const where = {};

    // Your code here
    // Using this syntax to explicitly set null into the name parameter instead of undefined
    const name = req.query.name ? req.query.name : null;

    // Phase 6A - name Filter
    if (name) {
        where.name = {
            [Op.like]: `%${name}%`
        }
    }

    const studentLimit = req.query.studentLimit ? req.query.studentLimit : null;

    if (studentLimit) {
        if (studentLimit.includes(',')) {
            let [studentLimMin, studentLimMax] = studentLimit.split(',');
            // Verify that the min and max values are integers, if not then set the value to null
            studentLimMin = /^[0-9]+$/.test(studentLimMin) ? parseInt(studentLimMin, 10) : null;
            studentLimMax = /^[0-9]+$/.test(studentLimMax) ? parseInt(studentLimMax, 10) : null;
            if (studentLimMin && studentLimMax  && studentLimMin < studentLimMax) {
                where.studentLimit = {
                    [Op.between]: [studentLimMin, studentLimMax]
                }
            } else {
                errorResult.errors.push({ message: 'Student Limit should be two numbers: min,max' });
            }
        } else {
            // Integer Test
            if (/^[0-9]+$/.test(studentLimit)){
                // Could also have used where.studentLimit = { [Op.eq]: studentLimit }
                where.studentLimit = studentLimit
            } else {
                errorResult.errors.push({ message: 'Student Limit should be an integer' });
            }
        }
    }

    // ERROR handling
    if (errorResult.errors.length > 0) {
        errorResult.count = await Classroom.count({
            where
        });
        next(errorResult);
    }

    const classrooms = await Classroom.findAll({
        attributes: [ 'id', 'name', 'studentLimit' ],
        where,
        // Phase 1B: Order the Classroom search results
        order: ['name']
    });

    res.json(classrooms);
});

// Single classroom
router.get('/:id', async (req, res, next) => {
    let classroom = await Classroom.findByPk(req.params.id, {
        attributes: [
            'id',
            'name',
            'studentLimit'
        ],
        // Phase 7:
            // Include classroom supplies and order supplies by category then
                // name (both in ascending order)
            // Include students of the classroom and order students by lastName
                // then firstName (both in ascending order)
                // (Optional): No need to include the StudentClassrooms
        // Your code here
        include: [
            {
                model: Supply,
                attributes: ['id', 'name', 'category', 'handed'],
                where: { classroomId: req.params.id},
            },
            {
                model: Student,
                attributes: ['id', 'firstName', 'lastName', 'leftHanded'],
                through: {
                    attributes: []
                }

            }
        ],
        order:[
            [Supply, 'category'], [Supply, 'name'],
            [Student, 'lastName'], [Student, 'firstName']
        ]


    });

    if (!classroom) {
        res.status(404);
        res.send({ message: 'Classroom Not Found' });
    }

    // Phase 5: Supply and Student counts, Overloaded classroom
        // Phase 5A: Find the number of supplies the classroom has and set it as
            // a property of supplyCount on the response
        // Phase 5B: Find the number of students in the classroom and set it as
            // a property of studentCount on the response
        // Phase 5C: Calculate if the classroom is overloaded by comparing the
            // studentLimit of the classroom to the number of students in the
            // classroom
        // Optional Phase 5D: Calculate the average grade of the classroom
    // Your code here

    // Choosing option 1 - convert the query result object to POJO:
    classroom = classroom.toJSON();

    // Phase 5A
    classroom.supplyCount = await Supply.count({ where: {classroomId: classroom.id}});
    // Phase 5B
    classroom.studentCount = await StudentClassroom.count({where: {classroomId: classroom.id}});
    // Phase 5C
    classroom.overloaded = classroom.studentCount > classroom.studentLimit ? true : false;
    // Phase 5D
    let avgGrade = await StudentClassroom.findAll({

        where: { classroomId: classroom.id },
        attributes: [[sequelize.fn('AVG', sequelize.col('grade')), 'avgGrade']],
        raw: true
    });
    classroom.avgGrade = avgGrade[0].avgGrade;

    res.json(classroom);
});

// Export class - DO NOT MODIFY
module.exports = router;

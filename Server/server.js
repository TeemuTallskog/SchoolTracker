const express = require('express');
const app = express();
const mysql = require('mysql');
const util = require('util');
const bodyParser = require('body-parser');
const {check, validationResult} = require('express-validator');
const urlencodedParser = bodyParser.urlencoded({extended: false});
const cors = require('cors');
const e = require("express");

app.use(cors());
app.use(express.static('public'));
app.use(bodyParser.json());

const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'salis',
    database: 'koulusovellus'
});

const query = util.promisify(con.query).bind(con);


/**
 * this request is used to empty all data form the database.
 */
app.delete('/delete/all', function (req, res){
    try{
        const courseSql = "TRUNCATE TABLE courses";
        const taskSql = "TRUNCATE TABLE tasks";
        query(courseSql, function (err, result) {
            if (err) console.log(err);
            console.log(result);
        });
        query(taskSql, function (err, result) {
            if (err) console.log(err);
            console.log(result);
        });
        res.status(200).send("Success");

    }catch(err){
        console.log(err);
        res.status(500).send("Error");
    }
})

/**
 * Used to update task progress /update/task/progress?id=X&done=0/1, 0 = in progress, 1 = done
 */
app.post('/update/task/progress', urlencodedParser, function (req, res) {
    try {
        const id = req.query.id;
        const bool = req.query.done;
        const sql = "UPDATE tasks SET done = ? WHERE id = ?";
        query(sql, [bool, id], function (err, result) {
            if (err) console.log(err);
            console.log(result);
        });
        res.send("Success");
    } catch (err) {
        console.log("Error " + err);
        res.send("Database error");
    }
});

/**
 * Used to delete a course from the database by adding a parameter /delete/course?id=X
 */
app.delete('/delete/course', function (req, res) {
    try {
        const id = req.query.id;
        console.log(id);
        const sql = "DELETE FROM courses WHERE id = ?";
        const taskSQL = "DELETE FROM tasks WHERE courseID = ?";
        query(sql, [id], function (err, result) {
            if (err) console.log(err);
            console.log(result);
        });
        query(taskSQL, [id], function (err, result) {
            if (err) console.log(err);
            console.log(result);
        })
        res.send("Success");
    } catch (err) {
        if (err) console.log(err);
        console.log(err);
        res.send("Error");
    }
});

/**
 * Used to delete a task from the database by adding a parameter /delete/task?id=X
 */
app.delete('/delete/task', function (req, res) {
    try {
        const id = req.query.id;
        console.log(id);
        const sql = "DELETE FROM tasks WHERE id = ?";
        query(sql, [id], function (err, result) {
            if (err) console.log(err);
            console.log(result);
        });
        res.send("Success");
    } catch (err) {
        if (err) console.log(err);
        console.log(err);
        res.send("Error");
    }
});

/**
 * Used to update a course by adding the modified course object to the body of the request
 */
app.post('/update/course', urlencodedParser,[check('Name').isLength({min: 2, max: 255}).withMessage('Must be between 2 and 255 characters'),
    check('id').isInt().withMessage('Must be a valid integer'),
    check('link').isLength({max: 255}).withMessage('Link must be under 255 characters')],
    function (req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({errors: errors.array()});
        }
    try {
        const obj = req.body;
        const sql = "UPDATE courses SET name = ?, link = ? WHERE id = ?";
        query(sql, [obj.name, obj.link, obj.id], function (err, result) {
            if (err) console.log(err);
            console.log(result);
        });
        res.send("Success");
    } catch (err) {
        console.log("Error " + err);
        res.send("Database error");
    }
});


/**
 * Used to update a task by adding the modified task to the body of the request
 */
app.post('/update/task', urlencodedParser, [
        check('name').isLength({min: 2, max: 255}).withMessage("Minimum name lenght = 2"),
        check('date').isDate().withMessage('Must be a valid date'),
        check('info').isLength({max: 255}).withMessage('Must be less than 255 characters'),
        check('courseID').isInt().withMessage('must be a valid integer')],
    function (req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({errors: errors.array()});
    }
    try {
        const obj = req.body;
        const sql = "UPDATE tasks SET name = ?, info = ?, date = ?, courseID = ? WHERE id = ?";
        query(sql, [obj.name, obj.info, obj.date, obj.courseID, obj.id], function (err, result) {
            if (err) console.log(err);
            console.log(result);
        });
        res.send("Success");
    } catch (err) {
        console.log("Error " + err);
        res.send("Database error");
    }
});

/**
 * Returns all the courses and tasks from the database as a single JSON string
 */
app.get('/list', async function (req, res) {
    try {
        const sqlCourses = 'SELECT * FROM courses';
        const sqlTasks = 'SELECT * FROM tasks';
        let courses = await query(sqlCourses);
        const tasksArr = await query(sqlTasks);

        for (let i = 0; i < Object.keys(courses).length; i++) {
            courses[i].tasks = [];
        }
        for (let i = 0; i < Object.keys(tasksArr).length; i++) {
            const index = courses.map(function (x) {return x.id;}).indexOf(tasksArr[i].courseID);
            courses[index].tasks.push(tasksArr[i]);
        }
        res.send(courses);
    } catch (err) {
        console.log(err);
        res.send("Error");
    }
})

/**
 * Used to add a new course to the database by adding the course object to the body of the request
 */
app.post('/course', urlencodedParser, [check('name').isLength({min: 2, max: 255}).withMessage("Minimum name lenght = 2"),
    check('link').isLength({max: 255}).withMessage('Must be under 255 characters')],
    function (req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({errors: errors.array()});
    }
    try {
        const obj = req.body;
        const sql = "INSERT INTO courses (name, link) VALUE (?, ?)"
        query(sql, [obj.name, obj.link], function (err, result) {
            if (err) console.log(err);
            console.log(result);
        });
        res.send('Success');
    } catch (err) {
        console.log("Database error!" + err);
        res.send('error');
    }
});

/**
 * Used to add a task to the database by adding the task object to the body of the request
 */
app.post('/task', urlencodedParser, [check('name').isLength({min: 2, max: 255}).withMessage("Must be between 2 and 255 characters"),
        check('date').isDate().withMessage("Must have a date"), check('courseID').isInt().withMessage("Must contain course ID"),
    check('info').isLength({max: 255}).withMessage('Must be under 255 characters'),
    check('courseID').isInt().withMessage('Must be a valid integer')],
    function (request, res) {
        const errors = validationResult(request);
        if (!errors.isEmpty()) {
            return res.status(422).json({errors: errors.array()});
        }
        try {
            const obj = request.body;
            const sql = "INSERT INTO tasks (name, info, date, courseID, done) VALUES (? ,? ,?, ? ,?)"
            query(sql, [obj.name, obj.info, obj.date, obj.courseID, 0], function (err, result) {
                if (err) console.log("Database error" + err);
                console.log(result);
            });
            res.send("Success");

        } catch (err) {
            console.log("Database error!" + err);
            res.send("Error");
        }
    })

app.get('/index.htm', function (req, res) {
    res.sendFile(__dirname + "/" + "index.htm");
})

const server = app.listen(8081, function () {
    const host = server.address().address
    const port = server.address().port

    console.log("App listening at http://%s:%s", host, port);
})

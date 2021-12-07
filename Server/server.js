const express = require('express');
const app = express();
const mysql = require('mysql');
const util = require('util');
const bodyParser = require('body-parser');
const { check, validationResult } = require('express-validator');
const urlencodedParser = bodyParser.urlencoded({extended: false});
const cors = require('cors');

app.use(cors());
app.use(express.static('public'));
app.use(bodyParser.json());

const con = mysql.createConnection({
    host:'localhost',
    user:'olso',
    password:'olso',
    database:'schooltrackertest'
});

const query = util.promisify(con.query).bind(con);


/**
 * Used to delete a course from the database by adding a parameter /delete/course?id=X
 */
app.delete('/delete/course', function (req, res){
    try {
        const id = req.query.id;
        console.log(id);
        const sql = "DELETE FROM courses WHERE id = ?";
        query(sql,[id], function (err, result) {
            if (err) throw err;
            console.log(result);
        });
        res.send("Success");
    }
    catch(err){
        if(err) throw err;
        console.log(err);
        res.send("Error");
    }
});

/**
 * Used to delete a task from the database by adding a parameter /delete/task?id=X
 */
app.delete('/delete/task', function (req, res){
    try {
        const id = req.query.id;
        console.log(id);
        const sql = "DELETE FROM tasks WHERE id = ?";
        query(sql,[id], function (err, result) {
            if (err) throw err;
            console.log(result);
        });
        res.send("Success");
    }
    catch(err){
        if(err) throw err;
        console.log(err);
        res.send("Error");
    }
});

/**
 * Used to update a course by adding the modified course object to the body of the request
 */
app.post('/update/course', urlencodedParser, function (req, res){
    try {
        const obj = req.body;
        const sql = "UPDATE courses SET name = ?, link = ? WHERE id = ?";
        query(sql, [obj.Name, obj.link, obj.id], function (err, result) {
            if (err) throw err;
            console.log(result);
        });
        res.send("Success");
    }
    catch(err){
        console.log("Error " + err);
        res.send("Database error");
    }
});


/**
 * Used to update a task by adding the modified task to the body of the request
 */
app.post('/update/task', urlencodedParser, function (req, res){
    try {
        const obj = req.body;
        const sql = "UPDATE tasks SET name = ?, info = ?, date = ?, courseID = ? WHERE id = ?";
        query(sql, [obj.name, obj.info, obj.date, obj.courseID, obj.id], function (err, result) {
            if (err) throw err;
            console.log(result);
        });
        res.send("Success");
    }
    catch(err){
        console.log("Error " + err);
        res.send("Database error");
    }
});

/**
 * Returns all the courses and tasks from the database as a single JSON string
 */
app.get('/list', async function(req, res){
    const sqlCourses = 'SELECT * FROM courses';
    const sqlTasks = 'SELECT * FROM tasks';
    let courses = await query(sqlCourses);
    const tasks = await query(sqlTasks);

    for(let i = 0; i < Object.keys(courses).length; i++){
        courses[i].tasks = [];
    }
    for(let i = 0; i < Object.keys(tasks).length; i++){
        courses[courses.findIndex(function(item, i){
            return item.ID === tasks[i].course_id;
        })].tasks.push(tasks[i]);
    }
    res.send(courses);
})

/**
 * Used to add a new course to the database by adding the course object to the body of the request
 */
app.post('/course', urlencodedParser,[check('name').isLength({min:2}).withMessage("Minimum name lenght = 2")], function (req, res){
   const errors = validationResult(req);
   if(!errors.isEmpty()){
       return res.status(422).json({errors:  errors.array()});
   }
   try{
        const obj = req.body;
        const sql = "INSERT INTO courses (name, link) VALUE (?, ?)"
        query(sql, [obj.name, obj.link], function (err, result){
            if(err) throw err;
            console.log(result);
       });
        res.send('Success');
   }
   catch (err){
       console.log("Database error!" + err);
       res.send('error');
   }
});

/**
 * Used to add a task to the database by adding the task object to the body of the request
 */
app.post('/task', urlencodedParser, [check('name').isLength({min:2}).withMessage("Minimum name lenght = 2"),
    check('date').isDate().withMessage("Must have a date"), check('courseID').isInt().withMessage("Must contain course ID")],
    function (request, res) {
    const errors = validationResult(request);
    if(!errors.isEmpty()){
        return res.status(422).json({errors: errors.array()});
    }
    try {
        const obj = request.body;
        const sql = "INSERT INTO tasks (name, info, date, courseID) VALUES (? ,? ,?, ?)"
        query(sql,[obj.name, obj.info, obj.date, obj.courseID], function (err, result){
            if(err) throw err;
            console.log(result);
        });
        res.send("Success");

    }
    catch (err) {
        console.log("Database error!"+ err);
        res.send("Error");
    }
})

app.get('/index.htm', function (req, res) {
    res.sendFile( __dirname + "/" + "index.htm" );
})

const server = app.listen(8081, function () {
    const host = server.address().address
    const port = server.address().port

    console.log("Example app listening at http://%s:%s", host, port);
})

# SchoolTracker

Creating your database table:
---------------------
CREATE TABLE courses (id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255) NOT NULL, link VARCHAR(255));

CREATE TABLE tasks (id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255) NOT NULL, info TEXT, date DATE NOT NULL, done BOOLEAN NOT NULL, link VARCHAR(255));

-----------------------------------------------------------

REST api:
---------------------
http://127.0.0.1:8081/list // GET // Returns a json of all courses and tasks

http://127.0.0.1:8081/task // POST // Reads a task object from the body of the request and saves it in the database

http://127.0.0.1:8081/course // POST // Reads a course object from the body of the request and saves it in the database

http://127.0.0.1:8081/update/task // POST // Reads a task object from the body of the request and updates the changes to an object with the same id

http://127.0.0.1:8081/update/task // POST // Reads a course object from the body of the request and updates the changes to an object with the same id

http://127.0.0.1:8081/update/task/progress?id=X&done=0/1 // POST // Updates the progress of a task with the given id in the url </br>done 1 == true done 0 == false

http://127.0.0.1:8081/delete/task?id=X // DELETE // Attempts to delete a task from the database with the gived id in the url

http://127.0.0.1:8081/delete/course?id=X // DELETE // Attempts to delete a course from the database with the gived id in the url

http://127.0.0.1:8081/delete/all // DELETE // Used to empty the database





# SchoolTracker

Creating your database tables:
---------------------
```
CREATE TABLE courses (id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255) NOT NULL, link VARCHAR(255));
```

```
CREATE TABLE tasks (id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255) NOT NULL, info TEXT, date DATE NOT NULL, done BOOLEAN NOT NULL, link VARCHAR(255), courseID INT NOT NULL);
```
-----------------------------------------------------------

REST api:
---------------------
| End point | HTTP Method | Description |
|---|---|---|
| /list | GET | Returns a json of all courses and tasks |
| /task | POST | Reads a task object from the body of the request and saves it in the database |
| /course | POST | Reads a course object from the body of the request and saves it in the database |
| /update/task | POST | Reads a task object from the body of the request and updates the changes to an object with the same id |
| /update/course | POST | Reads a course object from the body of the request and updates the changes to an object with the same id |
| /update/task/progress?id=X&done=0/1 | POST | Updates the progress of a task with the given id in the url done 1 == true done 0 == false |
| /delete/task?id=X | DELETE | Attempts to delete a task from the database with the gived id in the url |
| /delete/course?id=X | DELETE | Attempts to delete a course from the database with the gived id in the url |
| /delete/all | DELETE | Used to empty the database |





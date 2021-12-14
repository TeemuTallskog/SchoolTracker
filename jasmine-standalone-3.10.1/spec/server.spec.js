const course = {id: 1, name: "Lorem ipsum", link: "ww.google.com"};
const secondCourse = {id: 2, name: "second course", link: "ww.google.com"};
const secondTask = {id: 2, name: "second task", info: "Test text", date: "2021-12-22", courseID: 1, done: 0, link: ""};
const task = {id: 1, name: "Test task", info: "Test text", date: "2021-12-22", courseID: 1, done: 0, link : ""};

async function fetchData() {
    try {
        const response = await fetch("http://127.0.0.1:8081/list");
        const data = await response.json();
        return data;
    } catch (err) {
        console.error("Error " + err);
        return null;
    }
}

async function updateProgress(id, bool) {
    try {
        await fetch('http://127.0.0.1:8081/update/task/progress?id=' + id + "&done=" + bool, {
            method: 'POST',
        })
        return true;
    } catch (err) {
        console.log(err);
        return false;
    }
}

async function deleteTask(id) {
    try {
        await fetch('http://127.0.0.1:8081/delete/task?id=' + id, {
            method: 'DELETE',
        })
        return true;
    } catch (err) {
        console.log(err);
        return false;
    }
}

async function addCourse(icourse) {
    try {
        const res = await fetch('http://127.0.0.1:8081/course', {
            method: 'POST',
            body: JSON.stringify(icourse),
            headers: {'Content-type': 'application/json; charset=UTF-8'},
        })
        if(res.status == 422) return false;
        return true;
    } catch (err) {
        console.log(err);
        return false;
    }
}

async function addTask(itask) {
    try {
        const res = await fetch('http://127.0.0.1:8081/task', {
            method: 'POST',
            body: JSON.stringify(itask),
            headers: {'Content-type': 'application/json; charset=UTF-8'},
        })
        if(res.status == 422) return false;
        return true;
    } catch (err) {
        return false;
        console.log(err);
    }
}

async function deleteCourse(id) {
    try {
        await fetch('http://127.0.0.1:8081/delete/course?id=' + id, {
            method: 'DELETE',
        })
        return true;
    } catch (err) {
        console.log(err);
        return false;
    }
}

async function deleteAll() {
    try {
        await fetch('http://127.0.0.1:8081/delete/all', {
            method: 'DELETE'
        })
        return true
    } catch (err) {
        console.log(err);
        return false;
    }
}

async function editTask(updatedTask) {
    console.log(updatedTask)
    try {
        const res = await fetch('http://127.0.0.1:8081/update/task', {
            method: 'POST',
            body: JSON.stringify(updatedTask),
            headers: {'Content-type': 'application/json; charset=UTF-8'},
        })
        if(res.status == 422) return false;
        return true;
    } catch (err) {
        console.log(err);
        return false;
    }
}

async function markTask(id, done){
    try {
        const res = await fetch('http://127.0.0.1:8081/update/task/progress?id=' + id + '&done=' + done, {
            method: 'POST',
        })
        return true;
    } catch (err) {
        console.log(err);
        return false;
    }
}

describe('Server module', function () {
    beforeEach(async function () {
        try {
            await fetch('http://127.0.0.1:8081/delete/all', {
                method: 'DELETE',
            })
            await fetch('http://127.0.0.1:8081/course', {
                method: 'POST',
                body: JSON.stringify(course),
                headers: {'Content-type': 'application/json; charset=UTF-8'},
            })
            await fetch('http://127.0.0.1:8081/task', {
                method: 'POST',
                body: JSON.stringify(task),
                headers: {'Content-type': 'application/json; charset=UTF-8'},
            })
        } catch (err) {
            console.log(err);
        }
    });
    it('should be able to delete all data', async function () {
        expect(await deleteAll()).toBe(true);
        const data = await fetchData();
        expect(data.length).toBe(0);
    })
    it('should be able to add a task', async function () {
        expect(true).toBe(true);
        expect(await addTask(secondTask)).toBe(true);
        const data = await fetchData();
        expect(data[0].tasks[1].name).toBe("second task");
    })
    it('should be able to add a course', async function () {
        expect(await addCourse(secondCourse)).toBe(true);
        const data = await fetchData();
        console.log(data);
        expect(data[1].name).toBe("second course");
    })
    it('should be able to modify a task', async function () {
        const modified = {id: 1, name: "modified task", info: "modified info", date: "2020-11-23", courseID: 1, link: "", courseID: 1, done: 0,};
        expect(await editTask(modified)).toBe(true);
        const data = await fetchData();
        expect(data[0].tasks[0].name).toBe("modified task");
        expect(data[0].tasks[0].info).toBe("modified info");
        expect(data[0].tasks[0].date).toBe("2020-11-22T22:00:00.000Z");
    })
    it('should be able to delete a task', async function () {
        expect(await deleteTask(1)).toBe(true);
        const data = await fetchData();
        expect(data[0].tasks.length).toBe(0);
    })
    it('should be able to delete a course and its contents', async function () {
        expect(await deleteCourse(1)).toBe(true);
        const data = await fetchData();
        expect(data.length).toBe(0);
    });
    it('should be able to mark a task as done or inprogress', async function (){
        expect(await markTask(1, 1)).toBe(true);
        let data = await fetchData();
        expect(data[0].tasks[0].done).toBe(1);
        expect(await markTask(1,0)).toBe(true);
        data = await fetchData();
        expect(data[0].tasks[0].done).toBe(0);
    })
    describe('Incorrect data input', function (){
       it('should not accept data over 255/900 characters', async function (){
           const falseTask = {name: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras augue purus, fermentum sit amet velit nec, tincidunt euismod velit. Sed dictum, dui eget maximus tempor, enim felis rhoncus erat, in vestibulum purus arcu non nulla. Etiam in nibh id tellus non.",
               info: "" ,
               date: "2021-12-22", courseID: 1, link: ""};
           const falseCourse = {id: 2, name: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras augue purus, fermentum sit amet velit nec, tincidunt euismod velit. Sed dictum, dui eget maximus tempor, enim felis rhoncus erat, in vestibulum purus arcu non nulla. Etiam in nibh id tellus non.",
               link: "ww.google.com"}
           expect(await addTask(falseTask)).toBe(false);
           expect(await addCourse(falseCourse)).toBe(false);
           expect(await editTask(falseTask)).toBe(false);
       });
       it('should not accept a name under 2 characters', async function (){
           const falseTask = {name: "A", info: "Test text", date: "2021-12-22", courseID: 1, link: ""};
           const falseCourse = {name: "B", link: "ww.google.com"};
           expect(await addCourse(falseCourse)).toBe(false);
           expect(await addTask(falseTask)).toBe(false);
           expect(await editTask(falseTask)).toBe(false);
       });
       it('should only accept a valid date', async function (){
          const falseTask =  {name: "A", info: "Test text", date: "this is not a date", courseID: 1, link: ""};
          const falseTask2 = {name: "A", info: "Test text", date: "2021-99-99", courseID: 1, link: ""};
          expect(await addTask(falseTask)).toBe(false);
          expect(await addTask(falseTask2)).toBe(false);
          expect(await editTask(falseTask)).toBe(false);
       });

    });

});
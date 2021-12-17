<template>
  <div id="app">

    <h1 id="header">SchoolTracker</h1>
    <div id="container">
      <div id="button-container">
      <button v-on:click="showCourses(); showForm();">Uusi kurssi</button>
      <button v-on:click="showTasks(); showForm();">Uusi tehtävä</button>
      </div>
      <div id="form-course-table">
      <div id="form" v-if="!this.formIsHidden">
      <div v-if="!courseIsHidden && taskIsHidden" id="course-form">
    <course-form @add:course="addCourse"/>
    </div>

      <div v-if="!taskIsHidden && courseIsHidden" id="task-form">
    <task-form @add:task="addTask" :courses="courses"/>

    </div>
        <button @click="hideForm">Peruuta</button>
  </div>

    <div id="table">
      <course-table
          :courses="courses"
          @done:task="updateProgress"
          @delete:course="deleteCourse"
          @edit:task="editTask"
          @delete:task="deleteTask"/>

      </div>

    </div>
    </div>
    </div>


</template>

<script>
import CourseForm from "./components/CourseForm.vue";
import CourseTable from "./components/CourseTable";
import TaskForm from "./components/TaskForm.vue";

export default {
  name: 'App',
  components: {
    CourseTable,
    CourseForm,
    TaskForm
  },
  data() {
    return {
      courses: [],
      tasks: [],
      courseIsHidden: true,
      taskIsHidden: false,
      formIsHidden: true,
    }
  },
  methods: {

    /**
     * Asynchronous method for app.get(/list) from server.js file
     * Returns all courses and tasks
     */
    async fetchData() {
      try {
        const response = await fetch("http://127.0.0.1:8081/list");
        const data = await response.json();
        this.courses = data;
      } catch (err) {
        console.error("Error " + err);
      }
    },

    /**
     * Asynchronous method for app.get(/update/task/progress) from server.js file
     * Updates task progress
     */
    async updateProgress(id, bool){
      try{
        await fetch('http://127.0.0.1:8081/update/task/progress?id=' + id + "&done=" + bool, {
          method: 'POST',
        })
        await this.fetchData();
      }catch(err){
        console.log(err);
      }
    },

    /**
     * Asynchronous method for app.get(/delete/task) from server.js file
     * Deletes task by id
     */
    async deleteTask(id){
      try{
        await fetch('http://127.0.0.1:8081/delete/task?id=' + id, {
          method: 'DELETE',
        })
        await this.fetchData();
      }catch(err){
        console.log(err);
      }
      console.log("Task " + id + " deleted")
    },

    /**
     * Asynchronous method for app.get(/course) from server.js file
     * Adds a new course
     */
    async addCourse(course) {
      try{
        await fetch('http://127.0.0.1:8081/course', {
            method: 'POST',
            body: JSON.stringify(course),
            headers: {'Content-type': 'application/json; charset=UTF-8'},
        })
        await this.fetchData();
        this.hideForm();
      }catch(err){
        console.log(err);
        this.hideForm();
      }
    },

    /**
     * Asynchronous method for app.get(/task) from server.js file
     * Adds a new task
     */
    async addTask(task) {
      console.log(JSON.stringify(task));
      try{
        await fetch('http://127.0.0.1:8081/task', {
          method: 'POST',
          body: JSON.stringify(task),
          headers: {'Content-type': 'application/json; charset=UTF-8'},
        })
        await this.fetchData();
        this.hideForm();
      }catch(err){
        console.log(err);
        this.hideForm();
      }
    },

    /**
     * Asynchronous method for app.get(/delete/course) from server.js file
     * Deletes course by id
     */
    async deleteCourse(id) {
      try{
        await fetch('http://127.0.0.1:8081/delete/course?id=' + id, {
          method: 'DELETE',
        })
        await this.fetchData();
      }catch(err){
        console.log(err);
      }
      console.log("Course " + id + " deleted")
    },


    /**
     * Asynchronous method for app.get(/update/task) from server.js file
     * Updates task
     */
    async editTask(id, updatedTask) {
      console.log(updatedTask)
      try{
        await fetch('http://127.0.0.1:8081/update/task', {
          method: 'POST',
          body: JSON.stringify(updatedTask),
          headers: {'Content-type': 'application/json; charset=UTF-8'},
        })
        await this.fetchData();
      }catch(err){
        console.log(err);
      }
    },


    /**
     * Methods for changing the visibility of course/task forms
     */
    showCourses: function() {
      if (this.courseIsHidden === true) {
        this.courseIsHidden = false;
        this.taskIsHidden = true;
      }
    },

    showTasks: function() {
      if (this.taskIsHidden === true) {
        this.taskIsHidden = false;
        this.courseIsHidden = true;
      }
    },
    showForm: function (){
      this.formIsHidden = false;
    },
    hideForm: function (){
      this.formIsHidden = true;
    }

  },

  mounted() {
    this.fetchData();
  }
}
</script>

<style>
body {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#form-course-table{
  display: flex;
  flex-direction: column;
  justify-content: center;
}

#table{
  margin: auto;
}

#button-container{
  margin-top: 50px;
}

#button-container button{
  background-color: #006989ff;
  border-radius: 10px;
  font-size: 1.5em;
}

#button-container button:hover{
  background-color: #4CAF50;
  color: white;
}

#header {
  font-size: 2.5em;
  text-align: left;
  margin-left: 50px;
}

div {
  margin: 25px;
}

#form {
  background-color: whitesmoke;
  border: 3px solid #006989ff;
  width: 900px;
  height: auto;
  padding-bottom: 25px;
  border-radius: 10px;
}

#container {
  display: flex;
  flex-direction: row-reverse;
  justify-content: center;
}

#course-form, #task-form {
  height: auto;
  margin: auto;
  padding: 10px;
}

button {
  margin: 5px;
  background-color: #006989ff;
  border: none;
  color: white;
  text-align: center;
  text-decoration: none;
  transition-duration: 0.1s;
  cursor: pointer;
  padding: 7px;
  border-radius: 5px;
}

button:hover {
  background-color: #4CAF50;
  color: white;
}

</style>
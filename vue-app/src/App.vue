<template>


  <div id="app">
    <div id="form">

      <button v-on:click="courseIsHidden = !courseIsHidden">Kurssi</button>
      <button v-on:click="taskIsHidden = !taskIsHidden">Tehtävä</button>

      <div v-if="!courseIsHidden && taskIsHidden" id="course-form">
    <course-form @add:course="addCourse"/>
    </div>

      <div v-if="!taskIsHidden" id="task-form">
    <task-form @add:task="addTask" :courses="courses"/>

    </div>
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
      courseIsHidden: false,
      taskIsHidden: false,
    }
  },
  methods: {
    async fetchData() {
      try {
        const response = await fetch("http://127.0.0.1:8081/list");
        const data = await response.json();
        this.courses = data;
      } catch (err) {
        console.error("Error " + err);
      }
    },
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
    async addCourse(course) {
      try{
        await fetch('http://127.0.0.1:8081/course', {
            method: 'POST',
            body: JSON.stringify(course),
            headers: {'Content-type': 'application/json; charset=UTF-8'},
        })
        await this.fetchData();
      }catch(err){
        console.log(err);
      }
    },

    async addTask(task) {
      console.log(JSON.stringify(task));
      try{
        await fetch('http://127.0.0.1:8081/task', {
          method: 'POST',
          body: JSON.stringify(task),
          headers: {'Content-type': 'application/json; charset=UTF-8'},
        })
        await this.fetchData();
      }catch(err){
        console.log(err);
      }
    },

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

#table {

}

div {
  margin: 25px;
}

#form {
  border: 3px solid green;
  width: 1000px;
  height: 750px;
}

#app {
  display: flex;
}

#course-form, #task-form {
  height: 500px;
  margin: auto;
  padding: 10px;
}

button {
  margin: 5px;
}


</style>
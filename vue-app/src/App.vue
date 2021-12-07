<template>


  <div id="app">
    <div id="form">

      <button v-on:click="courseIsHidden = !courseIsHidden">Kurssi</button>
      <button v-on:click="taskIsHidden = !taskIsHidden">Tehtävä</button>

      <div v-if="!courseIsHidden && taskIsHidden" id="course-form">
    <course-form @add:course="addCourse"/>
    </div>

      <div v-if="!taskIsHidden" id="task-form">
    <task-form @add:task="addTask"/>

    </div>
  </div>

    <div id="table">
      <course-table
          :courses="courses"
          @delete:course="deleteCourse"
          @edit:task="editTask"/>

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

    addTask(task) {
      //Creating new task with id
      const lastId = this.tasks.length > 0
          ? this.tasks[this.tasks.length - 1].id
          : 0;
      const id = lastId + 1;
      const newTask = {...task, id};
      //Array needed to keep track of IDs
      this.tasks = [...this.tasks, newTask]

      console.log("New task made")

      //Finding course
      for (let i = 0; i < this.courses.length; i++) {
        //If course-name of newly made task is found in courses-array, push to nested tasks-array of that index
        if (newTask.course.match(this.courses[i].name)) {
          this.courses[i].tasks.push({
            date: newTask.date,
            name: newTask.name,
            link: newTask.link,
            course: newTask.course,
            info: newTask.info,
            id: newTask.id
          })
        }
      }
    },

    deleteCourse(id) {
      this.courses = this.courses.filter(course => course.id !== id)

      console.log("Course " + id + " deleted")
    },

    editTask(id, updatedTask) {
      this.courses.tasks = this.courses.tasks.map (task => task.id === id ? updatedTask : task)
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
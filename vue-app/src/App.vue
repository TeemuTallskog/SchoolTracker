<template>
  <div id="form">
    <course-form @add:course="addCourse" />
    <task-form @add:task="addTask" />


    <div id="table">
    <course-table :courses="courses"
    @delete:course="deleteCourse"

    />
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
      tasks : []
    }
  },
  methods: {
    fetchData(){
      try {
        const xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function (){
          if(this.readyState == 4 && this.status == 200){
            const data = JSON.parse(xhttp.responseText);
            console.log(data);
            this.courses = [...data];
            console.log(xhttp.responseText);
          }
        }
        xhttp.open("GET", 'http://127.0.0.1:8081/list', true);
        xhttp.send();
      }
      catch(err){
        console.error("Error " + err);
      }
    },
    addCourse(course){
      const lastId = this.courses.length > 0
      ? this.courses[this.courses.length - 1].id
          : 0;
      const id = lastId + 1;
      const newCourse = {...course, id};
      this.courses = [...this.courses, newCourse]

      console.log("New course made")
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
          this.courses[i].tasks.push({date: newTask.date, name: newTask.name, link: newTask.link, course: newTask.course, info: newTask.info, id: newTask.id})
        }
      }
    },

      deleteCourse(id) {
        this.courses = this.courses.filter(course => course.id !== id)

        console.log("Course " + id + " deleted" )
      },
  },
  mounted(){
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
  margin-top: 60px;
}

#table {
  margin-top: -864px;
  margin-right: 500px;
  float: right;
}

div {
  margin: 50px;
}


</style>
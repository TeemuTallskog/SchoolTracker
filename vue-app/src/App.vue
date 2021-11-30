<template>
  <div id="form">
    <course-form @add:course="addCourse" />
    <task-form @add:task="addTask" />

    <div id="table">
    <course-table :courses="courses" :tasks="courses.tasks"
    @delete:course="deleteCourse"
    @delete:task="deleteTask"

    />
  </div>
  </div>

</template>

<script>
import CourseForm from "./components/CourseForm.vue";
import CourseTable from "./components/CourseTable";
import TaskForm from '@/components/TaskForm';

export default {
  name: 'App',
  components: {
    CourseTable,
    CourseForm,
    TaskForm
  },
  data() {
    return {
      courses: [
          {id: 1,
          name: "Mathematics",
          info: "Mathematics course",
          tasks: [{id: 1,
                  name: "Task 1",
                  date: "2021-11-30",
                  info: "Complete exercises 1-5"},

            {id: 2,
            name: "Task 2",
            date: "2021-11-31",
            info: "Complete exercises 5-10"}

          ],},

        {id: 2,
        name: "Programming",
        info: "Programming course",
        tasks: [],},

      ]
    }
  },
  methods: {
    addCourse(course){
      const lastId = this.courses.length > 0
      ? this.courses[this.courses.length - 1].id
          : 0;
      const id = lastId + 1;
      const newCourse = {...course, id};
      this.courses = [...this.courses, newCourse]
    },


      deleteCourse(id) {
        this.courses = this.courses.filter(course => course.id !== id)
      },

    /*
   ei toimi?

      deleteTask(course, id) {
        let i = course.tasks.indexOf(id);
        course.tasks.splice(i, 1);
      }


    ei toimi kunnolla
    addTask(course, task) {
      const lastId = this.courses.tasks.length > 0
          ? this.courses.tasks[this.courses.tasks.length - 1].id
          : 0;
      const id = lastId + 1;
      const newTask = {...task, id};
      course.tasks = [...course.tasks, newTask]

    }
    */



  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

#table {
  margin-top: -468px;
  float: right;
}

div {
  margin: 50px;
}


</style>

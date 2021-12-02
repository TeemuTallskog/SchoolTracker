<template>
  <div id="form">
    <course-form @add:course="addCourse" />

    <div id="table">
    <course-table :courses="courses"
    @delete:course="deleteCourse"/>
  </div>
  </div>

</template>

<script>
import CourseForm from "./components/CourseForm.vue";
import CourseTable from "./components/CourseTable";

export default {
  name: 'App',
  components: {
    CourseTable,
    CourseForm
  },
  data() {
    return {
      courses: [
          {id: 1,
          name: "math",
          date: "29-11-2021",
          taskName: "Weekly task 5",
          taskInfo: "Complete exercises 1-5"},
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
    }


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
<template>
  <div id="form">
    <course-form @add:course="addCourse" />
    <course-table :courses="courses"/>
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
      courses: []
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
</style>

<template>
 <div id="course-table">
   <ul v-for="course in courses" :key="course.id" v-on:click="redirectTo(course)">
     <li>{{ course.name }}</li>
   </ul>
 </div>
</template>

<script>
export default {
  name: "course-table",
  props: {
    courses: Array,
  },
  methods: {
    redirectTo: function (course){
      window.location.href=course.link;
    }
  }
}
</script>

<style scoped>

</style>
<template>
 <div id="course-table">
   <ul v-for="course in courses" :key="course.id">
     <li><a href="{{course.link}}">{{ course.name }}</a></li>
   </ul>
 </div>
</template>

<script>
export default {
  name: "course-table",
  props: {
    courses: Array,
  },
}
</script>

<style scoped>

</style>
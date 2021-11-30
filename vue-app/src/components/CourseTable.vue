<template>
 <div id="course-table">
   <h1>Tehtävät</h1>
   <!-- <ul v-for="course in courses" :key="course.id" v-on:click="redirectTo(course)"> -->
     <ul v-for="course in courses" :key="course.id">
     <li>
       <p>{{ course.id }}</p>
       <h2>{{ course.name }}</h2>
       <p>{{ course.date }}</p>
       <p>{{ course.taskName }}</p>
       <p>{{ course.taskInfo }}</p>
       <button @click="$emit('delete:course', course.id)">Delete</button>
     </li>
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

div {
  border: 1px solid;
  width: 500px
}

li {
  margin: 5px;
  padding: 5px;
}

</style>
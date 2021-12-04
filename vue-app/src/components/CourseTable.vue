<template>
 <div id="course-table">
   <h1>Tehtävät</h1>
   <!-- <ul v-for="course in courses" :key="course.id" v-on:click="redirectTo(course)"> -->
     <ul v-for="course in courses" :key="course.id">
     <li>
       <p>{{ course.id }}</p>
       <h2>{{ course.name }}</h2>
        <ul v-for="task in course.tasks" :key="task.id">
          <p>{{task.id}}</p>
          <h3>{{task.name}}</h3>
          <p>{{task.date}}</p>
          <p>{{task.info}}</p>
          <button href="javascript:;" @click="deleteTask(course, task)">Delete task</button>
          <br>
        </ul>
       <button @click="$emit('delete:course', course.id)">Delete course</button>
     </li>
   </ul>
 </div>
</template>

<script>
export default {
  name: "course-table",
  props: {
    courses: Array,
    tasks: Array,
  },
  methods: {
    redirectTo: function (course){
      window.location.href=course.link;
    },

    deleteTask(course, task) {
      let i = course.tasks.indexOf(task)
      course.tasks.splice(i, 1);

      console.log("Task " + i + " deleted")
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
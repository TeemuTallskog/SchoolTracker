<template>
  <div id="course-table">

   <!-- <ul v-for="course in courses" :key="course.id" v-on:click="redirectTo(course)"> -->

   <div v-for="course in courses" :key="course.id">

     <article>
       <h2>{{ course.name }}</h2>

       <div id ="task-div">
        <article v-for="task in course.tasks" :key="task.id">

            <h3 v-if="editing === task.id">
            Nimi: <input type="text" v-model="task.name"/>
            </h3>
            <h3 v-else>{{task.name}}</h3>

            <p v-if="editing === task.id">
            Päivämäärä: <input type="date" v-model="task.date"/>
            </p>
            <p v-else>{{task.date}}</p>

            <p v-if="editing === task.id">
            Lisätiedot: <input type="text" v-model="task.info"/>
            </p>
            <p v-else>{{task.info}}</p>

            <!--

            <p v-if="editing === task.id">
              Kurssi: <input type="text" v-model="task.course"/>
            </p>
            -->
            <p v-if="editing === task.id">
              Linkki: <input type="text" v-model="task.link"/>
            </p>

            <p v-if="editing === task.id">
              <button @click="editTask(task)">Save</button>
              <button class="muted-button" @click="cancelEdit(task)">Cancel</button>
            </p>

            <p v-else>
              <button href="javascript:;" @click="deleteTask(course, task)">Delete</button>
              <button @click="editMode(task)">Edit</button>
            </p>
          <br>
        </article>

       </div>
       <button @click="$emit('delete:course', course.id)">Delete course</button>
     </article>
   </div>

 </div>
</template>

<script>
export default {
  name: "course-table",
  props: {
    courses: Array,
    tasks: Array,
  },

  data() {
    return {
      editing: null,
    }
  },
  methods: {
    redirectTo: function (course){
      window.location.href=course.link;
    },

    deleteTask(course, task) {
      let i = course.tasks.indexOf(task)
      course.tasks.splice(i, 1);

      console.log("Task " + i + " deleted")
    },

    editMode(task) {
      this.cachedTask = Object.assign({}, task)
      this.editing = task.id
    },

    cancelEdit(task) {
      Object.assign(task, this.cachedTask)
      this.editing = null
    },

    editTask(task) {
      if (task.name === '' || task.date === '' || task.info === '' || task.link === '')
        return this.$emit('edit:task', task.id, task)
      this.editing = null;
    }


  }
}
</script>

<style scoped>

#task-div {
}

#course-table {
  margin-top: 0px;
  border: 3px solid green;
  width: 600px;
  height: 750px;
  overflow-y: auto;
}

li {
  margin: 5px;
  padding: 5px;
}

ul {
  list-style: none;
}

</style>
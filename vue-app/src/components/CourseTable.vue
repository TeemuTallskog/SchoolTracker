<template>
  <div id="course-table">

   <!-- <ul v-for="course in courses" :key="course.id" v-on:click="redirectTo(course)"> -->

   <div v-for="course in courses" :key="course.id" id="course-object">

     <article>
       <div id="course-name">
       <h2 id="course-header">{{ course.name }}</h2>
         <p>{{doneTasks(course)}}/{{course.tasks.length}}</p>
       <button class="listVis" v-if="!isHidden(course.id)" @click="hide(course.id)"><img src="@/assets/expanded.png" height="30" width="30">
       </button><button class="listVis" v-else @click="hide(course.id)"><img src="@/assets/contracted.png" height="30" width="30"></button>
       </div>

       <div id ="task-div" v-if="!isHidden(course.id)">
        <article id="task-article" v-for="task in course.tasks" :key="task.id">

            <h3 v-if="editing === task.id">
            Nimi: <input type="text" v-model="task.name"/>
            </h3>
            <h3 v-else>{{task.name}}</h3>

            <p v-if="editing === task.id">
            Päivämäärä: <input type="date" v-model="task.date"/>
            </p>
            <p v-else>{{formatDate(task)}}</p>

            <p v-if="editing === task.id">
            Lisätiedot: <input type="text" v-model="task.info"/>
            </p>
            <p v-else>{{task.info}}</p>

            <img v-if="task.done == 1 && editing==null" src="@/assets/Done.png" width="40" height="40">
            <img v-else-if="task.done == 0 && pastDate(task) && editing==null" src="@/assets/New.png" width="40" height="40">
            <img v-else-if="editing==null" src="@/assets/Failed.png" width="40" height="40">

            <!--

            <p v-if="editing === task.id">
              Kurssi: <input type="text" v-model="task.course"/>
            </p>
            -->
            <p v-if="editing === task.id">
              Linkki: <input type="text" v-model="task.link"/>
            </p>

            <p v-if="editing === task.id">
              <button @click="editTask(task)">Tallenna</button>
              <button class="muted-button" @click="cancelEdit(task)">Peruuta</button>
            </p>

            <p v-else>
              <button v-if="task.done == 0" @click="$emit('done:task', task.id , 1)">Mark as done</button>
              <button v-if="task.done == 1" @click="$emit('done:task', task.id , 0)">Mark as in progress</button>
              <button href="javascript:;" @click="$emit('delete:task', task.id)">Poista</button>
              <button @click="editMode(task)">Muokkaa</button>
            </p>
          <br>
        </article>

       </div>
       <button @click="$emit('delete:course', course.id)">Poista kurssi</button>
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
      hiddenArr: []
    }
  },
  methods: {
    doneTasks(course){
      let n = 0;
      for(let i = 0; i < course.tasks.length; i++){
        if(course.tasks[i].done == 1) n++;
      }
      return n;
    },
    hide(courseID){
      if(!this.hiddenArr.includes(courseID)){
        this.hiddenArr.push(courseID);
      }else {
        this.hiddenArr = this.hiddenArr.filter(item => item !== courseID);
      }
    },
    isHidden(courseID){
      if(this.hiddenArr.includes(courseID)) return true;
      else return false;
    },
    formatDate(task){
      const s = task.date.substring(0, task.date.indexOf("T"));
      return s;
    },
    pastDate(task){
      const today = new Date();
      const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
      const current = new Date(date);
      const set = new Date(task.date);
      if(set > current){
        return true;
      }else{
        return false;
      }
    },
    redirectTo: function (course){
      window.location.href=course.link;
    },

    editMode(task) {
      this.cachedTask = Object.assign({}, task)
      this.editing = task.id
    },

    cancelEdit(task) {
      Object.assign(task, this.cachedTask)
      console.log(task)
      this.editing = null
    },

    editTask(task) {

      console.log(task);
      this.editing = null;
      if (task.name != '' && task.date != '' && task.id != '' && task.courseID != '') {
        return this.$emit('edit:task', task.id, task)
      }else{
        alert("Missing values!");
        this.cancelEdit(task);
      }
    }


  }
}
</script>

<style scoped>

#course-object{
  border: 3px solid green;
  padding-bottom: 25px;
}

#task-article{
  border-bottom: 1px solid green;
}

.listVis {
  background: none;
  margin: 0;
  padding: 0;
}

#course-header{
  margin: 0;
  width: 25%;
  height: 100%;
  float: left;
}

#course-name{
  display: flex;
  align-items: center;
  justify-content: center;
}

#course-table {
  margin-top: 0px;
  width: 900px;
  height: auto;
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
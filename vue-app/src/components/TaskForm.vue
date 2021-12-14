<template>
  <div id="task-form">
    <form @submit.prevent="handleSubmit">
      <h1>Uusi tehtävä</h1>

      <label for="name"></label>
      <input id="name" v-model="task.name" type="text" placeholder="Tehtävän nimi" required maxlength="50"
             oninvalid="this.setCustomValidity('Lisää tehtävän nimi')"
             oninput="this.setCustomValidity('')"/>


      <label id ="course-label" for="course">Valitse kurssi: </label>
      <select  v-model="task.courseID" id="course">
        <option v-for="course in courses" :key="course.id" :value="course.id">{{course.name}}</option>
      </select>

      <br>

      <label for="date"></label>
      <input id="date" v-model="task.date" type="date" required
             oninvalid="this.setCustomValidity('Valitse tehtävälle päivämäärä')"
             oninput="this.setCustomValidity('')"/>

      <label for="link"></label>
      <input id ="link" v-model="task.link" type="text" placeholder="Linkki">

      <br>

      <textarea id="info" rows="10" cols="71" v-model="task.info" type="text" placeholder="Lisätietoja tehtävästä" maxlength="255"></textarea>

      <br>

      <button>Luo tehtävä</button>

    </form>
  </div>
</template>

<script>
export default {
  name: "TaskForm",
  props: {
    courses: Array,
  },
  data(){
    return{
      task: {
        name: '',
        courseID: '',
        link: '',
        date: '',
        info:'',
      },
    }
  },
  methods: {
    handleSubmit(){
      this.$emit('add:task', this.task)
    }
  }
}
</script>

<style scoped>

div {
  padding: 10px;
  width: 700px;
}

input {
  width: 250px;
  height: 20px;
  margin: 15px;
}

select {
  width: 100px;
  margin-right: 35px;

}

#course-label {
  margin-left: 52px;
}

</style>
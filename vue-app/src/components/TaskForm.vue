<template>
  <div id="course-form">
    <form @submit.prevent="handleSubmit">
      <h1>Uusi tehtävä</h1>

      <label for="name"></label>
      <input id="name" v-model="task.name" type="text" placeholder="Tehtävän nimi">

      <label for="course"></label>
      <input id="course" v-model="task.course" type="text" placeholder="Kurssin nimi">

      <br>

      <label for="date"></label>
      <input id="date" v-model="task.date" type="date">

      <label for="link"></label>
      <input id ="link" v-model="task.link" type="text" placeholder="Linkki">

      <br>

      <textarea id="info" rows="10" cols="56" v-model="task.info" type="text" placeholder="Lisätietoja tehtävästä"></textarea>

      <br>

      <button>Luo Tehtävä</button>

    </form>
  </div>
</template>

<script>
export default {
  name: "TaskForm",
  data(){
    return{
      task: {
        name: '',
        link: '',
        date:'',
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
  border: 1px solid;
  width: 700px;
}

input {
  width: 200px;
  margin: 10px;
  align: bottom;
}




</style>
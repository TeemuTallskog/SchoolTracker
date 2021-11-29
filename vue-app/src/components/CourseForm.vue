<template>
<div id="course-form">
  <form @submit.prevent="handleSubmit">
    <h1>Uusi tehtävä</h1>

    <label for="name"></label>
    <input id="name" v-model="course.name" type="text" placeholder="Kurssin nimi">

    <label for="link"></label>
    <input id ="link" v-model="course.link" type="text" placeholder="Linkki">

    <br>

    <label for="date"></label>
    <input id="date" v-model="course.date" type="date">


    <label for="taskName"></label>
    <input id ="taskName" v-model="course.taskName" type="text" placeholder="Tehtävän nimi">

    <br>

    <textarea id="taskInfo" rows="10" cols="56" v-model="course.taskInfo" type="text" placeholder="Lisätietoja tehtävästä"></textarea>

    <br>

    <button>Luo Tehtävä</button>

  </form>
</div>
</template>

<script>
export default {
  name: "CourseForm",
  data(){
    return{
      course: {
        name: '',
        link: '',
        date:'',
        taskName: '',
        taskInfo:'',
      },
    }
  },
  methods: {
    handleSubmit(){
      this.$emit('add:course', this.course)
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
<template>
<div id="course-form">
  <form @submit.prevent="handleSubmit">
    <h1>Uusi Kurssi</h1>

    <label for="name"></label>
    <input id="name" v-model="course.name" type="text" placeholder="Kurssin nimi">

    <label for="link"></label>
    <input id ="link" v-model="course.link" type="text" placeholder="Linkki">

    <br>

    <textarea id="taskInfo" rows="10" cols="56" v-model="course.info" type="text" placeholder="Lisätietoja kurssista"></textarea>

    <br>

    <button>Luo Kurssi</button>

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
        info: '',
        task: [ {id: '',
                  name: '',
                  date: '',
                  info: '',}],
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
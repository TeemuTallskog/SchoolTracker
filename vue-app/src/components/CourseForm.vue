<template>
<div id="course-form">
  <form @submit.prevent="handleSubmit">
    <h1>Uusi kurssi</h1>

    <label for="name"></label>
    <input id="name" v-model="course.name" type="text" placeholder="Kurssin nimi" maxlength="50" required
           oninvalid="this.setCustomValidity('Lisää kurssin nimi')"
           oninput="this.setCustomValidity('')"/>


    <label for="link"></label>
    <input id ="link" v-model="course.link" type="text" placeholder="Linkki" maxlength="255">

    <br>

    <textarea id="taskInfo" rows="10" cols="71" v-model="course.info" type="text" placeholder="Lisätietoja kurssista" maxlength="255"></textarea>

    <br>

    <button>Luo kurssi</button>

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
        tasks: [],
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
  width: 700px;
}

input {
  width: 250px;
  height: 20px;
  margin: 15px;
}

</style>
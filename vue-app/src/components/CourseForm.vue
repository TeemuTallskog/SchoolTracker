<template>
<div id="course-form">
  <form @submit.prevent="handleSubmit">
    <label>Kurssin nimi:</label>
    <input v-model="course.name" type="text">
    <label>Linkki:</label>
    <input v-model="course.link" type="text">
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

</style>
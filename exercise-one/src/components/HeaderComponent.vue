<template>
  <div class="text-center">
    <h4 class="title display-6">{{ title }}</h4>
  </div>
</template>

<script>
export default {
  name: 'headerComponent',
  props: {
    title: {
      type: String,
      default: ''
    }
  }
}
</script>

<style scoped>
.title {
  color: #343a40;
  padding: 0.5rem;
}
</style>

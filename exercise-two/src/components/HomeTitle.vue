<template>
  <h1 class="display-3">{{ title }}</h1>
</template>

<script>
export default {
  name: 'titleFilms',
  props: {
    title: {
      type: String,
      default: 'Popular Movies'
    }
  }
}
</script>
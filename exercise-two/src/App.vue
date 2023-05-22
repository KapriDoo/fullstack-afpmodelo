<template>
  <main>
    <div id="app">
      <NavBarFilms />
      <RouterView />
    </div>
  </main>
</template>

<script>
import NavBarFilms from './components/NavBarFilms.vue'
export default {
  name: 'app',
  components: {
    NavBarFilms
  },
  data() {
    return {
      isMobile: false
    }
  },
  mounted() {
    this.setMobile()
    this.$nextTick(function () {
      window.addEventListener('resize', this.setMobile)
      this.setMobile
    })
  },
  methods: {
    setMobile() {
      this.isMobile = this.$isMobile()
    }
  }
}
</script>

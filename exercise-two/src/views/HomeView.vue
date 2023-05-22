<template>
  <div>
    <div class="container text-center container-films">
      <HomeTitle />
      <div class="row">
        <div class="col-12"><HomeFilms /></div>
      </div>
    </div>
  </div>
</template>

<script>
import NavBarFilms from '../components/NavBarFilms.vue'
import HomeTitle from '../components/HomeTitle.vue'
import HomeFilms from '../components/HomeFilms.vue'
export default {
  name: 'home',
  components: {
    NavBarFilms,
    HomeTitle,
    HomeFilms
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
  },
  computed: {}
}
</script>

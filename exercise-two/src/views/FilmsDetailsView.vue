<template>
  <div>
    <div class="container text-center container-films">
      <HomeTitle v-if="film" :title="`${film.title} ${film.release_date}`" />
      <div class="row">
        <div
          class="col-12"
          :style="{
            backgroundImage: `url(https://image.tmdb.org/t/p/original/${film.backdrop_path})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center center'
          }"
        >
          <DetailFilm :id="id" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import store from '../store'
import { mapGetters } from 'vuex'
import HomeTitle from '../components/HomeTitle.vue'
import DetailFilm from '../components/DetailFilm.vue'
export default {
  props: ['id'],
  components: {
    HomeTitle,
    DetailFilm
  },
  mounted() {
    this.getMyFilm()
  },
  computed: {
    ...mapGetters(['getFilm']),
    film: {
      get() {
        return this.getFilm
      }
    }
  },
  methods: {
    getMyFilm() {
      store.dispatch('changeFilm', atob(this.id))
      if (!this.film) {
        this.$router.push({
          name: 'home'
        })
      }
    }
  }
}
</script>
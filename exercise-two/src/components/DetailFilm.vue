<template>
  <div class="row opacity-film">
    <div class="col col-sm-12 col-lg-3">
      <img
        :src="`https://image.tmdb.org/t/p/original/${film.poster_path}`"
        class="card-img-top img-detail-poster"
        :alt="`https://image.tmdb.org/t/p/original/${film.poster_path}`"
      />
    </div>
    <div class="col col-sm-12 col-lg-9">
      <div class="row">
        <div class="col-12">
          <div class="card card-detail-overview">
            <h6>{{ film.overview }}</h6>
          </div>
        </div>
        <div class="col-12"><CarouselDetail /></div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import store from '../store'
import CarouselDetail from './CarouselDetail.vue'
export default {
  props: ['id'],
  components: {
    CarouselDetail
  },
  mounted() {
    this.getCredits()
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
    getCredits() {
      store.dispatch('changeCredits', atob(this.id))
    }
  }
}
</script>

<style scoped>
.img-detail-poster {
  width: 20rem;
  padding-top: 2rem;
  padding-bottom: 2rem;
  border-radius: 0.5rem;
  float: left;
  margin-left: 1rem;
}

.opacity-film {
  background: linear-gradient(to bottom right, rgba(31.5, 31.5, 31.5, 1), rgba(31.5, 31.5, 31.5, 0.84));
}

.card-detail-overview {
  margin: 2rem 1rem 1rem 1rem;
  background: transparent;
  color: ghostwhite;
  border: unset;
}
</style>
<template>
  <div id="carouselCast" class="carousel slide" data-bs-ride="carousel">
    <div class="carousel-inner">
      <div
        :class="['carousel-item', index == 0 ? 'active' : '']"
        data-bs-interval="100000000"
        v-for="(c, index) in cast"
        :key="c.id"
      >
        <div class="row">
          <div class="col-lg-3 col-sm-12">
            <img
              :src="`https://image.tmdb.org/t/p/original/${c.profile_path}`"
              class="d-block cast-img"
              :alt="`https://image.tmdb.org/t/p/original/${c.profile_path}`"
            />
          </div>
          <div class="col-lg-9 col-sm-12">
            <div class="card card-detail-overview">
              <h5>{{ c.name }} ({{ c.original_name }})</h5>
              <h5>{{ c.character }}</h5>
            </div>
          </div>
        </div>
      </div>
    </div>
    <button
      class="carousel-control-prev"
      type="button"
      data-bs-target="#carouselCast"
      data-bs-slide="prev"
    >
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Previous</span>
    </button>
    <button
      class="carousel-control-next"
      type="button"
      data-bs-target="#carouselCast"
      data-bs-slide="next"
    >
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Next</span>
    </button>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters(['getCast']),
    cast: {
      get() {
        return this.getCast
      }
    }
  }
}
</script>

<style scoped>
.cast-img {
  width: 15rem;
}
.carousel {
  margin: 0rem 2rem 1rem 2rem;
}

.card-detail-overview {
  margin: 2rem 1rem 1rem 1rem;
  background: transparent;
  color: ghostwhite;
  border: unset;
}

.carousel-control-prev-icon {
  display: none;
}

.carousel-control-next-icon {
  display: none;
}
@media (max-width: 576px) {
  .cast-img {
    width: 18rem;
  }
}
</style>
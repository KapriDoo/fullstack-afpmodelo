
<template>
  <div class="row row-films">
    <div class="col-lg-3 col-md-6 col-sm-6 col-films" v-for="film in filterFilms" :key="film.id">
      <div class="card card-films" @click="goToDetail(film.id)">
        <img
          :src="`https://image.tmdb.org/t/p/original/${film.poster_path}`"
          class="card-img-top"
          :alt="`https://image.tmdb.org/t/p/original/${film.poster_path}`"
        />
        <div class="card-body">
          <h5 class="card-title display-6">
            <small
              :class="[
                'text-popularity',
                Math.round(film.popularity) >= 10000 ? 'text-color-green' : 'text-color-yellow'
              ]"
              >{{ Math.round(film.popularity) }}<br /><span class="text-p">Pop</span></small
            >
            {{ film.original_title }}
          </h5>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      filterFilms: []
    }
  },
  mounted() {
    if (this.search !== '') {
      const filteredFilms = this.films.filter((film) => {
        const regex = new RegExp(`\\b${this.search}\\b`, 'gi')
        return regex.test(film.title)
      })
      this.filterFilms = filteredFilms
    } else {
      this.filterFilms = this.films
    }
  },
  computed: {
    ...mapGetters(['getFilms', 'getSearch']),
    films: {
      get() {
        return this.getFilms
      }
    },
    search: {
      get() {
        return this.getSearch
      }
    }
  },
  methods: {
    goToDetail(id) {
      this.$router.push({
        name: 'filmsDetailsView',
        params: {
          id: btoa(id)
        }
      })
    }
  },
  watch: {
    search(newSearch) {
      if (newSearch !== '') {
        const filteredFilms = this.getFilms.filter((film) => {
          const regex = new RegExp(`\\b${newSearch}\\b`, 'gi')
          return regex.test(film.title)
        })
        this.filterFilms = filteredFilms
      } else {
        this.filterFilms = this.getFilms
      }
    }
  }
}
</script>


<style scoped>
.card-films {
  width: 18rem;
  min-height: 33rem;
  max-height: 33rem;
}

::v-deep .display-6 {
  font-size: 22px;
}

.col-films {
  padding-bottom: 1rem;
}

.row-films {
  padding-top: 1rem;
  text-align: -webkit-center;
  background: linear-gradient(
    to bottom right,
    rgba(31.5, 31.5, 31.5, 1),
    rgba(31.5, 31.5, 31.5, 0.84)
  );
}

.text-popularity {
  --bs-text-opacity: 1;
  background-color: #204529;
  padding: 10px;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  float: left;
  font-size: 16px;
}

.text-color-green {
  color: greenyellow;
}

.text-color-yellow {
  color: yellow;
}
</style>
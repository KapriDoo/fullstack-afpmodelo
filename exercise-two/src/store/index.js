import { createStore } from 'vuex'
import films from './films'

const store = createStore({
  state() {
    return {
      search: '',
      films: films,
      film: {},
      cast: [],
      token:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMzU4OTE0ZDgxMjNmMDc1NjlkODg0YmUzMjliYjc4MSIsInN1YiI6IjY0NmE5MDg3NTc1MzBlMDBlNWE0MjE0ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.i5HfrSUrC1sLHAr7LlgyQcAmXQEXaCobr8PbvdOGjug'
    }
  },
  getters: {
    getFilms: (state) => {
      return state.films
    },
    getFilm: (state) => {
      return state.film
    },
    getCast: (state) => {
      return state.cast
    },
    getSearch: (state) => {
      return state.search
    }
  },
  mutations: {
    setFilm(state, id) {
      state.film = state.films.find((film) => film.id === parseInt(id))
    },
    setCredits(state, id) {
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: state.token
        }
      }

      fetch(`https://api.themoviedb.org/3/movie/${id}/credits?language=en-US`, options)
        .then((response) => response.json())
        .then((response) => (state.cast = response.cast))
        .catch((err) => console.error(err))
    },
    setSearch(state, val) {
      state.search = val
    }
  },
  actions: {
    changeFilm({ commit }, id) {
      commit('setFilm', id)
    },
    changeCredits({ commit }, id) {
      commit('setCredits', id)
    }
  }
})

export default store

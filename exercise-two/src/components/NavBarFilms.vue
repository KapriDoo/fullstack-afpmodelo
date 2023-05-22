<template>
  <nav class="navbar navbar-expand-lg bg-light">
    <div class="container-fluid">
      <a class="navbar-brand display-6" href="#">Modelo Films</a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0"></ul>
        <form class="d-flex" role="search" @submit="onSearch">
          <input
            class="form-control me-2 form-search-movie"
            type="search"
            placeholder="Search Movies"
            aria-label="Search"
            v-model="search"
          />
        </form>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
  computed: {
    ...mapGetters(['getSearch']),
    search: {
      get() {
        return this.getSearch
      },
      set(value) {
        this.setSearch(value)
      }
    }
  },
  methods: {
    ...mapMutations(['setSearch']),
    onSearch(event) {
      event.preventDefault()
      if (this.$route.name !== 'home') {
        this.$router.push({
          name: 'home'
        })
      }
    }
  }
}
</script>

<style scoped>
.form-search-movie {
  width: 40rem;
}

@media (max-width: 576px) {
  .form-search-movie {
    width: 100%;
  }
}
</style>
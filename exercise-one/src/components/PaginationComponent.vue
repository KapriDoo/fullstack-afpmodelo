<template>
  <div class="row">
    <div class="col col-lg-3">
      <p class="text-length">Completas: {{ completadas }} Pendientes: {{ pendientes }}</p>
    </div>
    <div class="col" v-if="!isMobile">
      <nav aria-label="...">
        <ul class="pagination justify-content-end">
          <li :class="['page-item', currentPage === 1 ? 'disabled' : '']" @click="previusPage">
            <span class="page-link">{{ textPreviusPage }}</span>
          </li>
          <li
            :class="['page-item', currentPage === page ? 'active' : '']"
            v-for="(page, index) in totalPages"
            :key="index"
            @click="changePage(page)"
          >
            <a class="page-link">{{ page }}</a>
          </li>
          <li
            class="page-item"
            :class="['page-item', currentPage === totalPages ? 'disabled' : '']"
            @click="nextPage"
          >
            <a class="page-link">{{ textNextPage }}</a>
          </li>
        </ul>
      </nav>
    </div>
    <div class="col" v-else>
      <nav aria-label="...">
        <ul class="pagination">
          <li :class="['page-item', currentPage === 1 ? 'disabled' : '']" @click="previusPage">
            <span class="page-link">{{ textPreviusPage }}</span>
          </li>
          <li
            class="page-item"
            :class="['page-item', currentPage === totalPages ? 'disabled' : '']"
            @click="nextPage"
          >
            <a class="page-link">{{ textNextPage }}</a>
          </li>
        </ul>
      </nav>
    </div>
    <div class="col col-lg-2">
      <p class="text-length">Tareas: {{ tasks.length }}</p>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import store from '../store'
export default {
  name: 'PaginationComponent',
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
  computed: {
    ...mapGetters([
      'getTotalPages',
      'getCurrentPage',
      'getTextPreviusPage',
      'getTextNextPage',
      'getTasks',
      'getItemsPerPage'
    ]),
    tasks: {
      get() {
        return this.getTasks
      }
    },
    completadas: {
      get() {
        return this.getTasks.filter((el) => el.status).length
      }
    },
    pendientes: {
      get() {
        return this.getTasks.filter((el) => !el.status).length
      }
    },
    totalPages: {
      get() {
        return this.getTotalPages
      }
    },
    currentPage: {
      get() {
        return this.getCurrentPage
      }
    },
    textPreviusPage: {
      get() {
        return this.getTextPreviusPage
      }
    },
    textNextPage: {
      get() {
        return this.getTextNextPage
      }
    },
    itemsPerPage: {
      get() {
        return this.getItemsPerPage
      },
      set(value) {
        this.setItemsPerPage(value)
      }
    }
  },
  methods: {
    ...mapMutations(['setItemsPerPage']),
    nextPage: async () => {
      await store.dispatch('goToNextPage')
    },
    previusPage: async () => {
      await store.dispatch('goToPreviousPage')
    },
    changePage: async (page) => {
      await store.dispatch('changePage', page)
    },
    setMobile() {
      this.isMobile = this.$isMobile()
      if (this.$isMobile()) this.itemsPerPage = 2
      else this.itemsPerPage = 5
    }
  }
}
</script>

<style scoped>
.page-link {
  cursor: pointer;
}

.text-length {
  text-align: -webkit-center;
  padding: 0.4rem;
  font-weight: 600;
}

@media (max-width: 576px) {
  .text-length {
    text-align: -webkit-center;
    padding: 0.4rem;
    font-weight: 400;
    font-size: 14px;
  }

  .pagination {
    place-content: center;
  }
}
</style>

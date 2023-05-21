<template>
  <div class="row">
    <div class="card card-home">
      <div class="card-header">
        <HeaderComponent :title="title" />
      </div>
      <TaskListComponent />
      <div class="card-footer text-muted"><PaginationComponent /></div>
    </div>
  </div>
</template>

<script>
import HeaderComponent from '../components/HeaderComponent.vue'
import TaskListComponent from '../components/TaskListComponent.vue'
import PaginationComponent from '../components/PaginationComponent.vue'
import { mapGetters, mapMutations } from 'vuex'
export default {
  name: 'home',
  components: {
    HeaderComponent,
    TaskListComponent,
    PaginationComponent
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
    ...mapMutations(['setItemsPerPage']),
    setMobile() {
      this.isMobile = this.$isMobile()
      if (this.$isMobile()) this.itemsPerPage = 2
      else this.itemsPerPage = 5
    }
  },
  computed: {
    ...mapGetters(['getTitle', 'getItemsPerPage']),
    title: {
      get() {
        return this.getTitle
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
  }
}
</script>

<style scoped>
.card-home {
  width: 60rem;
  height: 50rem;
}
</style>

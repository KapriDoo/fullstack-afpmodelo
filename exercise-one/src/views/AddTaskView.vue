<template>
  <div class="row">
    <div class="card" style="width: 60rem; height: 50rem">
      <div class="card-header">
        <HeaderComponent :title="title" />
      </div>
      <AddTaskComponent />
    </div>
  </div>
</template>

<script>
import HeaderComponent from '../components/HeaderComponent.vue'
import AddTaskComponent from '../components/AddTaskComponent.vue'
import { mapGetters } from 'vuex'
export default {
  name: 'addTaskView',
  components: {
    HeaderComponent,
    AddTaskComponent
  },
  computed: {
    ...mapGetters(['getTitleAddTask']),
    title: {
      get() {
        return this.getTitleAddTask
      }
    }
  }
}
</script>

<style></style>

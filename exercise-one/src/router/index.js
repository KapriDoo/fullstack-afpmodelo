import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import addTaskView from '../views/AddTaskView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/add-task',
      name: 'addTaskView',
      component: addTaskView
    }
  ]
})

export default router

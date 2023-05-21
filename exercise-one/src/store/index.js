import { createStore } from 'vuex'
import tasks from './tasks'
import { v4 as uuidv4 } from 'uuid'

const store = createStore({
  state() {
    return {
      title: 'Lista de Tareas',
      titleAddTask: 'Agregar Tarea',
      textNoTask: 'No existen tareas creadas',
      textPreviusPage: 'Anterior',
      textNextPage: 'Siguiente',
      tasks: tasks,
      itemsPerPage: 5,
      currentPage: 1,
      buttonTextCompleted: 'Completado',
      buttonTextDeleted: 'Eliminar',
      textCompleted: 'COMPLETADA',
      textPending: 'PENDIENTE',
      buttonTextBack: 'Volver',
      buttonTextSave: 'Agregar',
      placeholderTitle: 'Tarea número 1',
      placeholderDescription: 'En esta tarea veremos...',
      formTextTitle: 'Agrega un titulo a la tarea',
      formTextDescription: 'Agrega una descripción (opcional)'
    }
  },
  getters: {
    getTitle: (state) => {
      return state.title
    },
    getTitleAddTask: (state) => {
      return state.titleAddTask
    },
    getTextNoTask: (state) => {
      return state.textNoTask
    },
    getTasks: (state) => {
      return state.tasks
    },
    getPaginatedTasks: (state) => {
      const startIndex = (state.currentPage - 1) * state.itemsPerPage
      const endIndex = startIndex + state.itemsPerPage
      return state.tasks.slice(startIndex, endIndex)
    },
    getTotalPages: (state) => {
      return Math.ceil(state.tasks.length / state.itemsPerPage)
    },
    getCurrentPage: (state) => {
      return state.currentPage
    },
    getTextPreviusPage: (state) => {
      return state.textPreviusPage
    },
    getTextNextPage: (state) => {
      return state.textNextPage
    },
    getItemsPerPage: (state) => {
      return state.itemsPerPage
    },
    getButtonTextCompleted: (state) => {
      return state.buttonTextCompleted
    },
    getButtonTextDeleted: (state) => {
      return state.buttonTextDeleted
    },
    getTextCompleted: (state) => {
      return state.textCompleted
    },
    getTextPending: (state) => {
      return state.textPending
    },
    getButtonTextBack: (state) => {
      return state.buttonTextBack
    },
    getButtonTextSave: (state) => {
      return state.buttonTextSave
    },
    getPlaceholderTitle: (state) => {
      return state.placeholderTitle
    },
    getPlaceholderDescription: (state) => {
      return state.placeholderDescription
    },
    getFormTextTitle: (state) => {
      return state.formTextTitle
    },
    getFormTextDescription: (state) => {
      return state.formTextDescription
    }
  },
  mutations: {
    setTitle(state, val) {
      state.title = val
    },
    setTitleAddTask(state, val) {
      state.titleAddTask = val
    },
    setTextNoTask(state, val) {
      state.textNoTask = val
    },
    setTasks(state, val) {
      state.tasks = val
    },
    setCurrentPage(state, val) {
      state.currentPage = val
    },
    setItemsPerPage(state, val) {
      state.itemsPerPage = val
    },
    nextPage(state) {
      if (state.currentPage < Math.ceil(state.tasks.length / state.itemsPerPage)) {
        state.currentPage++
      }
    },
    previousPage(state) {
      if (state.currentPage > 1) {
        state.currentPage--
      }
    },
    deleteTask(state, taskId) {
      state.tasks = state.tasks.filter((task) => task.id !== taskId)
    },
    updateTaskStatus(state, taskId) {
      const task = state.tasks.find((task) => task.id === taskId)
      if (task) {
        task.status = true
      }
    },
    addTask(state, { title, description }) {
      const newTask = {
        id: uuidv4(),
        title: title,
        description: description,
        status: false
      }
      state.tasks.unshift(newTask)
    }
  },
  actions: {
    changePage({ commit }, page) {
      commit('setCurrentPage', page)
    },
    goToNextPage({ commit }) {
      commit('nextPage')
    },
    goToPreviousPage({ commit }) {
      commit('previousPage')
    },
    deleteTask({ commit }, taskId) {
      commit('deleteTask', taskId)
    },
    updateTaskStatus({ commit }, taskId) {
      commit('updateTaskStatus', taskId)
    },
    addTask({ commit }, { title, description }) {
      commit('addTask', { title, description })
    }
  }
})

export default store

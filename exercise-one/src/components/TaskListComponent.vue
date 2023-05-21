<template>
  <div class="card card-task-list border-light mb-3" style="height: 41rem">
    <div class="card-header header-add-task">
      <ul class="nav nav-pills card-header-pills" @click="goAddTask">
        <li class="nav-item">
          <a class="nav-link active">{{ titleAddTask }}</a>
        </li>
        <li class="nav-item li-home">
          <ToastComponent v-if="showAlert" :msg="msg" />
        </li>
      </ul>
    </div>
    <div class="card-body">
      <div v-if="tasks.length > 0">
        <ul class="list-group" v-for="task in tasks" :key="task.id">
          <li class="list-group-item">
            <div class="row">
              <div class="col-12 col-md">
                <h6 class="text-task">
                  {{ task.title }}
                  <small
                    :class="['text-muted', task.status ? 'status-completado' : 'status-pendiente']"
                    >{{ task.status ? textCompleted : textPending }}
                  </small>
                </h6>

                <h6>
                  <small class="text-muted">{{ task.description }}</small>
                </h6>
              </div>
              <div class="col-12 col-md-3 text-center text-md-right">
                <button
                  type="button"
                  :class="[
                    'btn',
                    'btn-outline-success',
                    'button-actions',
                    task.status ? 'disabled' : ''
                  ]"
                  @click="updateTaskStatus(task.id)"
                >
                  {{ buttonTextCompleted }}
                </button>
                <button
                  type="button"
                  class="btn btn-outline-danger button-actions"
                  @click="deleteTask(task.id)"
                >
                  {{ buttonTextDeleted }}
                </button>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <h5 class="title" v-else>{{ textNoTask }}</h5>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import store from '../store'
import ToastComponent from './ToastComponent.vue'
export default {
  name: 'taskListComponent',
  components: {
    ToastComponent
  },
  data() {
    return {
      isMobile: false,
      msg: '',
      showAlert: false
    }
  },
  mounted() {
    this.setMobile()
    this.$nextTick(function () {
      window.addEventListener('resize', this.setMobile)
      this.setMobile
    })
  },
  watch: {
    showAlert(newVal) {
      if (newVal) {
        setTimeout(() => {
          this.showAlert = false
        }, 3000)
      }
    }
  },
  computed: {
    ...mapGetters([
      'getTitleAddTask',
      'getPaginatedTasks',
      'getTextNoTask',
      'getItemsPerPage',
      'getButtonTextCompleted',
      'getButtonTextDeleted',
      'getTextCompleted',
      'getTextPending'
    ]),
    titleAddTask: {
      get() {
        return this.getTitleAddTask
      }
    },
    tasks: {
      get() {
        return this.getPaginatedTasks
      }
    },
    textNoTask: {
      get() {
        return this.getTextNoTask
      }
    },
    itemsPerPage: {
      get() {
        return this.getItemsPerPage
      },
      set(value) {
        this.setItemsPerPage(value)
      }
    },
    buttonTextCompleted: {
      get() {
        return this.getButtonTextCompleted
      }
    },
    buttonTextDeleted: {
      get() {
        return this.getButtonTextDeleted
      }
    },
    textCompleted: {
      get() {
        return this.getTextCompleted
      }
    },
    textPending: {
      get() {
        return this.getTextPending
      }
    }
  },
  methods: {
    ...mapMutations(['setItemsPerPage']),
    async deleteTask(id) {
      await store.dispatch('deleteTask', id)
      this.msg = 'Tarea eliminada'
      this.showAlert = true
    },
    async updateTaskStatus(id) {
      await store.dispatch('updateTaskStatus', id)
      this.msg = 'Tarea completada'
      this.showAlert = true
    },
    goAddTask() {
      this.$router.push({ name: 'addTaskView' })
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
.title {
  color: #343a40;
}

.card.card-task-list {
  padding-top: 1rem;
}

.list-group {
  padding: 0.2rem;
  height: 100px;
  max-height: 100px;
}

.list-group-item {
  height: 100px;
}

.text-muted.status-pendiente {
  background-color: yellow;
}

.text-muted.status-completado {
  background-color: greenyellow;
}

.button-actions {
  margin: 0.2rem;
  font-size: 12px;
  font-weight: 400;
}

.header-add-task {
  background-color: transparent;
}

.li-home {
  margin-left: auto;
  max-width: 15rem;
}

@media (max-width: 576px) {
  .button-actions {
    font-size: 10px;
  }

  .list-group {
    height: auto;
    max-height: none;
  }

  .card-header-pills {
    justify-content: center;
  }

  .li-home {
    max-width: 12rem;
    padding-top: 0.5rem;
  }

  .header-add-task {
    align-self: center;
  }
}
</style>

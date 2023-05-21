<template>
  <div class="row">
    <div class="col">
      <form @submit="addTask" class="form-task">
        <div class="mb-3">
          <label for="txtTitulo" class="form-label title">Titutlo</label>
          <input
            type="text"
            class="form-control"
            id="txtTitulo"
            :placeholder="placeholderTitle"
            required
            v-model="title"
          />
          <div id="txtTitulo" class="form-text">{{ formTextTitle }}</div>
        </div>

        <div class="mb-3">
          <label for="txtDescription" class="form-label title">Descripción</label>
          <textarea
            class="form-control task-text-area"
            id="txtDescription"
            :placeholder="placeholderDescription"
            v-model="description"
          />
          <div id="txtDescription" class="form-text">{{ formTextDescription }}</div>
        </div>
        <div class="row row-task">
          <div class="col task-button-back">
            <button type="button" class="btn btn-secondary btn-lg button-task" @click="gotoBack">
              {{ buttonTextBack }}
            </button>
          </div>
          <div class="col task-button-save">
            <button type="submit" class="btn btn-primary btn-lg button-task">
              {{ buttonTextSave }}
            </button>
          </div>
        </div>
      </form>

      <ToastComponent v-if="showAlert" :msg="msg" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import store from '../store'
import ToastComponent from './ToastComponent.vue'
export default {
  components: {
    ToastComponent
  },
  name: 'addTaskComponent',
  data() {
    return {
      title: '',
      description: '',
      msg: '',
      showAlert: false
    }
  },
  computed: {
    ...mapGetters([
      'getButtonTextBack',
      'getButtonTextSave',
      'getPlaceholderTitle',
      'getPlaceholderDescription',
      'getFormTextTitle',
      'getFormTextDescription'
    ]),
    buttonTextBack: {
      get() {
        return this.getButtonTextBack
      }
    },
    buttonTextSave: {
      get() {
        return this.getButtonTextSave
      }
    },
    placeholderTitle: {
      get() {
        return this.getPlaceholderTitle
      }
    },
    placeholderDescription: {
      get() {
        return this.getPlaceholderDescription
      }
    },
    formTextTitle: {
      get() {
        return this.getFormTextTitle
      }
    },
    formTextDescription: {
      get() {
        return this.getFormTextDescription
      }
    }
  },
  watch: {
    showAlert(newVal) {
      if (newVal) {
        setTimeout(() => {
          this.showAlert = false
        }, 2000)
      }
    }
  },
  methods: {
    async addTask(event) {
      event.preventDefault()

      if (this.title.length > 125) {
        this.msg = 'El título debe tener un máximo de 125 caracteres.'
        this.showAlert = true
        return
      }

      if (this.description.length > 300) {
        this.msg = 'La descripción debe tener un máximo de 300 caracteres.'
        this.showAlert = true
        return
      }

      if (this.containsHTML(this.title) || this.containsHTML(this.description)) {
        this.msg = 'El título y la descripción no deben contener etiquetas HTML.'
        this.showAlert = true
        return
      }

      await store.dispatch('addTask', {
        title: this.title,
        description: this.description
      })

      this.title = ''
      this.description = ''

      this.msg = 'Tarea guardada'
      this.showAlert = true
    },
    containsHTML(value) {
      const htmlRegex = /<([a-z]+)\b[^>]*>(.*?)<\/\1>/i
      return htmlRegex.test(value)
    },
    gotoBack() {
      this.$router.push({ name: 'home' })
    }
  }
}
</script>

<style scoped>
.title {
  color: #343a40;
  padding: 0.5rem;
}

.task-text-area {
  min-height: calc(1.5em + 20rem + 2px);
}

.form-task {
  padding-bottom: 1rem;
}

.task-button-back {
  text-align: left;
}

.task-button-save {
  text-align: right;
}

.button-task {
  min-width: 20rem;
}

@media (max-width: 576px) {
  .button-task {
    min-width: 100%;
  }
}
</style>

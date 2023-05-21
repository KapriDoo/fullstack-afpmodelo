<template>
  <main>
    <div id="app" class="container-fluid">
      <RouterView />
    </div>
  </main>
</template>

<script>
import ToastComponent from './components/ToastComponent.vue'
export default {
  name: 'app',
  components: {
    ToastComponent
  }
}
</script>
<template>
  <div v-if="loading" class="spinner-overlay d-flex flex-column align-center justify-center my-8 pa-8">
    <div class="spinner-pulse mb-4">
      <v-progress-circular
        indeterminate
        color="primary"
        size="72"
        width="7"
      ></v-progress-circular>
    </div>
    <div class="text-h6 font-weight-medium text-primary glow-text">
      {{ message }}
    </div>
    <div class="text-caption text-grey-lighten-1 mt-1">
      Consultando base de datos OMDb...
    </div>
  </div>
</template>

<script setup>
defineProps({
  loading: {
    type: Boolean,
    default: false
  },
  message: {
    type: String,
    default: 'Buscando películas y series...'
  }
})
</script>

<style scoped>
.spinner-overlay {
  background: rgba(15, 23, 42, 0.6);
  border-radius: 24px;
  backdrop-filter: blur(8px);
  border: 1px solid rgba(0, 229, 255, 0.1);
}

.spinner-pulse {
  filter: drop-shadow(0 0 16px rgba(0, 229, 255, 0.5));
  animation: pulse 2s infinite alternate;
}

.glow-text {
  text-shadow: 0 0 10px rgba(0, 229, 255, 0.4);
}

@keyframes pulse {
  0% { transform: scale(0.95); opacity: 0.8; }
  100% { transform: scale(1.05); opacity: 1; }
}
</style>

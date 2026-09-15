<template>
  <v-card class="search-card pa-4 mb-6 rounded-xl elevation-6" color="surface">
    <v-card-title class="d-flex align-center text-h6 font-weight-bold text-primary pb-3">
      <v-icon icon="mdi-filmstrip" class="mr-2" color="primary"></v-icon>
      Buscador de Películas y Series
    </v-card-title>
    
    <v-card-text>
      <v-form ref="form" v-model="isFormValid" @submit.prevent="onSearch">
        <v-row dense align="center">
          <!-- Campo de búsqueda por título -->
          <v-col cols="12" md="5">
            <v-text-field
              v-model="searchQuery"
              label="Título de película o serie *"
              placeholder="Ej: Batman, Inception, Matrix..."
              prepend-inner-icon="mdi-magnify"
              variant="outlined"
              density="comfortable"
              clearable
              color="primary"
              :rules="rules.query"
              hide-details="auto"
              @keydown.enter="onSearch"
              @click:clear="onClear"
            ></v-text-field>
          </v-col>

          <!-- Filtro por tipo -->
          <v-col cols="12" sm="6" md="3">
            <v-select
              v-model="selectedType"
              :items="typeOptions"
              item-title="title"
              item-value="value"
              label="Tipo de contenido"
              prepend-inner-icon="mdi-filter-variant"
              variant="outlined"
              density="comfortable"
              color="primary"
              hide-details
            ></v-select>
          </v-col>

          <!-- Filtro por año (opcional) -->
          <v-col cols="12" sm="6" md="2">
            <v-text-field
              v-model="searchYear"
              label="Año (Opcional)"
              placeholder="Ej: 2022"
              prepend-inner-icon="mdi-calendar"
              variant="outlined"
              density="comfortable"
              maxLength="4"
              color="primary"
              :rules="rules.year"
              hide-details="auto"
              @keydown.enter="onSearch"
            ></v-text-field>
          </v-col>

          <!-- Botones de Acción -->
          <v-col cols="12" md="2" class="d-flex ga-2 pt-2 pt-md-0">
            <v-btn
              color="primary"
              variant="elevated"
              size="large"
              block
              class="text-capitalize font-weight-bold rounded-lg"
              prepend-icon="mdi-magnify"
              :disabled="!searchQuery || searchQuery.trim().length < 2"
              @click="onSearch"
            >
              Buscar
            </v-btn>

            <v-btn
              color="secondary"
              variant="tonal"
              size="large"
              icon="mdi-delete-sweep"
              title="Limpiar Búsqueda"
              class="rounded-lg"
              @click="onClear"
            >
            </v-btn>
          </v-col>
        </v-row>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script setup>
import { ref } from 'vue'

const emit = defineEmits(['search-movies', 'clear-results'])

const form = ref(null)
const isFormValid = ref(false)
const searchQuery = ref('')
const selectedType = ref('')
const searchYear = ref('')

const typeOptions = [
  { title: 'Todos los tipos', value: '' },
  { title: 'Películas', value: 'movie' },
  { title: 'Series', value: 'series' },
  { title: 'Episodios', value: 'episode' }
]

const rules = {
  query: [
    v => !!v || 'Ingresa un término para buscar',
    v => (v && v.trim().length >= 2) || 'El término debe tener al menos 2 caracteres'
  ],
  year: [
    v => !v || /^\d{4}$/.test(v) || 'El año debe ser un número de 4 dígitos'
  ]
}

const onSearch = async () => {
  const { valid } = await form.value.validate()
  if (valid && searchQuery.value.trim().length >= 2) {
    emit('search-movies', {
      query: searchQuery.value.trim(),
      type: selectedType.value,
      year: searchYear.value.trim()
    })
  }
}

const onClear = () => {
  searchQuery.value = ''
  selectedType.value = ''
  searchYear.value = ''
  if (form.value) {
    form.value.resetValidation()
  }
  emit('clear-results')
}
</script>

<style scoped>
.search-card {
  border: 1px solid rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(10px);
}
</style>

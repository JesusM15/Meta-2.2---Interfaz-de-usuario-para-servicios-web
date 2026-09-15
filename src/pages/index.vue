<template>
  <v-container class="py-6 max-width-container">
    <!-- Hero / Title Header -->
    <div class="text-center my-6">
      <h1 class="text-h3 font-weight-bold text-gradient mb-2">
        CineSearch Explorer
      </h1>
      <p class="text-subtitle-1 text-grey-lighten-1 max-w-600 mx-auto">
        Explora millones de películas, series y episodios en tiempo real con datos actualizados de OMDb API.
      </p>
    </div>

    <!-- Componente de Búsqueda -->
    <MovieSearch
      @search-movies="handleSearch"
      @clear-results="handleClear"
    />

    <!-- Alerta de Error con Vuetify -->
    <v-alert
      v-if="errorMessage"
      type="error"
      variant="tonal"
      closable
      class="mb-6 rounded-xl elevation-2"
      icon="mdi-alert-circle-outline"
      title="Error en la búsqueda"
      @click:close="errorMessage = ''"
    >
      {{ errorMessage }}
    </v-alert>

    <!-- Componente de Carga (Spinner) -->
    <LoadingSpinner
      :loading="isLoading"
      message="Buscando en el catálogo de películas..."
    />

    <!-- Componente de Listado de Películas -->
    <MovieList
      v-if="!isLoading && moviesList.length > 0"
      :movies="moviesList"
      :total-results="totalResults"
      @select-movie="handleSelectMovie"
    />

    <!-- Mensaje cuando no hay búsquedas ni resultados -->
    <v-card
      v-if="!isLoading && moviesList.length === 0 && !errorMessage && hasSearched"
      class="pa-8 text-center rounded-2xl bg-surface-bright"
    >
      <v-icon icon="mdi-movie-search-outline" size="64" color="primary" class="mb-3"></v-icon>
      <div class="text-h6 text-grey-lighten-1">No se encontraron películas para tu consulta.</div>
      <div class="text-caption text-grey">Intenta buscando con otro nombre o cambiando los filtros.</div>
    </v-card>

    <!-- Modal de Detalles de Película -->
    <MovieDetails
      v-model="isDetailsModalOpen"
      :movie="selectedMovie"
      :loading="isDetailsLoading"
      @close-details="handleCloseDetails"
    />
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import MovieSearch from '../components/MovieSearch.vue'
import MovieList from '../components/MovieList.vue'
import MovieDetails from '../components/MovieDetails.vue'
import LoadingSpinner from '../components/LoadingSpinner.vue'
import { searchMovies, getMovieDetails } from '../services/movieApi.js'

const moviesList = ref([])
const totalResults = ref(0)
const selectedMovie = ref(null)

const isLoading = ref(false)
const isDetailsLoading = ref(false)
const isDetailsModalOpen = ref(false)

const errorMessage = ref('')
const hasSearched = ref(false)

// Búsqueda inicial automática para demo impactante
onMounted(() => {
  handleSearch({ query: 'Batman', type: '', year: '' })
})

const handleSearch = async (searchParams) => {
  isLoading.value = true
  errorMessage.value = ''
  hasSearched.value = true
  moviesList.value = []

  try {
    const data = await searchMovies(searchParams)
    moviesList.value = data.Search || []
    totalResults.value = data.totalResults || 0
  } catch (error) {
    errorMessage.value = error.message || 'Error al realizar la búsqueda de películas.'
    moviesList.value = []
    totalResults.value = 0
  } finally {
    isLoading.value = false
  }
}

const handleSelectMovie = async (imdbId) => {
  isDetailsModalOpen.value = true
  isDetailsLoading.value = true
  selectedMovie.value = null

  try {
    const details = await getMovieDetails(imdbId)
    selectedMovie.value = details
  } catch (error) {
    errorMessage.value = error.message || 'No se pudieron obtener los detalles de la película seleccionada.'
    isDetailsModalOpen.value = false
  } finally {
    isDetailsLoading.value = false
  }
}

const handleCloseDetails = () => {
  selectedMovie.value = null
}

const handleClear = () => {
  moviesList.value = []
  totalResults.value = 0
  errorMessage.value = ''
  hasSearched.value = false
  selectedMovie.value = null
}
</script>

<style scoped>
.max-width-container {
  max-width: 1200px;
}

.text-gradient {
  background: linear-gradient(135deg, #00E5FF 0%, #8B5CF6 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.max-w-600 {
  max-width: 600px;
}
</style>

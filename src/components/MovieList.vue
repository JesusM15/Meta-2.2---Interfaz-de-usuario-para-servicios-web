<template>
  <div class="movie-list-container">
    <div v-if="totalResults" class="d-flex align-center justify-space-between mb-4 px-1">
      <div class="text-caption text-sm-subtitle-1 text-grey-lighten-1">
        Se encontraron <strong class="text-primary">{{ totalResults }}</strong> resultados
      </div>
    </div>

    <v-row v-if="movies && movies.length > 0" dense>
      <v-col
        v-for="movie in movies"
        :key="movie.imdbID"
        cols="12"
        sm="6"
        md="4"
        lg="3"
        class="d-flex pa-2"
      >
        <v-card
          class="movie-card d-flex flex-column flex-grow-1 rounded-2xl overflow-hidden"
          elevation="4"
          color="surface"
          hover
          @click="$emit('select-movie', movie.imdbID)"
        >
          <!-- Póster Responsivo -->
          <div class="poster-wrapper">
            <v-img
              :src="isValidPoster(movie.Poster) ? movie.Poster : fallbackPoster"
              alt="Póster de la película"
              height="350"
              cover
              class="bg-grey-darken-3"
            >
              <template #placeholder>
                <div class="d-flex align-center justify-center fill-height bg-grey-darken-4">
                  <v-progress-circular indeterminate color="primary"></v-progress-circular>
                </div>
              </template>
            </v-img>

            <v-chip
              size="small"
              color="primary"
              variant="flat"
              class="type-chip font-weight-bold text-uppercase"
            >
              {{ movie.Type }}
            </v-chip>
          </div>

          <!-- Contenido de la Tarjeta -->
          <v-card-item class="flex-grow-1 pb-1">
            <v-card-title class="text-subtitle-1 text-sm-h6 font-weight-bold line-clamp-2 text-wrap mb-1" :title="movie.Title">
              {{ movie.Title }}
            </v-card-title>
            <v-card-subtitle class="d-flex align-center text-caption text-sm-body-2 text-grey-lighten-1">
              <v-icon icon="mdi-calendar-range" size="small" class="mr-1" color="primary"></v-icon>
              {{ movie.Year }}
            </v-card-subtitle>
          </v-card-item>

          <!-- Acciones de la Tarjeta -->
          <v-card-actions class="pa-3 pt-0">
            <v-btn
              color="primary"
              variant="tonal"
              block
              class="rounded-lg text-capitalize font-weight-bold"
              prepend-icon="mdi-information-outline"
            >
              Ver Detalle
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script setup>
defineProps({
  movies: {
    type: Array,
    default: () => []
  },
  totalResults: {
    type: [String, Number],
    default: 0
  }
})

defineEmits(['select-movie'])

const fallbackPoster = 'https://via.placeholder.com/300x440/1E293B/00E5FF?text=Sin+Imagen'

const isValidPoster = (posterUrl) => {
  return posterUrl && posterUrl !== 'N/A' && posterUrl.startsWith('http')
}
</script>

<style scoped>
.movie-card {
  transition: transform 0.3s cubic-bezier(0.25, 0.8, 0.25, 1), box-shadow 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.06);
}

.movie-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 12px 24px rgba(0, 229, 255, 0.15) !important;
  border-color: rgba(0, 229, 255, 0.4);
}

.poster-wrapper {
  position: relative;
  overflow: hidden;
}

.type-chip {
  position: absolute;
  top: 12px;
  right: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.4);
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>

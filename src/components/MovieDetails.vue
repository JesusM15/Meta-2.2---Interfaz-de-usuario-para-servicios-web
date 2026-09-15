<template>
  <v-dialog
    :model-value="modelValue"
    max-width="850"
    scrollable
    transition="dialog-bottom-transition"
    @update:model-value="val => $emit('update:modelValue', val)"
  >
    <v-card class="rounded-2xl overflow-hidden" color="surface">
      <!-- Carga dentro del modal -->
      <div v-if="loading" class="pa-12 text-center">
        <v-progress-circular indeterminate color="primary" size="64" width="6"></v-progress-circular>
        <div class="mt-4 text-h6 text-grey-lighten-1">Cargando detalles de la película...</div>
      </div>

      <template v-else-if="movie">
        <!-- Header con botón cerrar -->
        <v-card-title class="d-flex align-center justify-space-between pa-4 bg-surface-bright">
          <div class="d-flex align-center text-truncate">
            <v-icon icon="mdi-movie-open" color="primary" class="mr-2"></v-icon>
            <span class="text-h6 font-weight-bold text-truncate">{{ movie.Title }}</span>
          </div>
          <v-btn
            icon="mdi-close"
            variant="text"
            color="grey-lighten-1"
            @click="onClose"
          ></v-btn>
        </v-card-title>

        <v-divider></v-divider>

        <v-card-text class="pa-6">
          <v-row>
            <!-- Columna Póster -->
            <v-col cols="12" sm="5" md="4" class="text-center">
              <v-img
                :src="isValidPoster(movie.Poster) ? movie.Poster : fallbackPoster"
                alt="Póster"
                max-height="420"
                cover
                class="rounded-xl elevation-6 mb-4"
              ></v-img>

              <!-- Chips de metadatos rápidos -->
              <div class="d-flex flex-wrap justify-center ga-2">
                <v-chip size="small" color="primary" variant="tonal" prepend-icon="mdi-clock-outline">
                  {{ movie.Runtime || 'N/A' }}
                </v-chip>
                <v-chip size="small" color="secondary" variant="tonal" prepend-icon="mdi-shield-outline">
                  {{ movie.Rated || 'N/A' }}
                </v-chip>
              </div>
            </v-col>

            <!-- Columna Detalles completos -->
            <v-col cols="12" sm="7" md="8">
              <!-- Rating IMDb -->
              <div class="d-flex align-center mb-4 bg-surface-bright pa-3 rounded-xl ga-4">
                <div class="d-flex align-center">
                  <v-icon icon="mdi-star" color="amber-accent-4" size="large" class="mr-1"></v-icon>
                  <span class="text-h5 font-weight-bold text-amber-accent-4">
                    {{ movie.imdbRating || 'N/A' }}
                  </span>
                  <span class="text-caption text-grey ml-1">/10</span>
                </div>
                <v-divider vertical inset></v-divider>
                <div class="text-caption text-grey">
                  <div>Votos: <strong>{{ movie.imdbVotes || 'N/A' }}</strong></div>
                </div>
              </div>

              <!-- Géneros -->
              <div class="mb-4">
                <div class="text-caption text-uppercase font-weight-bold text-primary mb-1">Géneros</div>
                <div class="d-flex flex-wrap ga-2">
                  <v-chip
                    v-for="genre in getGenres(movie.Genre)"
                    :key="genre"
                    size="small"
                    color="primary"
                    variant="outlined"
                  >
                    {{ genre }}
                  </v-chip>
                </div>
              </div>

              <!-- Sinopsis -->
              <div class="mb-4">
                <div class="text-caption text-uppercase font-weight-bold text-primary mb-1">Sinopsis</div>
                <p class="text-body-1 text-grey-lighten-2 leading-relaxed">
                  {{ movie.Plot || 'Sin descripción disponible.' }}
                </p>
              </div>

              <v-divider class="my-3"></v-divider>

              <!-- Director, Elenco, Premios -->
              <v-list density="compact" bg-color="transparent">
                <v-list-item class="px-0">
                  <template #prepend>
                    <v-icon icon="mdi-account-tie" color="primary" class="mr-2"></v-icon>
                  </template>
                  <v-list-item-title class="font-weight-bold text-caption text-uppercase text-grey">Director</v-list-item-title>
                  <v-list-item-subtitle class="text-body-2 text-white">{{ movie.Director || 'N/A' }}</v-list-item-subtitle>
                </v-list-item>

                <v-list-item class="px-0">
                  <template #prepend>
                    <v-icon icon="mdi-account-group" color="primary" class="mr-2"></v-icon>
                  </template>
                  <v-list-item-title class="font-weight-bold text-caption text-uppercase text-grey">Elenco Principal</v-list-item-title>
                  <v-list-item-subtitle class="text-body-2 text-white">{{ movie.Actors || 'N/A' }}</v-list-item-subtitle>
                </v-list-item>

                <v-list-item v-if="movie.Awards && movie.Awards !== 'N/A'" class="px-0">
                  <template #prepend>
                    <v-icon icon="mdi-trophy-outline" color="amber-accent-4" class="mr-2"></v-icon>
                  </template>
                  <v-list-item-title class="font-weight-bold text-caption text-uppercase text-grey">Premios</v-list-item-title>
                  <v-list-item-subtitle class="text-body-2 text-white">{{ movie.Awards }}</v-list-item-subtitle>
                </v-list-item>
              </v-list>
            </v-col>
          </v-row>
        </v-card-text>

        <v-divider></v-divider>

        <!-- Botón para cerrar -->
        <v-card-actions class="pa-4 justify-end bg-surface-bright">
          <v-btn
            color="primary"
            variant="elevated"
            size="large"
            prepend-icon="mdi-close"
            class="rounded-lg text-capitalize px-6"
            @click="onClose"
          >
            Cerrar Detalle
          </v-btn>
        </v-card-actions>
      </template>
    </v-card>
  </v-dialog>
</template>

<script setup>
const props = defineProps({
  movie: {
    type: Object,
    default: null
  },
  loading: {
    type: Boolean,
    default: false
  },
  modelValue: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['close-details', 'update:modelValue'])

const fallbackPoster = 'https://via.placeholder.com/300x440/1E293B/00E5FF?text=Sin+Imagen'

const isValidPoster = (posterUrl) => {
  return posterUrl && posterUrl !== 'N/A' && posterUrl.startsWith('http')
}

const getGenres = (genreString) => {
  if (!genreString || genreString === 'N/A') return ['No especificado']
  return genreString.split(',').map(g => g.trim())
}

const onClose = () => {
  emit('update:modelValue', false)
  emit('close-details')
}
</script>

<style scoped>
.leading-relaxed {
  line-height: 1.6;
}
</style>

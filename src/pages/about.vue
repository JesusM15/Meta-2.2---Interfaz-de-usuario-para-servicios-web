<template>
  <v-container class="py-10 max-width-container">
    <v-row justify="center">
      <v-col cols="12" md="10" lg="8">
        <v-card class="pa-8 rounded-2xl elevation-8" color="surface">
          <!-- Banner Superior / Logo Animado -->
          <div class="text-center mb-6">
            <div class="logo-wrapper d-inline-flex pa-4 rounded-circle bg-surface-bright mb-4">
              <v-icon icon="mdi-clapperboard-play" size="64" color="primary"></v-icon>
            </div>
            <h1 class="text-h4 font-weight-bold text-gradient">CineSearch Pro</h1>
            <v-chip color="secondary" size="small" class="mt-2 font-weight-bold">
              Versión 1.0.0
            </v-chip>
          </div>

          <v-divider class="my-6"></v-divider>

          <!-- Descripción del Proyecto -->
          <div class="mb-8">
            <h2 class="text-h6 font-weight-bold text-primary mb-2 d-flex align-center">
              <v-icon icon="mdi-information-outline" class="mr-2"></v-icon>
              Acerca de la Aplicación
            </h2>
            <p class="text-body-1 text-grey-lighten-2 leading-relaxed">
              <strong>CineSearch Pro</strong> es una plataforma interactiva de búsqueda y exploración cinematográfica desarrollada con las últimas tecnologías del ecosistema frontend moderno. Permite realizar consultas dinámicas de películas, series de televisión y episodios, obtener sinopsis en tiempo real, filtrar por categoría y año, y consultar el desglose de producción, elenco y valoraciones de IMDb.
            </p>
          </div>

          <!-- Grid de Tecnologías Requeridas -->
          <div class="mb-8">
            <h2 class="text-h6 font-weight-bold text-primary mb-4 d-flex align-center">
              <v-icon icon="mdi-code-tags" class="mr-2"></v-icon>
              Stack Tecnológico Obligatorio
            </h2>
            <v-row dense>
              <v-col v-for="tech in techStack" :key="tech.name" cols="12" sm="6" md="4">
                <v-card class="pa-3 rounded-xl bg-surface-bright border-subtle d-flex align-center">
                  <v-avatar :color="tech.color" size="40" class="mr-3">
                    <v-icon :icon="tech.icon" color="white"></v-icon>
                  </v-avatar>
                  <div>
                    <div class="font-weight-bold text-body-2">{{ tech.name }}</div>
                    <div class="text-caption text-grey">{{ tech.role }}</div>
                  </div>
                </v-card>
              </v-col>
            </v-row>
          </div>

          <!-- Requerimientos Técnicos Implementados -->
          <div class="mb-6">
            <h2 class="text-h6 font-weight-bold text-primary mb-4 d-flex align-center">
              <v-icon icon="mdi-check-decagram" class="mr-2"></v-icon>
              Características Implementadas
            </h2>
            <v-list bg-color="transparent" density="compact">
              <v-list-item v-for="(feat, idx) in features" :key="idx" class="px-0">
                <template #prepend>
                  <v-icon icon="mdi-check-circle" color="success" class="mr-3"></v-icon>
                </template>
                <v-list-item-title class="text-body-2 text-grey-lighten-1">{{ feat }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </div>

          <v-divider class="my-6"></v-divider>

          <!-- Botón de regreso a Inicio -->
          <div class="text-center">
            <v-btn
              color="primary"
              variant="elevated"
              size="large"
              to="/"
              prepend-icon="mdi-home"
              class="rounded-xl px-8 text-capitalize font-weight-bold"
            >
              Volver al Buscador
            </v-btn>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
const techStack = [
  { name: 'Vue 3', role: 'Composition API (<script setup>)', icon: 'mdi-vuejs', color: '#42B883' },
  { name: 'Vuetify 3', role: 'Diseño & UI Components', icon: 'mdi-vuetify', color: '#1697F6' },
  { name: 'Axios / Fetch', role: 'Servicio HTTP dual', icon: 'mdi-api', color: '#8B5CF6' },
  { name: 'OMDb API', role: 'Catálogo global de películas', icon: 'mdi-database', color: '#F59E0B' },
  { name: 'Vue Router 4', role: 'Navegación entre vistas', icon: 'mdi-routes', color: '#EC4899' },
  { name: 'Vite 6', role: 'Empaquetador & Dev Server', icon: 'mdi-lightning-bolt', color: '#646CFF' }
]

const features = [
  'Emisión y recepción estricta de eventos Vue 3 (@search-movies, @clear-results, @select-movie, @close-details)',
  'Validación interactiva de formularios de búsqueda con mensajes de aviso',
  'Tarjeta de películas con cuadrícula responsiva de Vuetify (v-row / v-col)',
  'Diálogo modal de detalles de película con valoraciones, reparto y sinopsis completa',
  'Indicador de carga animado controlado por estado (LoadingSpinner.vue)',
  'Manejo de errores asíncronos y avisos con v-alert',
  'Dualidad HTTP: Soporte Axios en rama main y Fetch nativo en rama git fetch'
]
</script>

<style scoped>
.max-width-container {
  max-width: 1000px;
}

.text-gradient {
  background: linear-gradient(135deg, #00E5FF 0%, #8B5CF6 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.logo-wrapper {
  box-shadow: 0 0 20px rgba(0, 229, 255, 0.3);
}

.border-subtle {
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.leading-relaxed {
  line-height: 1.7;
}
</style>

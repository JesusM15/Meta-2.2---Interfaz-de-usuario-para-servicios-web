<template>
  <v-app theme="darkTheme">
    <!-- Barra de Navegación Global Superior -->
    <v-app-bar
      color="surface"
      elevation="4"
      density="comfortable"
      class="border-b"
    >
      <v-container class="d-flex align-center py-0 max-width-appbar">
        <!-- Logo y Marca -->
        <router-link to="/" class="d-flex align-center text-decoration-none">
          <v-avatar color="primary" size="36" class="mr-3">
            <v-icon icon="mdi-movie-roll" color="slate-900"></v-icon>
          </v-avatar>
          <span class="text-h6 font-weight-bold text-white tracking-wide">
            Cine<span class="text-primary">Search</span>
          </span>
        </router-link>

        <v-spacer></v-spacer>

        <!-- Enlaces Dinámicos de Navegación -->
        <div class="d-flex ga-2">
          <v-btn
            to="/"
            variant="text"
            exact
            class="text-capitalize font-weight-medium rounded-lg"
            active-color="primary"
            prepend-icon="mdi-home-variant"
          >
            Inicio
          </v-btn>

          <v-btn
            to="/about"
            variant="text"
            class="text-capitalize font-weight-medium rounded-lg"
            active-color="primary"
            prepend-icon="mdi-information-outline"
          >
            Acerca de
          </v-btn>

          <v-btn
            icon="mdi-theme-light-dark"
            variant="text"
            color="grey-lighten-1"
            title="Cambiar Tema"
            @click="toggleTheme"
          ></v-btn>
        </div>
      </v-container>
    </v-app-bar>

    <!-- Vista de Enrutador Principal -->
    <v-main class="bg-background min-vh-100">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </v-main>

    <!-- Footer Global -->
    <v-footer color="surface" class="py-4 border-t text-center text-caption text-grey">
      <v-container class="d-flex flex-column align-center justify-center ga-1">
        <div>
          © {{ currentYear }} <strong>CineSearch</strong> - Desarrollado con Vue 3, Vuetify 3 y OMDb API.
        </div>
      </v-container>
    </v-footer>
  </v-app>
</template>

<script setup>
import { computed } from 'vue'
import { useTheme } from 'vuetify'

const theme = useTheme()
const currentYear = computed(() => new Date().getFullYear())

const toggleTheme = () => {
  theme.global.name.value = theme.global.current.value.dark ? 'light' : 'darkTheme'
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&display=swap');

html, body {
  font-family: 'Outfit', 'Roboto', sans-serif !important;
}

.max-width-appbar {
  max-width: 1200px;
}

.min-vh-100 {
  min-height: calc(100vh - 120px);
}

.border-b {
  border-bottom: 1px solid rgba(255, 255, 255, 0.08) !important;
}

.border-t {
  border-top: 1px solid rgba(255, 255, 255, 0.08) !important;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>

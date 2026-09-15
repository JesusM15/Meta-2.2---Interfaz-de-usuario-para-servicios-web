import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const darkTheme = {
  dark: true,
  colors: {
    background: '#0F172A',
    surface: '#1E293B',
    'surface-bright': '#334155',
    'surface-variant': '#1E293B',
    primary: '#00E5FF',
    'primary-darken-1': '#00B8D4',
    secondary: '#8B5CF6',
    'secondary-darken-1': '#7C3AED',
    error: '#FF5252',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FB8C00',
  }
}

export default createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'darkTheme',
    themes: {
      darkTheme
    }
  }
})

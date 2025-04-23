import './styles/main.scss'
import 'primeicons/primeicons.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import PrimeVue from 'primevue/config'
import Lara from '@primevue/themes/lara'
import { definePreset } from '@primevue/themes'

import VeeValidatePlugin from './plugins/validation'
import ToastService from 'primevue/toastservice'

const app = createApp(App)

const customPreset = definePreset(Lara, {
  semantic: {
    primary: {
      50: '#f5e6f7', // Lightest tint
      100: '#e6cce9',
      200: '#ce99d2',
      300: '#b366ba',
      400: '#944099',
      500: '#611f69', // Base color
      600: '#551b5d',
      700: '#47174e',
      800: '#39123e',
      900: '#2b0d2f',
      950: '#1c081f' // Darkest shade
    },
    secondary: {
      50: '{indigo.50}', // Lightest tint
      100: '{indigo.100}',
      200: '{indigo.200}',
      300: '{indigo.300}',
      400: '{indigo.400}',
      500: '{indigo.500}', // Base color
      600: '{indigo.600}',
      700: '{indigo.700}',
      800: '{indigo.800}',
      900: '{indigo.900}',
      950: '{indigo.950}' // Darkest shade
    },
    colorScheme: {
      light: {
        surface: {
          0: '#ffffff',
          50: '{zinc.50}',
          100: '{zinc.100}',
          200: '{zinc.200}',
          300: '{zinc.300}',
          400: '{zinc.400}',
          500: '{zinc.500}',
          600: '{zinc.600}',
          700: '{zinc.700}',
          800: '{zinc.800}',
          900: '{zinc.900}',
          950: '{zinc.950}'
        }
      },
      dark: {
        surface: {
          0: '#ffffff',
          50: '{slate.50}',
          100: '{slate.100}',
          200: '{slate.200}',
          300: '{slate.300}',
          400: '{slate.400}',
          500: '{slate.500}',
          600: '{slate.600}',
          700: '{slate.700}',
          800: '{slate.800}',
          900: '{slate.900}',
          950: '{slate.950}'
        }
      }
    }
  }
})

app.use(createPinia())
app.use(router)
app.use(PrimeVue, {
  theme: {
    unstyled: true,
    preset: customPreset,
    options: {
      prefix: 'p',
      darkModeSelector: 'system',
      cssLayer: false
    }
  }
})
app.use(VeeValidatePlugin)
app.use(ToastService)

app.mount('#app')

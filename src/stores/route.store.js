// stores/useRouteStore.js
import { defineStore } from 'pinia'

export const useRouteStore = defineStore('route', {
  state: () => ({
    previousRoute: null
  })
})

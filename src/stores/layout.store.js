import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { getLocalStorage, setLocalStorage } from '@/utils/storageManager'

export const useLayoutStore = defineStore('layoutStore', () => {
  // State
  const layout = ref(getLocalStorage('acp.is_login') || false ? 'app' : 'auth')
  const isSidebarAnchored = ref(false)
  const isShowSearch = ref(false)

  // Getters
  const getLayout = computed(() => layout.value)

  // Actions
  function setLayout(payload) {
    layout.value = payload
  }

  function toggleAnchoredSideBar() {
    isSidebarAnchored.value = !isSidebarAnchored.value
    setLocalStorage('acp.isSidebarAnchored', isSidebarAnchored.value)
  }

  return {
    layout,
    isShowSearch,
    isSidebarAnchored,
    getLayout,
    setLayout,
    toggleAnchoredSideBar
  }
})

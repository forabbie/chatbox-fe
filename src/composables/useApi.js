// composables/useApi.js
import { ref, onUnmounted } from 'vue'

export function useApi() {
  const data = ref(null)
  const loading = ref(false)
  const error = ref(null)
  let controller = null

  async function fetchData(url, options = {}) {
    // Cancel any ongoing request
    if (controller) controller.abort()

    controller = new AbortController()
    loading.value = true
    error.value = null

    try {
      const response = await fetch(url, {
        ...options,
        signal: controller.signal
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      data.value = await response.json()
    } catch (err) {
      if (err.name !== 'AbortError') {
        error.value = err
      }
    } finally {
      loading.value = false
    }
  }

  function cancelRequest() {
    if (controller) {
      controller.abort()
    }
  }

  // Automatically cancel when component using this composable is destroyed
  onUnmounted(() => {
    cancelRequest()
  })

  return {
    data,
    loading,
    error,
    fetchData,
    cancelRequest
  }
}

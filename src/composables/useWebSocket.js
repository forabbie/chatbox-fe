import { ref } from 'vue'
// import { getCookie } from '@/utils/storageManager'
// import { useAuthStore } from '@/stores/authStore'

export const useWebSocket = () => {
  // const authStore = useAuthStore()

  const socket = ref(null)
  const retryCount = ref(0)
  const wsUrl = ref(null)

  const MAX_RETRIES = 3
  const INITIAL_RETRY_DELAY = 2000

  // const getFreshToken = async () => {
  //   try {
  //     await authStore.checkTokenExpiration()
  //     const token = getCookie('acp.rfc7519')
  //     if (!token) throw new Error('Token not found')
  //     return token
  //   } catch (error) {
  //     console.error('Error fetching token:', error)
  //     throw new Error('Token fetch failed')
  //   }
  // }

  const createWebSocketUrl = async (baseWsUrl, params = {}) => {
    // const token = await getFreshToken()

    // Construct query params dynamically
    const queryParams = new URLSearchParams({
      v: '1.0',
      token: token,
      ...params // Spread additional params
    })

    return `${baseWsUrl}?${queryParams.toString()}`
  }

  const initWebSocket = async ({ baseWsUrl, params = {}, onMessageCallback } = {}) => {
    if (!window.WebSocket) {
      console.warn('WebSocket is not supported by your browser.')
      return
    }

    if (socket.value && socket.value.readyState === WebSocket.OPEN) {
      console.warn('WebSocket is already connected.')
      return
    }

    try {
      wsUrl.value = await createWebSocketUrl(baseWsUrl, params)
      socket.value = new WebSocket(wsUrl.value)

      socket.value.onopen = () => {
        retryCount.value = 0
        console.info('WebSocket connection opened.')
      }

      socket.value.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data)
          if (typeof onMessageCallback === 'function') {
            onMessageCallback(data)
          }
        } catch (error) {
          console.error('Error parsing WebSocket message:', error)
        }
      }

      socket.value.onclose = () => {
        console.warn('WebSocket connection closed. Attempting to reconnect...')
        handleReconnect(onMessageCallback)
      }

      socket.value.onerror = (error) => {
        console.error('WebSocket encountered an error:', error)
        socket.value?.close()
      }
    } catch (error) {
      console.error('Failed to initialize WebSocket:', error)
      handleReconnect(onMessageCallback)
    }
  }

  const handleReconnect = (onMessageCallback) => {
    if (retryCount.value >= MAX_RETRIES) {
      console.warn('Max retry attempts reached. Stopping reconnection attempts.')
      return
    }

    const delay = INITIAL_RETRY_DELAY * 2 ** retryCount.value
    retryCount.value++

    setTimeout(() => {
      if (wsUrl.value) {
        initWebSocket({ baseWsUrl: wsUrl.value.split('?')[0], onMessageCallback })
      }
    }, delay)
  }

  const sendMessage = (message) => {
    if (socket.value && socket.value.readyState === WebSocket.OPEN) {
      socket.value.send(JSON.stringify(message))
    } else {
      console.warn('WebSocket is not open. Message not sent:', message)
    }
  }

  const closeWebSocket = () => {
    if (socket.value) {
      socket.value.close()
      console.info('WebSocket connection manually closed.')
    }
  }

  return {
    socket,
    initWebSocket,
    sendMessage,
    closeWebSocket
  }
}

/* 
initWebSocket({
  baseWsUrl: import.meta.env.VITE_WS_URL + '/ticket',  // base WebSocket URL
  params: {
    user_id: 123, // Example: Pass the user_id as a query parameter
    language: 'en', // Example: Pass the language parameter
  },
  onMessageCallback: (data) => {
    console.log('WebSocket Message:', data)
  }
})
*/

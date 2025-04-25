import axios from 'axios'
import { useAuthStore } from '@/stores/auth.store'
import { clearAllStorage } from '@/utils/storage'
import { getCookie } from '@/utils/cookies'
import { getRefreshTokenExpiration } from '@/utils/token'
import router from '@/router'

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_API_BASE_URL,
  headers: {
    'Cache-Control': 'no-store',
    common: {
      'Time-Zone': Intl.DateTimeFormat().resolvedOptions().timeZone
    }
  }
})

let isRefreshing = false
let failedQueue = []

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error)
    } else {
      prom.resolve(token)
    }
  })
  failedQueue = []
}

axiosInstance.interceptors.request.use(
  (config) => {
    const authStore = useAuthStore()
    const token = authStore.accessToken || getCookie('cb.rfc7519')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const authStore = useAuthStore()
    const originalRequest = error.config

    const is401 = error.response && error.response.status === 401
    const hasRetried = originalRequest._retry
    const isLoggedIn = authStore.isAuthenticated
    const hasAccessToken = !!authStore.accessToken
    const refreshTokenValid = getRefreshTokenExpiration(authStore.refreshToken) > 0

    // Handle if server is down or no response was received
    if (!error.response) {
      console.error('Network or Server Error:', error.message)
      // Optional: Custom global error handler
      alert('Server is currently unreachable. Please try again later.')
      return Promise.reject(error)
    }

    // Handle 401 Unauthorized errors only
    if (is401 && !hasRetried) {
      // Mark the request as already retried
      originalRequest._retry = true

      // If refresh token is invalid or missing while user is logged in
      if (isLoggedIn && !refreshTokenValid) {
        authStore.toggleSessionExpired(true)
        authStore.toggleAuthentication(false)
        return Promise.reject(error)
      }

      // If user is logged out or missing access token, go to login
      if (!hasAccessToken || !isLoggedIn) {
        router.push('/auth/login')
        return Promise.reject(error)
      }

      // If a token refresh is already happening, queue the request
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject })
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`
            return axiosInstance(originalRequest)
          })
          .catch((err) => Promise.reject(err))
      }

      // Start refresh process
      isRefreshing = true

      try {
        const newToken = await authStore.refreshAccessToken()
        originalRequest.headers.Authorization = `Bearer ${newToken}`
        processQueue(null, newToken)
        return axiosInstance(originalRequest)
      } catch (refreshError) {
        processQueue(refreshError, null)

        // Only log out if session hasn't already been marked as expired
        if (!authStore.isSessionExpired) {
          authStore.logoutUser()
          clearAllStorage()
          router.push('/auth/login')
        }

        return Promise.reject(refreshError)
      } finally {
        isRefreshing = false
      }
    }
    return Promise.reject(error)
  }
)

export default axiosInstance

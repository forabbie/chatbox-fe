import { defineStore } from 'pinia'
import { ref } from 'vue'
import { setLocalStorage, getLocalStorage } from '@/utils/storage'
import { logoutService } from '@/services/auth.service.js'
import { getCookie, setCookie } from '@/utils/cookies'
import { clearAllStorage } from '@/utils/storage'

export const useAuthStore = defineStore('auth', () => {
  const isSessionExpired = ref(false)
  const isAuthenticated = ref(false)
  const accessToken = ref(null)
  const refreshToken = ref(null)

  const initAuthState = () => {
    isAuthenticated.value = getLocalStorage('isAuthenticated') || false
    accessToken.value = getCookie('cb.rfc7519') || null
    refreshToken.value = getCookie('cb.refresh_token') || null
  }

  const setTokens = ({ access_token, refresh_token }) => {
    accessToken.value = access_token
    refreshToken.value = refresh_token
    setCookie('cb.rfc7519', access_token, 50)
    setCookie('cb.refresh_token', refresh_token, 50)
  }

  const toggleAuthentication = (value) => {
    isAuthenticated.value = value
    setLocalStorage('isAuthenticated', value)
  }

  const toggleSessionExpired = (value) => {
    isSessionExpired.value = value
  }

  const clearAuthState = () => {
    isAuthenticated.value = false
    accessToken.value = null
    refreshToken.value = null
    setCookie('cb.rfc7519', '', -1)
    setCookie('cb.refresh_token', '', -1)
    setLocalStorage('isAuthenticated', false)
  }

  const logoutUser = async () => {
    await logoutService()
    clearAuthState()
    toggleSessionExpired(false)
    clearAllStorage()
  }

  initAuthState()

  return {
    isAuthenticated,
    isSessionExpired,
    accessToken,
    refreshToken,
    setTokens,
    toggleSessionExpired,
    toggleAuthentication,
    logoutUser
  }
})

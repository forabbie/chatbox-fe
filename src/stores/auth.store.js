import { defineStore } from 'pinia'
import { ref } from 'vue'
import { setLocalStorage, getLocalStorage, deleteLocalStorage } from '@/utils/storage'
import { logoutService } from '@/services/auth.service.js'
import { getCookie, setCookie, eraseCookie, clearAllCookies } from '@/utils/cookies'
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
    setCookie('cb.rfc7519', access_token, 60)
    setCookie('cb.refresh_token', refresh_token, 30)
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
    eraseCookie('cb.rfc7519')
    eraseCookie('cb.refresh_token')
    deleteLocalStorage('isAuthenticated')
  }

  const logoutUser = async () => {
    toggleSessionExpired(false)
    toggleAuthentication(false)
    clearAuthState()
    clearAllCookies()
    clearAllStorage()
    await logoutService()
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

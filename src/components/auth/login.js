import { loginService } from '@/services/auth.service'
import { useAuthStore } from '@/stores/auth.store'

const authStore = useAuthStore()

const LoginFunctions = () => {
  const performLogin = async (credentials) => {
    try {
      const data = await loginService(credentials)
      authStore.setTokens(data.response)
      authStore.toggleAuthentication(true)
    } catch (err) {
      console.error(err)
      throw new Error('Login failed')
    }
  }

  return {
    performLogin
  }
}

export default LoginFunctions

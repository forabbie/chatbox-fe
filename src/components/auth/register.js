import { registerService } from '@/services/auth.service'
import { useAuthStore } from '@/stores/auth.store'

const authStore = useAuthStore()

const RegisterFunctions = () => {
  const register = async (credentials) => {
    try {
      const data = await registerService(credentials)
      authStore.setTokens(data.response)
      authStore.toggleAuthentication(true)
    } catch (err) {
      console.error(err)
    }
  }

  return {
    register
  }
}

export default RegisterFunctions

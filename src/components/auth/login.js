import { loginService } from '@/services/auth.service'
import { useAuthStore } from '@/stores/auth.store'
// import { useTokenStore } from '@/stores/token.store'

const authStore = useAuthStore()
// const tokenStore = useTokenStore()

const LoginFunctions = () => {
  const performLogin = async (credentials) => {
    try {
      const data = await loginService(credentials)
      console.log(data.response)

      authStore.setTokens(data.response)
      authStore.toggleAuthentication(true)
    } catch (err) {
      console.error(err)
      // throw new Error('Login failed')
    }
    // await authStore.loginUser(credentials)
  }

  return {
    performLogin
  }
}

export default LoginFunctions

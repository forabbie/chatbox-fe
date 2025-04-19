import axiosInstance from '@/services/instance.service'
import refreshInstance from '@/services/refresh-instance.service.js'
import { encryptMessage } from '@/utils/hash'

// Function to handle user login
export const loginService = async (credentials) => {
  try {
    const encryptedPassword = encryptMessage(credentials.password)

    const formData = new URLSearchParams()
    formData.append('emailaddress', credentials.emailaddress)
    formData.append('password', encryptedPassword)

    axiosInstance.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded'
    const response = await axiosInstance.post('/auth/login', formData)
    return response.data
  } catch (error) {
    console.error('Login error:', error)
    throw error
  }
}

// Function to refresh access token using refresh token
export const getNewTokenService = async (token) => {
  try {
    const response = await refreshInstance.post('/auth/refresh', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return response.data
  } catch (error) {
    console.error('Token refresh error:', error)
    throw error
  }
}

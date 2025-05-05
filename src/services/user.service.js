import axiosInstance from '@/services/instance.service'

export const listUsersService = async () => {
  try {
    axiosInstance.defaults.headers['Content-Type'] = 'application/json'
    const response = await axiosInstance.get('/users')
    return response.data
  } catch (error) {
    throw error
  }
}

export const getUserService = async (userId) => {
  try {
    axiosInstance.defaults.headers['Content-Type'] = 'application/json'
    const response = await axiosInstance.get(`/user/${userId}`)
    return response.data
  } catch (error) {
    throw error
  }
}

import axiosInstance from '@/services/instance.service'

export const listMessageService = async (query) => {
  try {
    const response = await axiosInstance.get(`/message`, { params: query })
    return response.data
  } catch (error) {
    throw error
  }
}

export const postMessageService = async (requestDetails) => {
  try {
    axiosInstance.defaults.headers['Content-Type'] = 'application/json'
    const response = await axiosInstance.post(`/message`, requestDetails)
    return response.data
  } catch (error) {
    throw error
  }
}

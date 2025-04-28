import axiosInstance from '@/services/instance.service'

export const listMessageService = async (query) => {
  try {
    const response = await axiosInstance.get(`/message`, { params: query })
    return response.data
  } catch (error) {
    throw error
  }
}

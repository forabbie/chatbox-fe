import axiosInstance from '@/services/instance.service'

export const listDirectMessageService = async () => {
  try {
    const response = await axiosInstance.get(`/direct-messages`)
    return response.data
  } catch (error) {
    throw error
  }
}

import axiosInstance from '@/services/instance.service'

export const createChannelService = async (channelDetails) => {
  try {
    axiosInstance.defaults.headers['Content-Type'] = 'application/json'
    const response = await axiosInstance.post('/channel', channelDetails)
    return response.data
  } catch (error) {
    throw error
  }
}

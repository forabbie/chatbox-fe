import axiosInstance from '@/services/instance.service'

export const listChannelService = async () => {
  try {
    axiosInstance.defaults.headers['Content-Type'] = 'application/json'
    const response = await axiosInstance.get('/channels')
    return response.data
  } catch (error) {
    throw error
  }
}

export const postChannelService = async (channelData) => {
  try {
    axiosInstance.defaults.headers['Content-Type'] = 'application/json'
    const response = await axiosInstance.post('/channel', channelData)
    return response.data
  } catch (error) {
    throw error
  }
}

export const getChannelService = async (channelId) => {
  try {
    axiosInstance.defaults.headers['Content-Type'] = 'application/json'
    const response = await axiosInstance.get(`/channel/${channelId}`)
    return response.data
  } catch (error) {
    throw error
  }
}

// export const leaveChannelService = async (channelId) => {
//   try {
//     axiosInstance.defaults.headers['Content-Type'] = 'application/json'
//     const response = await axiosInstance.post(`/channel/leave`, channelId)
//     return response.data
//   } catch (error) {
//     throw error
//   }
// }

export const postChannelMemberService = async (requestDetails) => {
  try {
    axiosInstance.defaults.headers['Content-Type'] = 'application/json'
    const response = await axiosInstance.post(`/channel/add_member`, requestDetails)
    return response.data
  } catch (error) {
    throw error
  }
}

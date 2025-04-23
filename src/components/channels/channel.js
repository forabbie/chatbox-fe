import { postChannelService } from '@/services/channel.service'
// import { useAuthStore } from '@/stores/channel.store'

// const authStore = useAuthStore()

const ChannelFunctions = () => {
  const postChannel = async (channelData) => {
    try {
      const data = await postChannelService(channelData)
      return data.response
    } catch (err) {
      throw err
    }
  }

  return {
    postChannel
  }
}

export default ChannelFunctions

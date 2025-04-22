import { createChannelService } from '@/services/channel.service'
// import { useAuthStore } from '@/stores/channel.store'

// const authStore = useAuthStore()

const ChannelFunctions = () => {
  const postChannel = async (channelDetails) => {
    try {
      const data = await createChannelService(channelDetails)
      console.log(data)
    } catch (err) {
      console.error(err)
      throw new Error('Login failed')
    }
  }

  return {
    postChannel
  }
}

export default ChannelFunctions

import { defineStore } from 'pinia'
import { ref } from 'vue'
import { listChannelService } from '@/services/channel.service'

export const useChannelsStore = defineStore('channels', () => {
  const channels = ref([])
  const activeChannel = ref(null)

  const setActiveChannel = (channel) => {
    activeChannel.value = channel
  }

  const setChannels = async () => {
    const data = await listChannelService()
    channels.value = data.response
  }

  return {
    channels,
    activeChannel,
    setActiveChannel,
    setChannels
  }
})

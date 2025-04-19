import { defineStore } from 'pinia'
import { ref } from 'vue'
import { fetchChannels } from '@/services/channels.service'

export const useChannelsStore = defineStore('channels', () => {
  const channels = ref([])
  const activeChannel = ref(null)

  const loadChannels = async () => {
    channels.value = await fetchChannels()
  }

  const setActiveChannel = (channelId) => {
    activeChannel.value = channels.value.find((channel) => channel.id === channelId)
  }

  return {
    channels,
    activeChannel,
    loadChannels,
    setActiveChannel
  }
})

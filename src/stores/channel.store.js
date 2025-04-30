import { defineStore } from 'pinia'
import { ref } from 'vue'
import { listChannelService, getChannelService } from '@/services/channel.service'

export const useChannelStore = defineStore('channels', () => {
  const channels = ref([])
  const channel = ref({})
  const members = ref({})

  const setChannels = async () => {
    const data = await listChannelService()
    channels.value = data.response
  }

  const setChannelDetails = async (channelId) => {
    const data = await getChannelService(channelId)
    channel.value = data.response
  }

  const setChannelMembers = async (list) => {
    members.value = list
  }

  return {
    channels,
    setChannels,
    channel,
    setChannelDetails,
    members,
    setChannelMembers
  }
})

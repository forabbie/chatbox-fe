import { defineStore } from 'pinia'
import { ref } from 'vue'
import { fetchChannels } from '@/services/channels.service'

export const useChannelsStore = defineStore('channels', () => {
  const channels = [
    { id: 1, name: 'Lorem Ipsum', avatar: 'https://via.placeholder.com/150', unread: true },
    { id: 2, name: 'Dolor Sit Amet', avatar: 'https://via.placeholder.com/150', unread: false },
    {
      id: 3,
      name: 'Consectetur Adipiscing',
      avatar: 'https://via.placeholder.com/150',
      unread: true
    },
    { id: 4, name: 'Elit Sed Do', avatar: 'https://via.placeholder.com/150', unread: false },
    { id: 5, name: 'Eiusmod Tempor', avatar: 'https://via.placeholder.com/150', unread: true }
  ]

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

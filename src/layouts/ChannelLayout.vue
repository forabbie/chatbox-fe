<template>
  <router-view />
</template>

<script setup>
import { onMounted, onUnmounted, computed } from 'vue'
import { useChannelStore } from '@/stores/channel.store'
import { useMessageStore } from '@/stores/message.store'

import { useRouter, useRoute } from 'vue-router'

import { useToast } from 'primevue/usetoast'
import { useWebSocket } from '@/composables/useWebSocket'

const toast = useToast()
const route = useRoute()
const router = useRouter()
const channelStore = useChannelStore()
const messageStore = useMessageStore()

onMounted(async () => {
  try {
    if (!channelStore.channels?.length) {
      await channelStore.setChannels()
    }
    const channelId = route.params.id

    await validateAndRedirect(channelId)

    if (channelId) {
      await loadChannelDetails(channelId)
      setWebSocket()
    }
  } catch (error) {
    console.error('Error initializing channels:', error)
    router.replace({ name: 'no-channels' })
  }
})

const validateAndRedirect = async (channelId) => {
  channelId = String(channelId || '')

  const channels = channelStore.channels || []
  const validIds = channels.map((c) => String(c.id))

  if (!channelId || !validIds.includes(channelId)) {
    const firstChannel = channels[0]
    router.replace(
      firstChannel ? { name: 'channel', params: { id: firstChannel.id } } : { name: 'no-channels' }
    )
  }
}

const loadChannelDetails = async (channelId) => {
  const channels = channelStore.channels || []
  const channel = channels.find((c) => String(c.id) === String(channelId))
  const messagesquery = {
    receiver_id: channelId,
    receiver_class: 'channel',
    sort: 'sent_at,asc',
    page: 1,
    limit: 50
  }
  if (!channel) {
    console.error('Channel not found:', channelId)
    return
  }

  try {
    await Promise.all([
      channelStore.setChannelDetails(channelId),
      messageStore.setMessages(messagesquery)
    ])
  } catch (error) {
    console.error('Error loading channel details:', error)
  }
}

const { initWebSocket, closeWebSocket } = useWebSocket()

onUnmounted(() => {
  closeWebSocket()
})

const channel = computed(() => {
  return channelStore.channel
})

const setWebSocket = () => {
  initWebSocket({
    baseWsUrl: import.meta.env.VITE_WBS_BASE_URL + `/chat/${channel.value.id}`,
    onErrorCallback: (error) => {
      console.error('WebSocket Error:', error)
      toast.add({
        severity: 'error',
        summary: 'Error',
        detail: 'WebSocket connection error.',
        life: 3000
      })
    },
    onMessageCallback: (data) => {
      if (data.id == channel.value.id) {
        loadMessages()
      }
    }
  })
}
const loadMessages = async () => {
  const messagesquery = {
    receiver_id: channel.value.id,
    receiver_class: 'channel',
    sort: 'sent_at,asc',
    page: 1,
    limit: 50
  }

  try {
    await messageStore.setMessages(messagesquery)
  } catch (error) {
    console.error('Error loading messages:', error)
  }
}
</script>

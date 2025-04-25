<template>
  <router-view />
</template>

<script setup>
import { onMounted } from 'vue'
import { useChannelsStore } from '@/stores/channel.store'

import { useRouter, useRoute } from 'vue-router'

const route = useRoute()
const router = useRouter()
const store = useChannelsStore()

onMounted(async () => {
  if (store.channels && !store.channels.length) {
    try {
      await store.setChannels()
      // console.log('ChannelLayout mounted', store.channels)
    } catch (error) {
      console.error('Error loading channels:', error)
    }
  }
  validateAndRedirect()
})

const validateAndRedirect = () => {
  const channelId = route.params.id
  const channels = store.channels || [] // fallback early

  const validIds = channels.map((c) => String(c.id))

  if (!channelId || !validIds.includes(channelId)) {
    const firstChannel = channels[0]
    if (firstChannel) {
      router.replace({ name: 'channel', params: { id: firstChannel.id } })
    } else {
      router.replace({ name: 'no-channels' })
    }
  }
}
</script>

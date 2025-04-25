<template>
  <div class="flex h-full flex-col items-center justify-center">
    <!-- <img src="@/assets/no-channels.png" alt="No Channels" class="mb-4" /> -->
    <h2 class="text-2xl font-bold text-gray-700">No channels available</h2>
    <p class="mb-4 text-gray-500">Create a new channel to get started.</p>
    <Button
      label="Create Channel"
      icon="pi pi-pen-to-square"
      aria-label="Create Channel"
      @click="openNew"
      pt:root="btn"
    />
    <ChannelForm ref="channelFormRef" />
  </div>
</template>

<script setup>
import Button from 'primevue/button'

import ChannelForm from '@/components/channels/ChannelForm.vue'

import { ref } from 'vue'

const channelFormRef = ref(null)

const openNew = async () => {
  if (channelFormRef.value) {
    channelFormRef.value.triggerClick()
  }
}
</script>

<template>
  <div class="">
    <div class="flex items-center justify-between px-8 py-4">
      <h2 class="text-start text-xl font-bold">Channels</h2>
      <Button
        icon="pi pi-pen-to-square"
        aria-label="Create Channel"
        @click="openNew"
        pt:root="btn"
      />
    </div>
    <ul v-if="channels.length" class="p-4">
      <li
        v-for="channel in channels"
        :key="channel.id"
        @click="setActiveChannel(channel)"
        :class="[
          'flex cursor-pointer items-center justify-between rounded-lg px-4 py-2',
          activeChannel === channel.id
            ? 'bg-fuchsia-50/60 text-slate-800'
            : 'text-white/80 hover:bg-fuchsia-50/10'
        ]"
      >
        <div class="flex w-full items-center justify-between gap-2">
          <div class="flex items-center">
            <div class="relative mr-2">
              <i :class="['pi pi-hashtag']"></i>
            </div>
            <span :class="['text-sm']">{{ channel.name }}</span>
          </div>
        </div>
      </li>
    </ul>
    <div v-else class="flex h-40 w-full items-center justify-center">
      <span class="text-sm">No channel found.</span>
    </div>
  </div>
</template>

<script setup>
import Button from 'primevue/button'

import { computed, onMounted } from 'vue'

import { useChannelsStore } from '@/stores/channel.store'

const channelStore = useChannelsStore()

onMounted(() => {
  loadChannels()
})

const loadChannels = async () => {
  try {
    await channelStore.setChannels()
    setActiveChannel(channels.value.length ? channels.value[0] : null)
  } catch (error) {
    console.error(error)
  }
}

const channels = computed(() => {
  return channelStore.channels
})

const activeChannel = computed(() => {
  return channelStore.activeChannel
})

const setActiveChannel = (channel) => {
  channelStore.setActiveChannel(channel.id)
}

const emit = defineEmits(['open-dialog'])
const openNew = () => {
  emit('open-dialog')
}
</script>

<style scoped>
.btn.p-button {
  width: auto;
  height: auto;
  padding: 0;
  background-color: transparent;
  border: 1px solid transparent;
  color: rgba(255, 255, 255, 0.8);
}
.btn.p-button:hover {
  @apply text-white;
  padding: 0;
  background-color: transparent;
  border: 1px solid transparent;
}
</style>

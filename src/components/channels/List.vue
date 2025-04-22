<template>
  <div class="">
    <div class="flex items-center justify-between px-8 py-4">
      <h2 class="text-start text-xl font-bold">Channel</h2>
      <Button
        icon="pi pi-pen-to-square"
        aria-label="Create Channel"
        @click="createChannel"
        pt:root="btn"
      />
    </div>
    <ul class="p-4">
      <li
        v-for="channel in channels"
        :key="channel.id"
        @click="selectChannel(channel)"
        :class="[
          'flex cursor-pointer items-center justify-between rounded-lg border-b border-fuchsia-950 px-4 py-2',
          selectedChannelId === channel.id
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
  </div>
</template>

<script setup>
import Button from 'primevue/button'

import { ref } from 'vue'

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

const selectedChannelId = ref(channels.length ? channels[0].id : null)

function selectChannel(channel) {
  selectedChannelId.value = channel.id
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

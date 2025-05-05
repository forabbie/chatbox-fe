<template>
  <div class="flex h-full flex-col items-center justify-center">
    <!-- <img src="@/assets/no-channels.png" alt="No Channels" class="mb-4" /> -->
    <h2 class="text-2xl font-bold text-gray-700">No message available</h2>
    <p class="mb-4 text-gray-500">Create a new message to get started.</p>
    <Button
      label="New Message"
      icon="pi pi-pen-to-square"
      aria-label="Create Channel"
      @click="openNew"
      pt:root="btn"
    />
  </div>
</template>

<script setup>
import Button from 'primevue/button'

import { useRouter } from 'vue-router'

const router = useRouter()

const openNew = async () => {
  router.replace({ name: 'new-dm' })
}
</script>

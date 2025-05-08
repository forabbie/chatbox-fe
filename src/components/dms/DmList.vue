<template>
  <div class="flex h-full flex-col">
    <div class="sticky top-0 z-10 flex items-center justify-between px-8 py-4">
      <h2 class="text-start text-xl font-bold">Direct Messages</h2>
      <Button
        icon="pi pi-pen-to-square"
        aria-label="Create Channel"
        @click="toggleNew"
        pt:root="btn"
      />
    </div>
    <ul v-if="enrichedDms">
      <li>
        <router-link
          v-for="dm in enrichedDms"
          :key="dm.id"
          :to="{ name: 'dm', params: { id: dm.id } }"
          class="flex cursor-pointer items-center justify-between border-b border-fuchsia-950 px-8 py-4 hover:bg-fuchsia-900/60"
          active-class="bg-fuchsia-900/60"
        >
          <div class="flex w-full items-start justify-between gap-2">
            <div class="flex">
              <div class="relative mr-2">
                <Avatar
                  :label="getInitial(dm.username)"
                  icon="pi pi-user"
                  class="size-10"
                  style="background-color: #f9fce9; color: #1e293b"
                />
              </div>
              <div class="flex w-full flex-col overflow-hidden">
                <span
                  class="line-clamp-1 break-all text-sm font-bold text-white"
                  :title="dm.receiver_name"
                >
                  {{ dm.username }}
                </span>
                <span class="line-clamp-2 break-words text-xs text-gray-400" :title="dm.message">
                  {{ dm.message }}
                </span>
              </div>
            </div>
            <div class="ml-auto flex items-center whitespace-nowrap">
              <span class="text-xs text-gray-400">{{ formatDateTime(dm.sent_at) }}</span>
            </div>
          </div>
        </router-link>
      </li>
    </ul>
    <div v-else class="flex h-full items-center justify-center">
      <p class="text-gray-500">No messages available</p>
    </div>
  </div>
</template>

<script setup>
import Button from 'primevue/button'
import Avatar from 'primevue/avatar'

import { computed } from 'vue'
import { useDmStore } from '@/stores/dm.store'
import { useUserStore } from '@/stores/user.store'

import { formatDateTime } from '@/utils/date'
import { getInitial } from '@/utils/helper'
import { parseUserIdFromToken } from '@/utils/token'

const dmStore = useDmStore()
const userStore = useUserStore()

const dms = computed(() => {
  return dmStore.dms
})

const users = computed(() => {
  return userStore.users
})

const userMap = computed(() => Object.fromEntries(users.value.map((user) => [user.id, user])))

// Enrich the DMs with receiver details
const enrichedDms = computed(() => {
  if (!dms.value || !users.value) {
    return null
  }
  const userId = parseUserIdFromToken()
  return dms.value.map((dm) => {
    let receiverId = dm?.receiver_id
    if (userId === dm.receiver_id) {
      receiverId = dm.sender_id
    }
    const receiver = userMap.value[receiverId]
    return {
      ...dm,
      username: receiver?.username,
      receiver_email: receiver?.emailaddress || 'Unknown',
      receiver_name:
        receiver?.firstname && receiver?.lastname
          ? `${receiver.firstname} ${receiver.lastname}`
          : receiver?.emailaddress || 'No name'
    }
  })
})

const emit = defineEmits(['toggle-new-message'])
const toggleNew = () => {
  emit('toggle-new-message', true)
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

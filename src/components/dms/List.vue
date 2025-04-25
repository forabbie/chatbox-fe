<template>
  <div class="">
    <div class="flex items-center justify-between px-8 py-4">
      <h2 class="text-start text-xl font-bold">Direct Messages</h2>
      <Button
        icon="pi pi-pen-to-square"
        aria-label="Create Channel"
        @click="createChannel"
        pt:root="btn"
      />
    </div>
    <ul>
      <li
        v-for="channel in channels"
        :key="channel.id"
        @click="selectChannel(channel)"
        :class="[
          'flex cursor-pointer items-center justify-between border-b border-fuchsia-950 px-8 py-4 hover:bg-fuchsia-900/60',
          selectedChannelId === channel.id ? 'bg-fuchsia-900/60' : ''
        ]"
      >
        <div class="flex w-full items-center justify-between gap-2">
          <div class="flex">
            <div class="relative mr-2">
              <Avatar
                :label="channel.name.charAt(0)"
                :image="channel.avatar"
                class="size-10"
                style="background-color: #dee9fc; color: #1a2551"
              />
              <div
                v-if="channel.unread"
                class="absolute -right-1 -top-1 h-3 w-3 rounded-full bg-red-500"
                style="box-shadow: 0 0 0 2px #1a2551"
              ></div>
            </div>
            <div class="flex flex-col">
              <span class="text-sm font-bold text-white">{{ channel.name }}</span>
              <span class="line-clamp-2 break-words text-xs text-gray-400">
                The point of using Lorem Ipsum is that it has a more-or-less normal distribution of
                letters, as opposed to using 'Content here, content here', making it look like
                readable English. Many desktop publishing packages and web page editors now use
                Lorem Ipsum as their default. Contrary to popular belief, Lorem Ipsum is not simply
                random text is the model text for your company.
              </span>
            </div>
          </div>
          <div class="ml-auto flex items-center whitespace-nowrap">
            <span class="text-xs text-gray-400">12:00 PM</span>
          </div>
        </div>
        <!-- <Button
          icon="pi pi-trash"
          aria-label="Delete Channel"
          @click="deleteChannel(channel.id)"
          pt:root="btn"
        /> -->
      </li>
    </ul>
  </div>
</template>

<script setup>
import Button from 'primevue/button'
import Avatar from 'primevue/avatar'

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

<template>
  <Toast pt:root="custom-toast" />
  <div class="chat-box-inner flex h-full flex-col">
    <div
      class="chat-meta-user chat-active sticky top-0 z-10 flex items-center justify-between border-b border-gray-700 p-3"
    >
      <div class="current-chat-user-name">
        <i :class="['pi pi-hashtag']"></i>
        <span class="ms-2 text-start text-xl text-white/90">{{ channel.name }}</span>
      </div>
      <div class="chat-action-btn align-self-center flex">
        <AvatarGroup>
          <Avatar icon="pi pi-user" shape="circle" />
          <Avatar icon="pi pi-user" shape="circle" />
          <Avatar icon="pi pi-user" shape="circle" />
          <Avatar icon="pi pi-user" shape="circle" />
          <Avatar icon="pi pi-user" shape="circle" />
          <Avatar label="+2" shape="circle" />
        </AvatarGroup>
        <div class="ms-2">
          <Button
            type="button"
            icon="pi pi-ellipsis-v"
            @click="toggle"
            aria-haspopup="true"
            aria-controls="overlay_menu"
            size="small"
          />
          <Menu ref="menu" id="overlay_menu" :model="items" :popup="true">
            <template #item="{ item }">
              <a class="flex items-center px-3">
                <span class="text-red-600">{{ item.label }}</span>
              </a>
            </template>
          </Menu>
        </div>
      </div>
    </div>
    <div class="chat-conversation-box flex-grow overflow-auto">
      <div class="chat">
        <div v-for="(res, index) in messages" :key="res.id" class="group-wrapper">
          <Divider v-if="shouldShowDateDivider(index)" align="center" type="solid" class="my-6">
            <span class="text-sm">{{ formatDate(res.sent_at) }}</span>
          </Divider>

          <div
            class="bubble grid grid-cols-12 gap-3 px-3 hover:bg-gray-800/60"
            :class="{ 'mt-6': shouldShowAvatar(index) }"
          >
            <div class="bubble-avatar col-span-1">
              <Avatar
                v-if="shouldShowAvatar(index)"
                icon="pi pi-user"
                size="large"
                style="background-color: #ece9fc; color: #2a1261"
              />
            </div>

            <div class="bubble-content col-span-11 w-full">
              <div v-if="shouldShowAvatar(index)" class="bubble-sender flex items-baseline gap-2">
                <div class="username font-semibold">{{ res.sender.username }}</div>
                <div class="time text-xs text-gray-400">
                  {{ formatTime(res.sent_at) }}
                </div>
              </div>

              <div class="bubble-text text-sm">
                <p>{{ res.message }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="chat-footer p-3">
      <div class="chat-input">
        <vee-form ref="refmessageform" :validation-schema="schema" class="chat-form flex">
          <vee-field name="cmessage" v-slot="{ handleChange }" :bails="false">
            <InputText
              :modelValue="message"
              @update:modelValue="
                (val) => {
                  message = val
                  handleChange(val)
                }
              "
              id="cmessage"
              type="text"
              :placeholder="`Message # ${channel.name}`"
              class="w-full"
            />
          </vee-field>
          <Button
            type="submit"
            :disabled="!message || isSubmitted"
            @click.prevent="onPostMessage()"
            class="ms-2"
          >
            <i v-if="!isSubmitted" class="pi pi-send"></i>
            <span v-else class="pi pi-spin pi-spinner"></span>
            <span>Send</span>
          </Button>
        </vee-form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, onMounted, onUnmounted } from 'vue'

import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import Menu from 'primevue/menu'
import Avatar from 'primevue/avatar'
import AvatarGroup from 'primevue/avatargroup'
import Divider from 'primevue/divider'
import Toast from 'primevue/toast'

import { useToast } from 'primevue/usetoast'
import { useWebSocket } from '@/composables/useWebSocket'
import { useChannelStore } from '@/stores/channel.store'
import { useMessageStore } from '@/stores/message.store'

import ChannelFunctions from '@/components/channels/channel'

const toast = useToast()

const channelStore = useChannelStore()
const messageStore = useMessageStore()

const { postMessage } = ChannelFunctions()
const { initWebSocket, sendMessage, closeWebSocket } = useWebSocket()

onMounted(() => {
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
      // console.log('WebSocket Message:', data)
      if (data.id == channel.value.id) {
        loadMessages()
      }
    }
  })
})

onUnmounted(() => {
  closeWebSocket()
})

const channel = computed(() => {
  return channelStore.channel
})

const messages = computed(() => {
  return messageStore.messages
})

const menu = ref()
const items = ref([
  {
    label: 'Leave Channel'
  }
])

const toggle = (event) => {
  menu.value.toggle(event)
}

const refmessageform = ref(null)
const isSubmitted = ref(false)
const message = ref('')

const schema = {
  cmessage: 'required'
}

const onPostMessage = async () => {
  isSubmitted.value = true

  const { valid } = await refmessageform.value.validate()
  if (!valid) return

  const request = {
    receiver_id: channel.value.id,
    receiver_class: 'channel',
    message: message.value
  }

  try {
    await postMessage(request)
    const msg = { class: 'channel', id: channel.value.id }
    sendMessage(msg)

    message.value = ''
  } catch (error) {
    console.error('Error sending message:', error)
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: 'Failed to send message.',
      life: 3000
    })
  } finally {
    isSubmitted.value = false
  }
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

function shouldShowAvatar(index) {
  if (index === 0) return true

  const current = messages.value[index]
  const previous = messages.value[index - 1]

  const currentSenderId = current?.sender.id
  const previousSenderId = previous?.sender.id

  const currentTime = new Date(current?.sent_at).getTime()
  const previousTime = new Date(previous?.sent_at).getTime()

  const timeDiffMinutes = (currentTime - previousTime) / (1000 * 60) // in minutes

  return currentSenderId !== previousSenderId || timeDiffMinutes >= 10
}

function shouldShowDateDivider(index) {
  if (index === 0) return true

  const current = messages.value[index]
  const previous = messages.value[index - 1]

  const currentDate = new Date(current?.sent_at)
  const previousDate = new Date(previous?.sent_at)

  const currentDay = currentDate.toDateString()
  const previousDay = previousDate.toDateString()

  if (currentDay !== previousDay) {
    return true // different day
  }

  const now = new Date()
  const isToday = now.toDateString() === currentDay

  if (isToday) {
    const timeDiffHours = (currentDate.getTime() - previousDate.getTime()) / (1000 * 60 * 60) // in hours
    return timeDiffHours >= 4
  }

  return false
}

function formatDate(sentAt) {
  const today = new Date()
  const messageDate = new Date(sentAt)

  const isToday = today.toDateString() === messageDate.toDateString()
  const yesterday = new Date()
  yesterday.setDate(today.getDate() - 1)
  const isYesterday = yesterday.toDateString() === messageDate.toDateString()

  if (isToday) {
    return `Today, ${messageDate.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit'
    })}`
  } else if (isYesterday) {
    return `Yesterday, ${messageDate.toLocaleDateString(undefined, {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })}`
  } else {
    return messageDate.toLocaleDateString(undefined, {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }
}

function formatTime(sentAt) {
  const date = new Date(sentAt)
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}
</script>

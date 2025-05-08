<template>
  <div class="chat-box-inner flex h-full flex-col">
    <div
      class="chat-meta-user chat-active sticky top-0 z-10 flex items-center justify-between border-b border-gray-700 p-4"
    >
      <div class="current-chat-user-name flex items-center gap-2">
        <Avatar
          icon="pi pi-user"
          size="small"
          :label="getInitial(receiver.username)"
          pt:root="custom-avatar"
        />
        <span class="text-start uppercase text-white/90"
          >{{ receiver.username }} {{ receiver.id === user.id ? '(You)' : '' }}
        </span>
      </div>
    </div>
    <div class="chat-conversation-box flex flex-grow flex-col overflow-auto">
      <div class="chat flex flex-col gap-2 pb-4">
        <div class="p-4 pb-0">
          <div class="current-chat-user-name flex items-center gap-2">
            <Avatar
              icon="pi pi-user"
              size="xlarge"
              :label="getInitial(receiver.username)"
              style="background-color: #f9fce9; color: #1e293b"
              customClass="bg-red-500 text-white"
            />
            <div class="flex flex-col">
              <span class="text-start text-xl uppercase text-white/90"
                >{{ receiver.username }} {{ receiver.id === user.id ? '(You)' : '' }}
              </span>
              <span class="text-gray-600">{{ receiver.emailaddress }}</span>
            </div>
          </div>
          <p v-if="receiver.id === user.id" class="mt-4 text-sm">
            This is your space. Draft messages, list your to-dos, or keep links and files handy. You
            can also talk to yourself here, but please bear in mind you’ll have to supply both sides
            of the conversation.
          </p>
          <p v-else class="mt-4 text-sm">
            This conversation is just between
            <span class="font-bold">@{{ receiver.username }}</span> and you. Check out their profile
            to learn more about them.
          </p>
        </div>
        <div v-for="(message, index) in messages" :key="message.id" class="group-wrapper">
          <div>
            <Divider
              v-if="shouldShowDateDivider(index)"
              align="center"
              type="solid"
              pt:root="custom-divider"
              pt:content="custom-divider-content"
            >
              <span class="text-sm">{{ formatDate(message.sent_at) }}</span>
            </Divider>
          </div>

          <div
            class="bubble flex items-center justify-start gap-2 px-3 py-1 hover:bg-gray-800/60"
            :class="{ 'mt-6': shouldShowAvatar(index) }"
            @mouseenter="handleMouseEnter(index)"
            @mouseleave="handleMouseLeave"
          >
            <div class="bubble-avatar flex w-10 items-baseline justify-center">
              <Avatar
                v-if="shouldShowAvatar(index)"
                icon="pi pi-user"
                size="small"
                :label="getInitial(message.sender.username)"
                style="background-color: #f9fce9; color: #1e293b"
                customClass="bg-red-500 text-white"
              />
              <span
                v-else
                :class="[
                  'text-[8px] text-slate-400 transition-opacity',
                  hoveredIndex === index ? 'opacity-100' : 'opacity-0'
                ]"
              >
                {{ formatTime(message.sent_at) }}
              </span>
            </div>

            <div class="bubble-content">
              <div v-if="shouldShowAvatar(index)" class="bubble-sender flex items-baseline gap-2">
                <div class="username text-sm font-semibold">{{ message.sender.username }}</div>
                <div class="time text-xs text-gray-400">
                  {{ formatTime(message.sent_at) }}
                </div>
              </div>

              <div class="bubble-text text-sm">
                <p>{{ message.message }}</p>
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
              placeholder="Jot something down"
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
import Avatar from 'primevue/avatar'
import Divider from 'primevue/divider'

import { useToast } from 'primevue/usetoast'
import { useWebSocket } from '@/composables/useWebSocket'
import { useUserStore } from '@/stores/user.store'
import { useMessageStore } from '@/stores/message.store'
import { useDmStore } from '@/stores/dm.store'

import { getInitial } from '@/utils/helper'
import { formatDate, formatTime } from '@/utils/date'

import ChannelFunctions from '@/components/channels/channel'

const toast = useToast()

const userStore = useUserStore()
const messageStore = useMessageStore()
const dmStore = useDmStore()

const { postMessage } = ChannelFunctions()
const { initWebSocket, sendMessage, closeWebSocket } = useWebSocket()

onMounted(() => {
  initWebSocket({
    baseWsUrl: import.meta.env.VITE_WBS_BASE_URL + `/chat/${receiver.value.id}`,
    onErrorCallback: (error) => {
      console.error('WebSocket Error:', error)
      toast.add({
        severity: 'error',
        summary: 'Error',
        detail: 'WebSocket connection error.',
        life: 3000
      })
    },
    onMessageCallback: async (data) => {
      if (data.id == receiver.value.id || data.id == user.value.id) {
        await loadMessages()
        await dmStore.setDms()
      }
    }
  })
})

onUnmounted(() => {
  closeWebSocket()
})

const user = computed(() => {
  return userStore.user
})

const receiver = computed(() => {
  if (!userStore.receiver) {
    return null
  }
  const receiver = userStore.receiver
  return {
    ...userStore.receiver,
    receiver_emailaddress: receiver?.emailaddress || 'Unknown',
    receiver_name:
      receiver?.firstname && receiver?.lastname
        ? `${receiver.firstname} ${receiver.lastname}`
        : receiver?.emailaddress || 'No name'
  }
})

const messages = computed(() => {
  return messageStore.messages
})

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
    receiver_id: receiver.value.id,
    receiver_class: 'user',
    message: message.value
  }

  try {
    await postMessage(request)
    const msg = { class: 'user', id: receiver.value.id }
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
    receiver_id: receiver.value.id,
    receiver_class: 'user',
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

const hoveredIndex = ref(null)

function handleMouseEnter(idx) {
  hoveredIndex.value = idx
}

function handleMouseLeave() {
  hoveredIndex.value = null
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

<style>
.p-divider.custom-divider::before {
  border-block-start: 1px solid #4b5563;
}
.p-divider-content.custom-divider-content {
  --p-divider-content-background: #0f172a;
  color: #4b5563;
}
.p-avatar.custom-avatar {
  @apply bg-indigo-900;
  --p-avatar-width: 1.8rem;
  --p-avatar-height: 1.8rem;
  --p-avatar-font-size: 0.8rem;
  --p-avatar-color: white;
}
</style>

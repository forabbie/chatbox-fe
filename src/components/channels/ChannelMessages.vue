<template>
  <div class="chat-box-inner flex h-full flex-col">
    <div
      class="chat-meta-user chat-active sticky top-0 z-10 flex items-center justify-between border-b border-gray-700 p-3"
    >
      <div class="current-chat-user-name">
        <i :class="['pi pi-hashtag']"></i>
        <span class="ms-2 text-start text-xl text-white/90">{{ channel.name }}</span>
      </div>
      <div class="chat-action-btn align-self-center flex">
        <Button type="button" @click="toggleMemberList" pt:root="btn">
          <AvatarGroup>
            <template v-for="member in visibleMembers" :key="member.id">
              <Avatar :label="getInitial(member.emailaddress)" shape="circle" />
            </template>
            <Avatar v-if="remainingCount > 0" :label="'+' + remainingCount" shape="circle" />
          </AvatarGroup>
        </Button>
        <div class="ms-2">
          <Button
            type="button"
            icon="pi pi-ellipsis-v"
            @click="toggle"
            aria-haspopup="true"
            aria-controls="overlay_menu"
            size="small"
          />
          <Menu ref="menu" :model="items" :popup="true">
            <template #item="{ item, props }">
              <router-link v-if="item.route" v-slot="{ href, navigate }" :to="item.route" custom>
                <a :href="href" v-bind="props.action" @click="navigate">
                  <span :class="item.icon" />
                  <span class="ml-2">{{ item.label }}</span>
                </a>
              </router-link>
              <a v-else :href="item.url" :target="item.target" v-bind="props.action">
                <span :class="item.icon" />
                <span class="ml-2">{{ item.label }}</span>
              </a>
            </template>
          </Menu>
        </div>
      </div>
    </div>
    <div class="chat-conversation-box flex-grow overflow-auto">
      <div class="chat">
        <div v-for="(res, index) in messages" :key="res.id" class="group-wrapper">
          <div class="px-2">
            <Divider
              v-if="shouldShowDateDivider(index)"
              align="center"
              type="solid"
              pt:root="custom-divider"
              pt:content="custom-divider-content"
            >
              <span class="text-sm">{{ formatDate(res.sent_at) }}</span>
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
                :label="getInitial(res.sender.username)"
                style="background-color: #ece9fc; color: #2a1261"
                customClass="bg-red-500 text-white"
              />
              <span
                v-else
                :class="[
                  'text-[8px] text-slate-400 transition-opacity',
                  hoveredIndex === index ? 'opacity-100' : 'opacity-0'
                ]"
              >
                {{ formatTime(res.sent_at) }}
              </span>
            </div>

            <div class="bubble-content">
              <div v-if="shouldShowAvatar(index)" class="bubble-sender flex items-baseline gap-2">
                <div class="username text-sm font-semibold">{{ res.sender.username }}</div>
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

  <Popover ref="refPopoverMemberlist">
    <div class="flex w-[20rem] flex-col gap-4">
      <div>
        <span class="mb-2 block font-bold">Channel Members</span>
        <ul class="m-0 flex list-none flex-col gap-4 p-0">
          <li v-for="member in channel.members" :key="member.id" class="flex items-center gap-2">
            <Avatar
              size="small"
              shape="circle"
              :label="getInitial(member.emailaddress)"
              style="background-color: #ede9fe; color: #2e1065"
              class="border bg-red-500 text-white"
            />
            <div>
              <span class="text-sm font-medium">{{ member.firstname }} {{ member.lastname }}</span>
              <div class="text-surface-500 dark:text-surface-400 text-xs">
                {{ member.emailaddress }}
              </div>
            </div>
            <div
              v-if="member.id == channel.created_by_id"
              class="text-surface-500 dark:text-surface-400 ml-auto flex items-center gap-2 text-sm"
            >
              <span>Creator</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </Popover>
  <Dialog
    v-model:visible="memberDialog"
    :style="{ width: '450px' }"
    :header="`Add members to #${channel.name}`"
    :modal="true"
    pt:root="!bg-white !text-black"
  >
    <div class="py-2">
      <div>
        <!-- <label for="balance" class="mb-3 block font-bold"># {{ channel.name }}</label> -->
        <AutoComplete
          v-model="members"
          inputId="multiple-ac-1"
          multiple
          fluid
          :suggestions="filteredUsers"
          @complete="search"
          optionLabel="name"
          optionValue="id"
          placeholder="Search for members"
          pt:root="custom-autocomplete"
        >
          <template #chip="slotProps">
            <Chip removable removeIcon="pi pi-times" @remove="removeUser(slotProps)">
              <div class="flex items-center gap-4">
                <div class="flex flex-col justify-center">
                  <p class="text-xs">
                    {{ slotProps.value.emailaddress }}
                  </p>
                </div>
              </div>
            </Chip>
          </template>
          <template #option="slotProps">
            <div class="flex items-center">
              <span class="text-xs">
                {{ slotProps.option.emailaddress }}
              </span>
            </div>
          </template>
          <template #empty>
            <span class="text-xs"> No results found. Check spelling or try another name. </span>
          </template>
        </AutoComplete>
      </div>
    </div>
    <template #footer>
      <Button
        label="Done"
        icon="pi pi-check"
        @click="saveChannelMember"
        :disabled="!members.length || isAdded"
        pt:root="custom-button save"
        pt:label="custom-button-label"
        pt:icon="custom-button-icon"
      />
    </template>
  </Dialog>
</template>

<script setup>
import { computed, ref } from 'vue'

import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import Menu from 'primevue/menu'
import Avatar from 'primevue/avatar'
import AvatarGroup from 'primevue/avatargroup'
import Divider from 'primevue/divider'
import Popover from 'primevue/popover'
import Dialog from 'primevue/dialog'
import AutoComplete from 'primevue/autocomplete'
import Chip from 'primevue/chip'

import { useToast } from 'primevue/usetoast'
import { useWebSocket } from '@/composables/useWebSocket'
import { useChannelStore } from '@/stores/channel.store'
import { useMessageStore } from '@/stores/message.store'

import { formatDate, formatTime } from '@/utils/date'

import UserFunctions from '@/components/users/user'
import ChannelFunctions from '@/components/channels/channel'

const toast = useToast()

const channelStore = useChannelStore()
const messageStore = useMessageStore()

const { listUsers } = UserFunctions()
const { postMessage, postChannelMember } = ChannelFunctions()
const { sendMessage } = useWebSocket()

const channel = computed(() => {
  return channelStore.channel
})

const messages = computed(() => {
  return messageStore.messages
})

const menu = ref()
const items = ref([
  {
    label: 'Add People',
    icon: 'pi pi-user-plus',
    command: () => {
      console.log('Add Member')
      openNew()
    }
  }
  // {
  //   label: 'Leave Channel',
  //   icon: 'pi pi-sign-out',
  //   command: () => {
  //     console.log('Leave Channel')
  //   }
  // }
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

const refPopoverMemberlist = ref(null)

const toggleMemberList = async (event) => {
  refPopoverMemberlist.value.toggle(event)
  users.value = await listUsers()
}

const members = ref([])
const memberDialog = ref(false)
const isAdded = ref(false)

const openNew = async () => {
  memberDialog.value = true
  users.value = await listUsers()
}

const saveChannelMember = async () => {
  isAdded.value = true

  if (members.value.length) {
    const memberIds = members.value.map((member) => member.id)

    const results = await Promise.allSettled(
      memberIds.map((id) => {
        const requestData = {
          id: channel.value.id,
          member_id: id
        }
        return postChannelMember(requestData)
      })
    )

    const failed = results.filter((r) => r.status === 'rejected')
    const successful = results.filter((r) => r.status === 'fulfilled')

    if (failed.length === 0) {
      toast.add({
        severity: 'success',
        summary: 'All Members Added',
        detail: `${successful.length} member(s) successfully added.`,
        life: 3000
      })
    } else {
      toast.add({
        severity: 'warn',
        summary: 'Partial Success',
        detail: `${successful.length} succeeded, ${failed.length} failed.`,
        life: 4000
      })
      // Optional: log or handle failures individually
      console.error('Failed requests:', failed)
    }

    channelStore.setChannelDetails(channel.value.id)
    memberDialog.value = false
    members.value = []
    isAdded.value = false
    return
  }

  memberDialog.value = false
}

const filteredUsers = ref([])
const users = ref([])

const search = (event) => {
  const query = event.query.toLowerCase()
  const _members = channel.value.members || []
  filteredUsers.value = users.value.filter((user) => {
    const isMatch = user.emailaddress.toLowerCase().includes(query)
    const notAlreadySelected = !_members.some((m) => m.id === user.id)
    return isMatch && notAlreadySelected
  })
}

const removeUser = (slotProps) => {
  const index = channel.value.members.findIndex((m) => m.id === slotProps.value.id)
  if (index !== -1) {
    channel.value.members.splice(index, 1)
  }
}

const maxVisible = 5
const visibleMembers = computed(() => channel.value?.members?.slice(0, maxVisible))
const remainingCount = computed(() => channel.value?.members?.length - maxVisible)

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

function getInitial(email) {
  if (!email) return '?'

  const trimmedEmail = email.trim()
  const username = trimmedEmail.split('@')[0]

  if (username.length === 1) {
    return username.charAt(0).toUpperCase()
  }

  const firstLetter = username.charAt(0).toUpperCase()
  const lastLetter = username.charAt(username.length - 1).toUpperCase()

  return firstLetter + lastLetter
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
</style>

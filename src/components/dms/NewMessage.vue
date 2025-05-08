<template>
  <vee-form
    ref="refmessageform"
    :validation-schema="schema"
    class="chat-form chat-box-inner flex h-full flex-col pt-3"
  >
    <div class="flex items-center justify-between px-3">
      <h2 class="text-start text-xl font-bold text-white">New Message</h2>
      <Button
        icon="pi pi-times"
        aria-label="Create Channel"
        @click="toggleNew(false)"
        pt:root="btn"
      />
    </div>
    <div
      class="chat-meta-user chat-active sticky top-0 z-10 flex items-center justify-between border-b border-gray-700 p-3"
    >
      <div class="current-chat-user-name flex w-full items-center">
        <span class="text-gray-500">To:</span>
        <AutoComplete
          ref="autocompleteRef"
          v-model="receiver"
          :suggestions="filteredUsers"
          @complete="search"
          optionLabel="emailaddress"
          optionValue="id"
          placeholder="email@somebody.com"
          pt:root="custom-autocomplete"
          pt:pcinputtext:root="custom-inputtext"
        >
          <template #option="slotProps">
            <div class="flex items-center gap-2">
              <Avatar icon="pi pi-user" size="small" customClass="bg-red-500 text-white" />
              <div class="text-sm">
                <span class="uppercase">{{ slotProps.option.username }}</span>
                <p class="text-xs text-gray-500">{{ slotProps.option.emailaddress }}</p>
              </div>
            </div>
          </template>
        </AutoComplete>
      </div>
      <div class="chat-action-btn align-self-center flex"></div>
    </div>
    <div class="chat-conversation-box h-full flex-grow overflow-auto">
      <div class="chat"></div>
    </div>
    <div class="chat-footer flex p-3">
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
          :placeholder="`Message`"
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
    </div>
  </vee-form>
</template>

<script setup>
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import AutoComplete from 'primevue/autocomplete'
import Avatar from 'primevue/avatar'

import { postMessageService } from '@/services/message.service'
import { useWebSocket } from '@/composables/useWebSocket'

import { computed, onMounted, ref, nextTick, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'primevue/usetoast'
import { useDmStore } from '@/stores/dm.store'
import { useUserStore } from '@/stores/user.store'

const { initWebSocket, sendMessage, closeWebSocket } = useWebSocket()

const toast = useToast()
const router = useRouter()
const dmStore = useDmStore()
const userStore = useUserStore()

onMounted(async () => {
  await nextTick()
  const inputEl = autocompleteRef.value?.$el?.querySelector('input')
  if (inputEl) inputEl.focus()

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
        await dmStore.setDms()
        const dms = dmStore.dms || []
        const dm = dms.find((c) => String(c.receiver_id) === String(receiver.value.id))
        router.replace({ name: 'dm', params: { id: dm.id } })
      }
    }
  })
})

onUnmounted(() => {
  closeWebSocket()
})

const autocompleteRef = ref(null)
const message = ref('')
const isSubmitted = ref(false)
const schema = ref({})

const toggleNew = async (isOnNewMessage) => {
  if (isOnNewMessage) {
    router.replace({ name: 'new-dm' })
  } else {
    router.go(-1)
  }
}

const receiver = ref('')

const user = computed(() => {
  return userStore.user
})

const users = computed(() => {
  return userStore.users
})

const onPostMessage = async () => {
  if (typeof receiver.value === 'string') {
    const match = users.value.find((user) => user.emailaddress === receiver.value)
    if (match) {
      receiver.value = match
    }
  }

  if (typeof receiver.value !== 'object') {
    alert('Please select a valid user from the list.')
    return
  }

  isSubmitted.value = true
  const request = {
    receiver_id: receiver.value.id,
    receiver_class: 'user',
    message: message.value
  }

  try {
    await postMessageService(request)
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

const filteredUsers = ref([])
const search = (event) => {
  const query = event.query.toLowerCase()
  filteredUsers.value = users.value.filter((user) => {
    const isMatch = user.emailaddress.toLowerCase().includes(query)
    return isMatch
  })
}
</script>

<style>
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
.p-autocomplete.custom-autocomplete {
  @apply w-full;
}
.p-autocomplete.custom-autocomplete > .p-inputtext.custom-inputtext {
  @apply w-full border-0 bg-transparent text-white focus:outline-none focus:ring-0;
}
</style>

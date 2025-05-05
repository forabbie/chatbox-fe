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
      <div class="current-chat-user-name flex items-center gap-4">
        <span>To:</span>
        <InputText
          id="to"
          type="text"
          :modelValue="message"
          @update:modelValue="
            (val) => {
              message = val
              handleChange(val)
            }
          "
          :placeholder="`sombody@example.com`"
          size="small"
          pt:root="w-full"
        />
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

import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useRouteStore } from '@/stores/route.store'

const router = useRouter()
const routeStore = useRouteStore()

const message = ref('')
const isSubmitted = ref(false)

const schema = ref({})
const toggleNew = async (isOnNewMessage) => {
  console.log(routeStore.previousRoute)
  if (isOnNewMessage) {
    router.replace({ name: 'new-dm' })
  } else {
    // router.replace({ name: 'dm' })
    router.go(-1)
  }
}
// const emit = defineEmits(['toggle-new-message'])
// const toggleNew = () => {
//   emit('toggle-new-message', false)
// }
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

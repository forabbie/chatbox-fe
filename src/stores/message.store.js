import { defineStore } from 'pinia'
import { ref } from 'vue'
import { listMessageService } from '@/services/message.service'

export const useMessageStore = defineStore('message', () => {
  const messages = ref([])

  const setMessages = async (query) => {
    const data = await listMessageService(query)
    messages.value = data.response
  }

  return {
    messages,
    setMessages
  }
})

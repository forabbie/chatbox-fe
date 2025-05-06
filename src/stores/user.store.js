import { defineStore } from 'pinia'
import { ref } from 'vue'
import { listUsersService, getUserService } from '@/services/user.service'

export const useUserStore = defineStore('user', () => {
  const users = ref([])
  const user = ref({})
  const receiver = ref({})

  const setUsers = async () => {
    const data = await listUsersService()
    users.value = data.response
  }

  const setUser = async (userId) => {
    const data = await getUserService(userId)
    user.value = data.response
  }

  const setReceiver = async (userId) => {
    const data = await getUserService(userId)
    receiver.value = data.response
  }

  return {
    users,
    setUsers,
    user,
    setUser,
    receiver,
    setReceiver
  }
})

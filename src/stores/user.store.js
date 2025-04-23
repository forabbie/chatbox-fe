import { defineStore } from 'pinia'
import { ref } from 'vue'
import { listUsersService } from '@/services/user.service'

export const useUserStore = defineStore('user', () => {
  const users = ref([
    { id: 1, name: 'John Doe', email: '' },
    { id: 2, name: 'Jane Smith', email: '' },
    { id: 3, name: 'Alice Johnson', email: '' },
    { id: 4, name: 'Bob Brown', email: '' },
    { id: 5, name: 'Charlie Davis', email: '' },
    { id: 6, name: 'David Wilson', email: '' },
    { id: 7, name: 'Eve Thompson', email: '' },
    { id: 8, name: 'Frank Garcia', email: '' },
    { id: 9, name: 'Grace Martinez', email: '' },
    { id: 10, name: 'Hannah Anderson', email: '' }
  ])

  const setUsers = async () => {
    users.value = await listUsersService()
  }

  return {
    users,
    setUsers
  }
})

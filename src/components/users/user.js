import { listUsersService } from '@/services/user.service'
// import { useAuthStore } from '@/stores/channel.store'

// const authStore = useAuthStore()

const UserFunctions = () => {
  const listUsers = async () => {
    try {
      const data = await listUsersService()
      return data.response
    } catch (err) {
      throw err
    }
  }

  return {
    listUsers
  }
}

export default UserFunctions

<template>
  <Dialog
    class="dark:!border-[#4f4f73]"
    v-model:visible="isVisible"
    modal
    header="Session Expired"
    :style="{ width: '500px' }"
    :draggable="false"
    @hide="handleClose"
  >
    <p class="m-0">
      Your session has expired. You will be logged out and redirected to the login page when you
      close this dialog.
    </p>
  </Dialog>
</template>

<script setup>
import Dialog from 'primevue/dialog'
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth.store'

const authStore = useAuthStore()

const isVisible = computed({
  get() {
    return authStore.isSessionExpired
  },
  set(value) {
    authStore.isSessionExpired = value
  }
})

const router = useRouter()

const handleClose = async () => {
  try {
    await authStore.logoutUser()
    router.push('/auth/login')
  } catch (error) {
    console.error(error)
  } finally {
    isVisible.value = false
  }
}
</script>

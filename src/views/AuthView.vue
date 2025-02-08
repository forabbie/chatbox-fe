<template>
  <div class="flex h-full items-center justify-center bg-primary-950 px-6 py-20 md:px-12 lg:px-20">
    <div class="bg-animate mx-auto w-full rounded-lg p-6 text-xs shadow sm:w-[30rem]">
      <router-view :key="$route.path"></router-view>
    </div>
  </div>
</template>

<script setup>
// import { ref } from 'vue'
// import { useRouter } from 'vue-router'
// import { useAuthStore } from '@/stores/auth.store'
// import LoginForm from '@/components/auth/LoginForm.vue'

// const router = useRouter()
// const authStore = useAuthStore()

// const isLogin = ref(true)
// const form = ref({
//   name: '',
//   email: '',
//   password: ''
// })

// const toggleMode = () => {
//   isLogin.value = !isLogin.value
// }

// const handleSubmit = async () => {
//   try {
//     if (isLogin.value) {
//       await authStore.loginUser({
//         email: form.value.email,
//         password: form.value.password
//       })
//     } else {
//       await authStore.registerUser({
//         name: form.value.name,
//         email: form.value.email,
//         password: form.value.password
//       })
//     }
//     router.push({ name: 'Home' }) // Redirect to home after successful auth
//   } catch (error) {
//     console.error('Authentication failed:', error)
//   }
// }
</script>

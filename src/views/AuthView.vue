<template>
  <div class="auth-view">
    <!-- <h2>{{ isLogin ? "Login" : "Register" }}</h2>
    <form @submit.prevent="handleSubmit">
      <div v-if="!isLogin">
        <input v-model="form.name" placeholder="Name" required />
      </div>
      <input v-model="form.email" type="email" placeholder="Email" required />
      <input
        v-model="form.password"
        type="password"
        placeholder="Password"
        required
      />
      <button type="submit">{{ isLogin ? "Login" : "Register" }}</button>
    </form>
    <p>
      {{ isLogin ? "Don't have an account?" : "Already have an account?" }}
      <a @click="toggleMode">{{ isLogin ? "Register" : "Login" }}</a>
    </p> -->
    <login-form></login-form>
  </div>
</template>

<script setup>
// import { ref } from 'vue'
// import { useRouter } from 'vue-router'
// import { useAuthStore } from '@/stores/auth.store'
import LoginForm from '@/components/auth/LoginForm.vue'

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

<style scoped>
.auth-view {
  @apply flex h-full items-center justify-center bg-primary-900 px-6 py-20 md:px-12 lg:px-20;
}
</style>

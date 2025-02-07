<template>
  <div class="card w-full text-xs sm:w-[30rem]">
    <div class="mb-8 flex flex-col items-center justify-center text-center">
      <img src="/images/logo.svg" alt="slack-logo" class="mb-2 size-8" />
      <div class="mb-3 text-3xl text-slate-900 dark:text-slate-50">Welcome Back</div>
      <span class="text-base leading-normal text-slate-600 dark:text-slate-200"
        >Don't have an account?<a class="text-link ml-2">Create today!</a></span
      >
    </div>
    <vee-form :validation-schema="schema" @submit="validateForm">
      <BaseInput name="email address" label="Email Address" v-model="form.email">
        <template #before>
          <InputIcon class="pi pi-envelope" />
        </template>
      </BaseInput>

      <BaseInput name="password" label="Password" type="password" v-model="form.password">
        <template #before>
          <InputIcon class="pi pi-lock" />
        </template>
      </BaseInput>

      <div class="mb-10 flex items-center justify-between">
        <BaseCheckbox name="rememberme" label="Remember Me" v-model="form.rememberme" binary />
        <a class="text-link ml-2">Forgot password?</a>
      </div>

      <BaseButton
        class="w-full"
        variant="primary"
        type="submit"
        :disabled="false"
        :inactive="false"
        :loading="false"
        >Sign In</BaseButton
      >
    </vee-form>
  </div>
</template>
<script setup>
import { ref } from 'vue'

import InputIcon from 'primevue/inputicon'

import BaseInput from '@/components/common/BaseInput.vue'
import BaseCheckbox from '@/components/common/BaseCheckbox.vue'
import BaseButton from '@/components/common/BaseButton.vue'

const form = ref({
  email: '',
  password: '',
  rememberme: true
})

const schema = {
  'email address': 'email|required',
  password: 'required'
}

const validateForm = (values) => {
  console.log('log me: ', values)
}
</script>

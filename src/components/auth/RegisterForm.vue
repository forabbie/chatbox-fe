<template>
  <div class="mb-8 flex flex-col items-center justify-center text-center">
    <img src="/images/logo.svg" alt="slack-logo" class="mb-2 size-8" />
    <div class="mb-3 text-3xl text-slate-900 dark:text-slate-50">Sign up to Slackbox</div>
    <span class="text-base leading-normal text-slate-600 dark:text-slate-200"
      >Already have an account?<a href="/auth/login" class="text-link ml-2">Sign in</a></span
    >
  </div>
  <vee-form :validation-schema="schema" @submit="validateForm">
    <BaseInput name="name" label="Name" v-model="form.name">
      <template #before>
        <InputIcon class="pi pi-user" />
      </template>
    </BaseInput>

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

    <BaseInput
      name="confirm password"
      label="Confirm Password"
      type="password"
      v-model="form.confirmPassword"
    >
      <template #before>
        <InputIcon class="pi pi-lock" />
      </template>
    </BaseInput>

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
</template>
<script setup>
import { ref } from 'vue'

import InputIcon from 'primevue/inputicon'

import BaseInput from '@/components/common/BaseInput.vue'
import BaseButton from '@/components/common/BaseButton.vue'

const form = ref({
  email: '',
  password: '',
  name: '',
  confirmPassword: ''
})

const schema = {
  'email address': 'email|required',
  password: 'required'
}

const validateForm = (values) => {
  console.log('log me: ', values)
}
</script>

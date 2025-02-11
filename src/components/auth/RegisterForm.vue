<template>
  <div class="flex h-full">
    <div class="hidden w-full lg:block">
      <img src="/images/bg-darkest--wide.webp" alt="bg" class="h-full" />
    </div>
    <div
      class="lg:rounded-0 z-10 mx-auto my-6 flex w-11/12 items-center rounded-2xl bg-slate-950 bg-opacity-100 p-6 lg:my-0 lg:w-full"
    >
      <div class="w-full">
        <div class="mb-8 flex flex-col items-center justify-center text-center">
          <img src="/images/logo.svg" alt="slack-logo" class="mb-2 size-8" />
          <div class="mb-3 text-3xl text-slate-900 dark:text-slate-50">Sign up to Slackbox</div>
          <span class="text-base leading-normal text-slate-600 dark:text-slate-200"
            >Already have an account?
            <router-link to="/auth/login" class="text-link ml-2">Sign in</router-link>
          </span>
        </div>
        <vee-form ref="regosterform" :validation-schema="schema" @submit="validateForm">
          <BaseInput name="name" label="Name" v-model="form.name">
            <template #before>
              <InputIcon class="pi pi-user" />
            </template>
          </BaseInput>

          <BaseInput
            name="email address"
            label="Email Address"
            v-model="form.email"
            :submitted="submitted"
          >
            <template #before>
              <InputIcon class="pi pi-envelope" />
            </template>
          </BaseInput>

          <BaseInput
            name="password"
            label="Password"
            type="password"
            v-model="form.password"
            :submitted="submitted"
          >
            <template #before>
              <InputIcon class="pi pi-lock" />
            </template>
          </BaseInput>

          <BaseInput
            name="confirm password"
            label="Confirm Password"
            type="password"
            v-model="form.confirmPassword"
            :submitted="submitted"
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
            @click.prevent="validateForm"
            >Sign In</BaseButton
          >
        </vee-form>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue'

import InputIcon from 'primevue/inputicon'

import BaseInput from '@/components/common/BaseInput.vue'
import BaseButton from '@/components/common/BaseButton.vue'

const submitted = ref(false)
const form = ref({
  email: '',
  password: '',
  name: '',
  confirmPassword: ''
})

const schema = {
  'email address': 'required|email',
  password: 'required|min:9|max:36|excluded:password',
  'confirm password': 'password_mismatch:@password'
}

const regosterform = ref(null)

const validateForm = async (values) => {
  submitted.value = true
  const { valid } = await regosterform.value.validate()
  // console.log('Validation result:', { valid, errors }) // Debugging

  if (!valid) {
    return
  }

  // Proceed with form submission
  console.log('Form submitted with values:', values)
}
</script>

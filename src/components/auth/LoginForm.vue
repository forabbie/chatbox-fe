<template>
  <div class="flex h-full items-center text-slate-300">
    <div class="card z-10 mx-6 sm:m-auto sm:w-[30rem]">
      <div class="mb-8 flex flex-col items-center justify-center text-center">
        <img src="/images/logo.svg" alt="slack-logo" class="mb-2 size-8" />
        <div class="mb-3 text-3xl text-slate-50">Sign in to Slackbox</div>
        <span class="text-base leading-normal text-slate-100"
          >Don't have an account?
          <router-link to="/auth/signup" class="text-link">Create today!</router-link>
        </span>
      </div>
      <vee-form ref="refloginform" :validation-schema="schema" :validate-on-input="false">
        <BaseInput
          name="email address"
          label="Email Address"
          type="email"
          v-model="form.emailaddress"
          :isSubmitted="isSubmitted"
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
          :isSubmitted="isSubmitted"
        >
          <template #before>
            <InputIcon class="pi pi-lock" />
          </template>
        </BaseInput>

        <div class="mb-10 flex items-center justify-between">
          <BaseCheckbox
            name="rememberme"
            label="Remember Me"
            v-model="form.rememberme"
            binary
            :isSubmitted="isSubmitted"
          />
          <a class="text-link ml-2">Forgot password?</a>
        </div>

        <BaseButton
          class="w-full"
          variant="primary"
          type="submit"
          :disabled="false"
          :inactive="false"
          :loading="false"
          @click.prevent="handleFormSubmit"
          >Sign In</BaseButton
        >
      </vee-form>
    </div>
  </div>
</template>
<script setup>
import InputIcon from 'primevue/inputicon'

import BaseInput from '@/components/common/BaseInput.vue'
import BaseCheckbox from '@/components/common/BaseCheckbox.vue'
import BaseButton from '@/components/common/BaseButton.vue'

import LoginFunctions from './login.js'

import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const { performLogin } = LoginFunctions()

const form = ref({
  emailaddress: '',
  password: '',
  rememberme: true
})

const schema = {
  'email address': 'email|required',
  password: 'required|min:6' // |excluded:password
}

const refloginform = ref(null)
const isSubmitted = ref(false)
const isInSubmission = ref(false)

const handleFormSubmit = async () => {
  isSubmitted.value = true
  isInSubmission.value = true

  const { valid } = await refloginform.value.validate()

  if (!valid) return

  await performLogin(form.value)

  router.push({ name: 'home' })
}
</script>

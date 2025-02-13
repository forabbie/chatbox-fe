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
      <vee-form
        ref="loginform"
        :validation-schema="schema"
        :validate-on-input="false"
        @submit.prevent="validateForm"
      >
        <BaseInput
          name="email address"
          label="Email Address"
          type="email"
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

        <div class="mb-10 flex items-center justify-between">
          <BaseCheckbox
            name="rememberme"
            label="Remember Me"
            v-model="form.rememberme"
            binary
            :submitted="submitted"
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
          @click.prevent="validateForm"
          >Sign In</BaseButton
        >
      </vee-form>
    </div>
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
  password: 'required|min:9|excluded:password'
}

const loginform = ref(null)
const submitted = ref(false)
const in_submission = ref(false)

const validateForm = async (values) => {
  submitted.value = true
  in_submission.value = true
  const { valid } = await loginform.value.validate()
  // console.log('Validation result:', { valid, errors }) // Debugging

  if (!valid) {
    return
  }

  // // Proceed with form submission
  console.log('Form submitted with values:', values)
}
</script>

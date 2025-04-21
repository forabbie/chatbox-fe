<template>
  <div class="flex h-full text-sm text-slate-300">
    <div class="hidden w-full lg:block">
      <img src="/images/bg-darkest--wide.webp" alt="bg" class="h-full" />
    </div>
    <div
      class="z-10 mx-auto my-6 flex max-h-fit items-center rounded-2xl bg-slate-950 bg-opacity-100 p-12 sm:max-h-full sm:w-[30rem] lg:my-0 lg:w-11/12 lg:rounded-none lg:py-6"
    >
      <div class="mx-auto w-full max-w-[32rem]">
        <div class="mb-8 flex flex-col items-center justify-center text-center">
          <img src="/images/logo.svg" alt="slack-logo" class="mb-2 size-8" />
          <div class="mb-3 text-3xl text-slate-50">Sign up to Slackbox</div>
          <span class="text-base leading-normal text-slate-100 dark:text-slate-200"
            >Already have an account?
            <router-link to="/auth/login" class="text-link ml-2">Sign in</router-link>
          </span>
        </div>
        <vee-form ref="registerform" :validation-schema="schema">
          <div class="grid grid-cols-12 gap-4">
            <div class="col-span-6">
              <BaseInput name="firstname" label="First Name" v-model="form.firstname">
                <template #before>
                  <InputIcon class="pi pi-user" />
                </template>
              </BaseInput>
            </div>
            <div class="col-span-6">
              <BaseInput name="lastname" label="Last Name" v-model="form.lastname">
                <template #before>
                  <InputIcon class="pi pi-user" />
                </template>
              </BaseInput>
            </div>
          </div>

          <BaseInput
            name="username"
            label="Username"
            v-model="form.username"
            :isSubmitted="isSubmitted"
          >
            <template #before>
              <InputIcon class="pi pi-user" />
            </template>
          </BaseInput>

          <BaseInput
            name="emailaddress"
            label="Email Address"
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

          <BaseInput
            name="confirm password"
            label="Confirm Password"
            type="password"
            v-model="form.confirmPassword"
            :isSubmitted="isSubmitted"
          >
            <template #before>
              <InputIcon class="pi pi-lock" />
            </template>
          </BaseInput>

          <div class="mb-10">
            <BaseCheckbox
              name="tos"
              label="Accept terms of service"
              v-model="form.tos"
              binary
              :isSubmitted="isSubmitted"
            />
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
  </div>
</template>
<script setup>
import InputIcon from 'primevue/inputicon'

import BaseInput from '@/components/common/BaseInput.vue'
import BaseCheckbox from '@/components/common/BaseCheckbox.vue'
import BaseButton from '@/components/common/BaseButton.vue'

import RegisterFunctions from './register.js'

import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const { register } = RegisterFunctions()

const isSubmitted = ref(false)
const form = ref({
  emailaddress: '',
  password: '',
  firstname: '',
  lastname: '',
  confirmPassword: '',
  tos: false
})

const schema = {
  username: 'required',
  emailaddress: 'required|email',
  password: 'required|min:9|max:36|excluded:password',
  'confirm password': 'required|password_mismatch:@password',
  tos: 'tos'
}

const registerform = ref(null)

const handleFormSubmit = async () => {
  isSubmitted.value = true
  const { valid } = await registerform.value.validate()

  if (!valid) return

  await register(form.value)

  router.push({ name: 'home' })

  // Proceed with form submission
  // console.log('Form submitted with values:', values)
}
</script>

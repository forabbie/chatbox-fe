<template>
  <aside class="flex">
    <div class="nav-content flex h-screen flex-col justify-between">
      <div>
        <!-- Logo Section -->
        <section class="w-full">
          <div class="logo-wrapper">
            <img src="/images/logo.svg" alt="Company Logo" class="logo" height="24" width="24" />
          </div>
        </section>

        <!-- Navigation -->
        <nav class="nav p-2.5" role="navigation" aria-label="Main menu">
          <ul class="flex w-full flex-col gap-4">
            <li v-for="item in routes" :key="item.label" class="nav-item">
              <router-link
                :to="item.route"
                :class="['link group', { 'router-link-active': isRouteActive(item) }]"
                :aria-label="item.label"
              >
                <div
                  class="icon-wrapper group-hover:bg-indigo-100/25 group-hover:shadow-sm group-hover:shadow-indigo-300/25"
                >
                  <i aria-hidden="true" class="group-hover:text-white">
                    <component :is="item.icon" :active="isRouteActive(item)" />
                  </i>
                </div>
                <span class="label group-hover:text-white">{{ item.label }}</span>
              </router-link>
            </li>
          </ul>
        </nav>
      </div>
      <div class="mb-4 flex flex-col items-center gap-4 p-2.5">
        <Avatar
          :title="`${user.username}`"
          icon="pi pi-user"
          size="small"
          :label="getInitial(user.username)"
          pt:root="custom-avatar"
        />
        <Button
          icon="pi pi-sign-out"
          aria-label="Create Channel"
          pt:root="custom-btn"
          @click.prevent="requireConfirmation()"
          title="logout"
        />
      </div>
    </div>
    <!-- Vertical Divider -->
    <!-- <BaseDivider layout="vertical" /> -->
    <ConfirmDialog group="headless">
      <template #container="{ message, acceptCallback, rejectCallback }">
        <div class="bg-surface-0 dark:bg-surface-900 flex flex-col items-center rounded p-8">
          <div
            class="-mt-20 inline-flex h-24 w-24 items-center justify-center rounded-full bg-primary text-slate-50"
          >
            <i class="pi pi-question !text-4xl"></i>
          </div>
          <span class="mb-2 mt-6 block text-2xl font-bold">{{ message.header }}</span>
          <p class="mb-0">{{ message.message }}</p>
          <div class="mt-6 flex items-center gap-2">
            <Button label="Confirm" @click="acceptCallback" class="w-32"></Button>
            <Button label="Cancel" outlined @click="rejectCallback" class="w-32"></Button>
          </div>
        </div>
      </template>
    </ConfirmDialog>
  </aside>
</template>

<script setup>
import Button from 'primevue/button'
import IconHome from '@/components/icons/IconHome.vue'
import IconMessage from '@/components/icons/IconMessage.vue'
import Avatar from 'primevue/avatar'
import ConfirmDialog from 'primevue/confirmdialog'

import router from '@/router'

import { computed, markRaw } from 'vue'
import { useRoute } from 'vue-router'
import { useConfirm } from 'primevue/useconfirm'

import { getInitial } from '@/utils/helper'

import { useChannelStore } from '@/stores/channel.store'
import { useAuthStore } from '@/stores/auth.store.js'
import { useUserStore } from '@/stores/user.store.js'

const channelStore = useChannelStore()
const authStore = useAuthStore()
const userStore = useUserStore()

const user = computed(() => {
  return userStore.user
})

const route = useRoute()
const routes = computed(() => {
  const firstChannel = channelStore.channels?.[0]
  let rchannel = '/channel/no-channels'

  if (firstChannel) {
    rchannel = `/channel/${firstChannel.id}`
  }

  return [
    {
      label: 'Channels',
      icon: markRaw(IconHome),
      route: rchannel
    },
    {
      label: 'DMs',
      icon: markRaw(IconMessage),
      route: '/dms'
    }
  ]
})

const isRouteActive = (item) => {
  if (item.label === 'Channels') {
    return route.path.startsWith('/channel/')
  }
  return route.path === item.route
}

const logout = async () => {
  await authStore.logoutUser()
  router.push('/auth/login')
}

const confirm = useConfirm()
const requireConfirmation = () => {
  confirm.require({
    group: 'headless',
    header: 'Sign out now?',
    message: 'Please confirm if you want to log out of your account.',
    accept: () => {
      logout()
    },
    reject: () => {
      // toast.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 3000 })
    }
  })
}
</script>

<style scoped>
.logo-wrapper {
  @apply m-4 flex items-center justify-center;
}

.nav-content > .nav {
  @apply flex flex-col items-center;
}
i {
  @apply size-5;
  display: flex;
  place-items: center;
  place-content: center;
}

.nav-item > .link {
  @apply flex flex-col items-center justify-center text-white focus:outline-none focus-visible:ring-0;
}

.link > .icon-wrapper {
  @apply flex items-center justify-center rounded-xl p-2.5;
}

.link > .label {
  @apply mt-1.5 text-[0.65rem] font-light;
}

.router-link-active .icon-wrapper {
  @apply bg-slate-100/25 shadow-sm shadow-indigo-400/25;
}
.btn.p-button {
  width: auto;
  height: auto;
  padding: 0;
  background-color: transparent;
  border: 1px solid transparent;
  color: rgba(255, 255, 255, 0.8);
}
.btn.p-button:hover {
  @apply text-white;
  padding: 0;
  background-color: transparent;
  border: 1px solid transparent;
}
.p-avatar.custom-avatar {
  @apply bg-indigo-700;
  /* --p-avatar-background: #15803d; */
  --p-avatar-color: white;
}
</style>

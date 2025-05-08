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
          style="background-color: #f9fce9; color: #1e293b"
          customClass="bg-red-500 text-white"
        />
        <Button
          icon="pi pi-sign-out"
          aria-label="Create Channel"
          pt:root="custom-btn"
          @click.prevent="logout"
          title="logout"
        />
      </div>
    </div>
    <!-- Vertical Divider -->
    <!-- <BaseDivider layout="vertical" /> -->
  </aside>
</template>

<script setup>
import Button from 'primevue/button'
import IconHome from '@/components/icons/IconHome.vue'
import IconMessage from '@/components/icons/IconMessage.vue'
import Avatar from 'primevue/avatar'

import router from '@/router'

import { computed, markRaw } from 'vue'
import { useRoute } from 'vue-router'

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
</style>

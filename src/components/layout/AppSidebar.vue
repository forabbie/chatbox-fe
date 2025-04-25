<template>
  <aside class="flex">
    <div class="nav-content flex h-screen flex-col justify-between">
      <div>
        <!-- Logo Section -->
        <section class="w-full">
          <div class="logo-wrapper">
            <img src="/images/logo.svg" alt="Company Logo" class="logo" height="24" width="24" />
          </div>
          <BaseDivider />
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
      <div class="mb-4 flex flex-col items-center p-2.5">
        <Button
          icon="pi pi-sign-out"
          aria-label="Create Channel"
          pt:root="custom-btn"
          @click.prevent="logout"
        />
      </div>
    </div>
    <!-- Vertical Divider -->
    <BaseDivider layout="vertical" />
  </aside>
</template>

<script setup>
import Button from 'primevue/button'
import BaseDivider from '@/components/common/BaseDivider.vue'
import IconHome from '@/components/icons/IconHome.vue'
import IconMessage from '@/components/icons/IconMessage.vue'

import router from '@/router'

import { computed, markRaw } from 'vue'
import { useRoute } from 'vue-router'

import { useChannelsStore } from '@/stores/channel.store'
import { useAuthStore } from '@/stores/auth.store.js'

const channelStore = useChannelsStore()
const authStore = useAuthStore()

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
</style>

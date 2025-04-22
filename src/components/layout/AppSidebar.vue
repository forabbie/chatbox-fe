<template>
  <aside class="flex">
    <div class="nav-content">
      <!-- Logo Section -->
      <section class="w-full">
        <div class="logo-wrapper">
          <img src="/images/logo.svg" alt="Company Logo" class="logo" height="28" width="28" />
        </div>
        <BaseDivider />
      </section>

      <!-- Navigation -->
      <nav class="nav p-2.5" role="navigation" aria-label="Main menu">
        <ul class="flex w-full flex-col gap-4">
          <li v-for="item in routes" :key="item.label" class="nav-item">
            <router-link
              :to="item.route"
              class="link group"
              :aria-label="item.label"
              active-class="router-link-active"
            >
              <div
                class="icon-wrapper group-hover:bg-indigo-100/25 group-hover:shadow-sm group-hover:shadow-indigo-300/25"
              >
                <i aria-hidden="true" class="group-hover:text-white">
                  <component :is="item.icon" :active="item.route === route.path" />
                </i>
              </div>
              <span class="label group-hover:text-white">{{ item.label }}</span>
            </router-link>
          </li>
        </ul>
      </nav>
    </div>

    <!-- Vertical Divider -->
    <BaseDivider layout="vertical" />
  </aside>
</template>

<script setup>
import BaseDivider from '@/components/common/BaseDivider.vue'
import IconHome from '@/components/icons/IconHome.vue'
import IconMessage from '@/components/icons/IconMessage.vue'

import { markRaw } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const routes = [
  {
    label: 'Channels',
    icon: markRaw(IconHome),
    route: '/channels'
  },
  {
    label: 'DMs',
    icon: markRaw(IconMessage),
    route: '/dms'
  }
]
</script>

<style scoped>
.logo-wrapper {
  @apply m-4 flex items-center justify-center;
}

.nav-content > .nav {
  @apply flex flex-col items-center;
}

i {
  @apply size-4 group-hover:scale-125;
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

.router-link-active i {
  @apply scale-125;
}
</style>

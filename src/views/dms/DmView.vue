<template>
  <div class="grid h-full w-full grid-cols-12 text-white/80">
    <aside class="col-span-4 overflow-hidden rounded-tl-lg bg-gray-950">
      <DmList
        class="border-r border-fuchsia-900 bg-fuchsia-950/50"
        @toggle-new-message="toggleNew"
      />
    </aside>
    <main class="col-span-8 overflow-hidden">
      <router-view v-slot="{ Component }" class="fade-in">
        <transition name="fade" mode="out-in">
          <component :is="Component" :key="$route.path"></component>
        </transition>
      </router-view>
    </main>
  </div>
</template>

<script setup>
import DmList from '@/components/dms/DmList.vue'

import { useRouter } from 'vue-router'

const router = useRouter()

const toggleNew = async (isOnNewMessage) => {
  if (isOnNewMessage) {
    router.replace({ name: 'new-dm' })
  } else {
    router.replace({ name: 'dm' })
  }
}
</script>

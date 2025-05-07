<template>
  <div
    class="relative flex h-screen w-screen bg-fuchsia-950"
    :class="{ 'grid grid-cols-[auto,1fr]': !isSidebarAnchored }"
  >
    <AppSidebar />
    <section class="default-app-layout" :class="{ 'is-anchored-app-layout': !isSidebarAnchored }">
      <header class="sticky top-0 z-10 w-full">
        <Toast pt:root="custom-toast" />
        <AppHeader />
      </header>
      <main
        class="flex-grow overflow-auto rounded-tl-lg border border-b-0 border-r-0 border-fuchsia-900 bg-slate-900"
      >
        <div class="flex h-full flex-col">
          <router-view :key="$route.path"></router-view>
          <footer v-if="false" class="mt-auto px-4 py-4">
            <AppFooter class="" />
          </footer>
        </div>
      </main>
    </section>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useLayoutStore } from '@/stores/layout.store'
import { useUserStore } from '@/stores/user.store'
import { parseUserIdFromToken } from '@/utils/token'

import Toast from 'primevue/toast'

import AppHeader from '@/components/layout/AppHeader.vue'
import AppSidebar from '@/components/layout/AppSidebar.vue'
import AppFooter from '@/components/layout/AppFooter.vue'

const userStore = useUserStore()
const layoutStore = useLayoutStore()
const isSidebarAnchored = computed(() => layoutStore.isSidebarAnchored)

onMounted(async () => {
  const userId = parseUserIdFromToken()
  await loadUser(userId)
})

const loadUser = async (userId) => {
  try {
    await userStore.setUser(userId)
  } catch (error) {
    console.error('Error loading user details:', error)
  }
}
</script>

<style scoped>
.default-app-layout {
  @apply flex h-full w-10/12 flex-1 flex-col transition-all duration-300 ease-in-out;
}
.is-anchored-app-layout {
  @apply absolute left-[69px] w-[calc(100%-70px)];
}
</style>

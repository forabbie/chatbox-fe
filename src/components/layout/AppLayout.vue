<template>
  <div
    class="relative flex h-screen w-screen"
    :class="{ 'grid grid-cols-[auto,1fr]': !isSidebarAnchored }"
  >
    <AppSidebar />
    <section class="default-app-layout" :class="{ 'is-anchored-app-layout': !isSidebarAnchored }">
      <header class="sticky top-0 z-10 w-full bg-[#F5F9FF]">
        <AppHeader />
      </header>
      <main class="flex-grow overflow-auto">
        <div class="flex h-full flex-col">
          <router-view :key="$route.path"></router-view>
          <footer class="mt-auto px-4 py-4">
            <AppFooter class="" />
          </footer>
        </div>
      </main>
    </section>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useLayoutStore } from '@/stores/layout.store'
import AppHeader from '@/components/layout/AppHeader.vue'
import AppSidebar from '@/components/layout/AppSidebar.vue'
import AppFooter from '@/components/layout/AppFooter.vue'

const layoutStore = useLayoutStore()
const isSidebarAnchored = computed(() => layoutStore.isSidebarAnchored)
</script>

<style scoped>
.default-app-layout {
  @apply flex h-full w-10/12 flex-1 flex-col bg-[#F5F9FF] transition-all duration-300 ease-in-out;
}
.is-anchored-app-layout {
  @apply absolute left-[69px] w-[calc(100%-70px)];
}
</style>

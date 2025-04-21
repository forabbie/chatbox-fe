<template>
  <div
    class="sidebar-wrapper !z-50 bg-white transition-all duration-300 ease-in-out"
    :class="{ 'sidebar-anchored': isSidebarAnchored, 'sidebar-active': isExpanded }"
    @mouseover="handleMouseOver()"
    @mouseleave="handleMouseLeave()"
  >
    <span
      class="border-surface-200 flex items-center justify-between gap-1 border-b py-2 pl-3 pr-[15px]"
    >
      <img src="/images/logo.svg" alt="app-logo" class="size-6" />
      <Button
        v-if="isSidebarAnchored || isExpanded"
        label="Plain"
        plain
        text
        class="border-0 !p-0 focus:ring-0"
        @click="toggleSideBar"
        @mouseover="isButtonHovered = true"
        @mouseleave="isButtonHovered = false"
      >
        <img src="/icons/slide-default.svg" alt="slide-default" />
      </Button>
    </span>
    <nav ref="sidebar" id="sidebar" class="px-2 py-3">
      <ul v-for="(item, count) in items" :key="count" class="list-none text-slate-800">
        <!-- Render separators -->
        <li v-if="item.separator" class="my-2 border-b border-gray-200"></li>

        <!-- Render section labels -->
        <li v-if="item.label" class="menu-item">
          <span class="ms-1 font-bold">{{ item.label }}</span>
        </li>

        <!-- Render menu items -->
        <li v-for="subItem in item.items" :key="subItem.label" class="menu-item">
          <div class="item-content group">
            <router-link
              :to="subItem.route"
              class="item-link"
              :class="{
                'justify-center': !isExpanded && !isSidebarAnchored,
                'justify-start': isExpanded
              }"
              active-class="router-link-active"
              @mouseover="hoveredItem = subItem.label"
              @mouseleave="hoveredItem = null"
            >
              <div class="flex items-center">
                <span v-if="isExpanded || isSidebarAnchored" class="ml-2 text-nowrap font-medium">{{
                  subItem.label
                }}</span>
              </div>
            </router-link>
          </div>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { computed } from 'vue'
import { useLayoutStore } from '@/stores/layout.store'
import { getLocalStorage } from '@/utils/storage'
import Button from 'primevue/button'
import { onMounted } from 'vue'

const hoveredItem = ref(null)
const isButtonHovered = ref(false)
const layoutStore = useLayoutStore()
const isSidebarAnchored = computed(() => layoutStore.isSidebarAnchored)
const isExpanded = ref(false)

const items = ref([
  {
    label: 'GENERAL',
    items: [
      {
        label: 'Dashboard',
        icon: 'dashboard',
        route: '/dashboard'
      },
      {
        label: 'Calendar',
        icon: 'calendar',
        route: '/calendar'
      },
      {
        label: 'Clients',
        icon: 'clients',
        route: '/clients'
      },
      {
        label: 'Service Board',
        icon: 'service board',
        route: '/service-board'
      },
      {
        label: 'Scheduled Support',
        icon: 'scheduled support',
        route: '/scheduled-support'
      },
      {
        label: 'Performance Pulse',
        icon: 'performance',
        route: '/performance-pulse'
      }
    ]
  },
  {
    separator: true
  }
])

onMounted(() => {
  const sidebarAnchoredValue = getLocalStorage('acp.isSidebarAnchored')
  if (sidebarAnchoredValue != null) {
    return (layoutStore.isSidebarAnchored = sidebarAnchoredValue)
  }
  return (isSidebarAnchored.value = layoutStore.isSidebarAnchored)
})

const toggleSideBar = () => {
  layoutStore.toggleAnchoredSideBar()
  if (!isSidebarAnchored.value) {
    isExpanded.value = false
  }
}

const handleMouseOver = () => {
  if (!isSidebarAnchored.value) {
    isExpanded.value = true
  }
}

const handleMouseLeave = () => {
  if (!isSidebarAnchored.value) {
    isExpanded.value = false
  }
}
</script>

<style scoped></style>

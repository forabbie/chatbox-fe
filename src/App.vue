<template>
  <component :is="layout"></component>
  <LogoutDialog />
</template>

<script setup>
import { computed } from 'vue'

import appLayout from '@/layouts/AppLayout.vue'
import authLayout from '@/layouts/AuthLayout.vue'

import { useLayoutStore } from '@/stores/layout.store'
import LogoutDialog from './components/auth/LogoutDialog.vue'

const layoutStore = useLayoutStore()

const layout = computed(() => {
  return layoutStore.getLayout === 'auth' ? authLayout : appLayout
})
</script>

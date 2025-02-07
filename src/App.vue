<template>
  <component :is="layout"></component>
</template>

<script setup>
import { computed } from 'vue'

import appLayout from '@/components/layout/AppLayout.vue'
import authLayout from '@/components/layout/AuthLayout.vue'

import { useLayoutStore } from '@/stores/layout.store'

const layoutStore = useLayoutStore()

const layout = computed(() => {
  return layoutStore.getLayout === 'auth' ? authLayout : appLayout
})
</script>

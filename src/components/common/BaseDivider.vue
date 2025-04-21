<template>
  <Divider :layout="layout" :type="type" :align="align">
    <slot></slot>
  </Divider>
</template>

<script setup>
import Divider from 'primevue/divider'

defineProps({
  layout: {
    type: String,
    default: 'horizontal',
    validator: (value) => {
      return ['horizontal', 'vertical'].includes(value)
    }
  },
  type: {
    type: String,
    default: 'solid',
    validator: (value) => {
      return ['solid', 'dotted', 'dashed'].includes(value)
    }
  },
  align: {
    type: String,
    default: 'left',
    validator: (value) => {
      return ['left', 'center', 'right'].includes(value)
    }
  }
})
</script>

<style scoped>
.p-divider {
  @apply m-0 p-0 before:border-fuchsia-50;
}
</style>

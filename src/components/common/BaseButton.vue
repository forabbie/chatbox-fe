<template>
  <Button :class="buttonClasses" :disabled="disabled || inactive" unstyled>
    <slot></slot>
    <span v-if="loading" class="pi pi-spin pi-spinner"></span>
  </Button>
</template>

<script setup>
import { computed } from 'vue'
import Button from 'primevue/button'

const props = defineProps({
  variant: {
    type: String,
    default: 'positive'
  },
  disabled: {
    type: Boolean,
    default: false
  },
  loading: {
    type: Boolean,
    default: false
  },
  inactive: {
    type: Boolean,
    default: false
  }
})

const buttonClasses = computed(() => {
  return {
    btn: true,
    'btn--positive': props.variant === 'primary',
    'btn--negative': props.variant === 'negative',
    'btn--neutral': props.variant === 'neutral',
    'btn--inactive': props.inactive,
    'btn--disabled': props.disabled || props.inactive
  }
})
</script>

<style scoped lang="scss">
.btn {
  @apply rounded px-4 py-2 text-xs font-semibold transition-colors;

  &--positive {
    @apply bg-primary text-white hover:bg-primary-dark;

    &.btn--inactive,
    &.btn--disabled {
      @apply bg-primary;
    }
  }

  &--negative {
    @apply bg-gray-500 text-white hover:bg-gray-600;

    &.btn--inactive,
    &.btn--disabled {
      @apply bg-gray-300 hover:bg-gray-300;
    }
  }

  &--neutral {
    @apply bg-red-500 text-white hover:bg-red-600;

    &.btn--inactive,
    &.btn--disabled {
      @apply bg-red-300 hover:bg-red-300;
    }
  }

  &--disabled {
    @apply cursor-not-allowed opacity-50;
  }
}
</style>

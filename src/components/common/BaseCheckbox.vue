<template>
  <div class="flex items-center gap-2">
    <Checkbox
      :inputId="name"
      :name="name"
      :modelValue="value"
      :binary="binary"
      :size="size"
      :pt="checkPt"
      @change="handleChange"
    />
    <label :for="name">{{ label }}</label>
  </div>
</template>

<script setup>
import { useField } from 'vee-validate'

import Checkbox from 'primevue/checkbox'

// Props
const props = defineProps({
  name: {
    type: String,
    required: true
  },
  label: {
    type: String,
    default: ''
  },
  modelValue: {
    type: Boolean,
    default: false
  },
  binary: {
    type: Boolean,
    default: false
  },
  size: {
    type: String,
    default: 'small',
    validator: (value) => ['small', 'large'].includes(value)
  }
})
const { value, handleChange } = useField(props.name, undefined, {
  syncVModel: true
})

// Emit for v-model
defineEmits(['update:modelValue'])

const checkPt = {
  box: ({ props, context }) => ({
    class: [
      {
        '!border-slate-600 hover:!border-primary': !context.checked && !props.invalid,
        '!border-primary !bg-transparent': context.checked
      }
    ]
  }),
  icon: ({ context }) => ({
    class: [
      {
        '!text-primary': context.checked
      }
    ]
  })
}
</script>

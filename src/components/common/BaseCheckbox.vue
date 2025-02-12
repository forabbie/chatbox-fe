<template>
  <vee-field :name="name" v-slot="{ field, meta, errors }" :bails="false">
    <div class="flex items-center gap-2">
      <Checkbox
        :inputId="name"
        :name="name"
        :modelValue="value"
        :binary="binary"
        :size="size"
        :pt="checkPt"
        @update:modelValue="handleInput"
      />
      <label :for="name">{{ label }}</label>
    </div>
    <div v-if="submitted && errors.length" class="error-messages">
      <div v-for="(error, index) in errors" :key="index" class="error-message">
        {{ error }}
      </div>
    </div>
  </vee-field>
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
  },
  disabled: {
    type: Boolean,
    default: false
  },
  submitted: {
    type: Boolean,
    default: false
  }
})
const { value, handleChange } = useField(props.name, undefined, {
  syncVModel: true
})

// Emit for v-model
const emit = defineEmits(['update:modelValue'])
const handleInput = (event) => {
  handleChange(event)
  emit('update:modelValue', event)
}

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

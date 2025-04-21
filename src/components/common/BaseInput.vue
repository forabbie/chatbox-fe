<template>
  <div class="input-container">
    <label v-if="label" :for="name">{{ label }}</label>
    <vee-field :name="name" v-slot="{ field, errors }" :bails="false">
      <IconField>
        <slot name="before"></slot>
        <InputText
          v-bind="field"
          :id="name"
          :type="computedType"
          :modelValue="modelValue"
          :placeholder="placeholder"
          :disabled="disabled"
          :pt="customPt"
          :class="{
            'p-inputtext': true,
            'p-inputtext--invalid': isSubmitted && errors.length
          }"
          @update:modelValue="handleInput"
          size="small"
        />
        <slot name="after">
          <InputIcon
            v-if="type === 'password'"
            :class="['pi', isPasswordVisible ? 'pi-eye-slash' : 'pi-eye', 'cursor-pointer']"
            @click="togglePasswordVisibility"
          />
        </slot>
      </IconField>
      <div v-if="isSubmitted && errors.length" class="error-messages">
        <div v-for="(error, index) in errors" :key="index" class="error-message">
          {{ error }}
        </div>
      </div>
    </vee-field>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useField } from 'vee-validate'

import IconField from 'primevue/iconfield'
import InputIcon from 'primevue/inputicon'
import InputText from 'primevue/inputtext'

const props = defineProps({
  label: String,
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    default: 'text'
  },
  modelValue: [String, Number],
  placeholder: String,
  disabled: Boolean,
  isSubmitted: Boolean
})

const customPt = {
  class: [
    // Custom classes for InputText
  ]
}

// Use VeeValidate's `useField` to handle validation
// eslint-disable-next-line no-unused-vars
const { value, errorMessage, handleChange } = useField(props.name, undefined, {
  syncVModel: true
})

// Emit the input value to the parent component
const emit = defineEmits(['update:modelValue'])
const handleInput = (event) => {
  handleChange(event)
  emit('update:modelValue', event)
}

// Password Visibility Toggle
const isPasswordVisible = ref(false)
const computedType = computed(() =>
  props.type === 'password' ? (isPasswordVisible.value ? 'text' : 'password') : props.type
)

const togglePasswordVisibility = () => {
  isPasswordVisible.value = !isPasswordVisible.value
}
</script>

<style scoped lang="scss">
.input-container {
  @apply mb-5;

  label {
    @apply mb-2 block font-medium text-gray-700;
  }

  .p-inputtext {
    @apply mb-1 w-full rounded-md border transition-colors duration-200;

    &:hover {
      @apply border-primary;
    }

    &:focus {
      @apply border-primary outline-none ring-2 ring-primary;
    }

    &--invalid {
      @apply border-red-500;
    }
  }
}
</style>

<template>
  <div class="input-container">
    <label v-if="label" :for="name">{{ label }}</label>
    <vee-field :name="name" v-slot="{ field, errors }" :bails="false">
      <IconField>
        <slot name="before"></slot>
        <InputText
          :id="name"
          :type="computedType"
          :modelValue="modelValue"
          :placeholder="placeholder"
          :disabled="disabled"
          :class="inputClasses"
          @update:modelValue="handleInput"
          v-bind="field"
        />
        <slot name="after">
          <InputIcon
            v-if="type === 'password'"
            :class="['pi', isPasswordVisible ? 'pi-eye-slash' : 'pi-eye', 'cursor-pointer']"
            @click="togglePasswordVisibility"
          />
        </slot>
      </IconField>
      <!-- <ErrorMessage class="p-error" :name="name" /> -->
      <div v-if="submitted && errors && errors.length" class="text-red-600">
        <div v-for="(error, index) in errors" :key="index">
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
  errors: Array,
  placeholder: String,
  disabled: Boolean,
  submitted: Boolean
})

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

const inputClasses = computed(() => ({
  inp: true,
  'inp--invalid': errorMessage.value
}))

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
    @apply mb-2 block;
  }

  .inp {
    @apply mb-1 w-full hover:border-primary focus:border-primary focus:outline-none focus:ring-primary;

    &--invalid {
      @apply border-red-500;
    }
  }

  .p-error {
    @apply text-red-600;
  }
}
</style>

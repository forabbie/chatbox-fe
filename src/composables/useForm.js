import { ref } from 'vue'

export function useForm(initialValues) {
  const form = ref({ ...initialValues })

  const resetForm = () => {
    form.value = { ...initialValues }
  }

  return { form, resetForm }
}

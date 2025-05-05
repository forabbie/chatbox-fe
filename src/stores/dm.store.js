import { defineStore } from 'pinia'
import { ref } from 'vue'
import { listDirectMessageService } from '@/services/dm.service'

export const useDmStore = defineStore('dms', () => {
  const dms = ref([])
  const activeDm = ref({})

  const setDms = async () => {
    const data = await listDirectMessageService()
    dms.value = data.response
  }

  const setActiveDm = async (dm) => {
    activeDm.value = dm
  }

  return {
    dms,
    setDms,
    activeDm,
    setActiveDm
  }
})

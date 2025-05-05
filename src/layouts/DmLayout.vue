<template>
  <router-view />
</template>

<script setup>
import { onMounted } from 'vue'
import { useDmStore } from '@/stores/dm.store'
import { useMessageStore } from '@/stores/message.store'
import { useUserStore } from '@/stores/user.store'

import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()
const dmStore = useDmStore()
const userStore = useUserStore()
const messageStore = useMessageStore()

onMounted(async () => {
  try {
    if (!dmStore.dms?.length) {
      await dmStore.setDms()
    }

    const dmId = route.params.id

    await validateAndRedirect(dmId)

    if (dmId) {
      await loadDmDetails(dmId)
    }
  } catch (error) {
    console.error('Error initializing dms:', error)
    router.replace({ name: 'no-dms' })
  }
})

const validateAndRedirect = async (dmId) => {
  const dms = dmStore.dms || []
  const validIds = dms.map((d) => String(d.id))
  const idToCheck = String(dmId || '')

  // If ID is missing or invalid
  if (!idToCheck || !validIds.includes(idToCheck)) {
    if (route.name === 'new-dm') return loadUsers()
    const firstDm = dms[0]
    router.replace(firstDm ? { name: 'dm', params: { id: firstDm.id } } : { name: 'no-dms' })
  }
}

const loadDmDetails = async (dmId) => {
  const dms = dmStore.dms || []
  const dm = dms.find((c) => String(c.id) === String(dmId))

  const messagesquery = {
    receiver_id: dm.receiver_id,
    receiver_class: 'user',
    sort: 'sent_at,asc',
    page: 1,
    limit: 50
  }

  if (!dm) {
    console.error('DM not found:', dmId)
    return
  }

  try {
    await Promise.all([
      loadUsers(),
      userStore.setUser(dm.receiver_id),
      messageStore.setMessages(messagesquery)
    ])
  } catch (error) {
    console.error('Error loading DM details:', error)
  }
}

const loadUsers = async () => {
  try {
    await userStore.setUsers()
  } catch (error) {
    console.error('Error loading user details:', error)
  }
}
</script>

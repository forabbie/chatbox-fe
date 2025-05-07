<template>
  <div class="grid h-full w-full grid-cols-12 text-white/80">
    <aside class="col-span-4 overflow-hidden rounded-tl-lg bg-gray-950">
      <ChannelList @open-dialog="openNew" class="border-r border-fuchsia-900 bg-fuchsia-950/50" />
    </aside>
    <main class="col-span-8 overflow-hidden">
      <ChannelMessages />
    </main>
  </div>
  <ChannelForm ref="channelFormRef" />
</template>

<script setup>
import ChannelList from '@/components/channels/ChannelList.vue'
import ChannelMessages from '@/components/channels/ChannelMessages.vue'
import ChannelForm from '@/components/channels/ChannelForm.vue'

import { ref } from 'vue'

const channelFormRef = ref(null)
const openNew = async () => {
  if (channelFormRef.value) {
    channelFormRef.value.triggerClick()
  }
}
</script>

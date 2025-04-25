<template>
  <div class="grid h-full w-full grid-cols-12 gap-4 text-white">
    <aside class="col-span-4 bg-fuchsia-950/60">
      <ChannelList @open-dialog="openNew" />
    </aside>
    <main class="col-span-6">
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

<template>
  <div class="grid h-full w-full grid-cols-12 gap-4 text-white">
    <div class="col-span-4 bg-fuchsia-950/60">
      <ChannelList />
    </div>
    <div class="col-span-6"></div>
  </div>
</template>

<script setup>
import ChannelList from '@/components/channels/List.vue'
</script>

<template>
  <div class="grid h-full w-full grid-cols-12 gap-4 text-white">
    <div class="col-span-4 bg-fuchsia-950/60">
      <MessageList />
    </div>
    <div class="col-span-6"></div>
  </div>
</template>

<script setup>
import MessageList from '@/components/messages/List.vue'
</script>

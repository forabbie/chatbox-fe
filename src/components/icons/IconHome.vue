<template>
  <!-- solid svg -->
  <svg v-if="active" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" fill="currentColor">
    <!-- !Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. -->
    <path
      d="M575.8 255.5c0 18-15 32.1-32 32.1l-32 0 .7 160.2c0 2.7-.2 5.4-.5 8.1l0 16.2c0 22.1-17.9 40-40 40l-16 0c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1L416 512l-24 0c-22.1 0-40-17.9-40-40l0-24 0-64c0-17.7-14.3-32-32-32l-64 0c-17.7 0-32 14.3-32 32l0 64 0 24c0 22.1-17.9 40-40 40l-24 0-31.9 0c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2l-16 0c-22.1 0-40-17.9-40-40l0-112c0-.9 0-1.9 .1-2.8l0-69.7-32 0c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z"
    />
  </svg>
  <!-- outline svg -->
  <svg
    v-else
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    class="scale-125"
  >
    <g id="home">
      <path
        d="M20,11.75a.74.74,0,0,1-.45-.15L12,5.94,4.45,11.6a.75.75,0,0,1-.9-1.2l8-6a.75.75,0,0,1,.9,0l8,6a.75.75,0,0,1,.15,1A.74.74,0,0,1,20,11.75Z"
      />
      <path
        d="M18,19.75H6A.76.76,0,0,1,5.25,19V9.5a.75.75,0,0,1,1.5,0v8.75h10.5V9.5a.75.75,0,0,1,1.5,0V19A.76.76,0,0,1,18,19.75Z"
      />
      <path
        d="M14,19.75a.76.76,0,0,1-.75-.75V12.75h-2.5V19a.75.75,0,0,1-1.5,0V12a.76.76,0,0,1,.75-.75h4a.76.76,0,0,1,.75.75v7A.76.76,0,0,1,14,19.75Z"
      />
    </g>
  </svg>
</template>

<script setup>
defineProps({
  active: {
    type: Boolean,
    default: false
  }
})
</script>

<template>
  <section class="flex h-screen flex-col">
    <main class="flex-grow">
      <router-view :key="$route.path"></router-view>
    </main>
  </section>
</template>

<script setup lang="ts">
import TheHeader from './TheHeader.vue'
</script>

<template>
  <div class="min-h-screen bg-fixed bg-fill">
    <TheHeader />
    <div class="max-w-7xl mx-auto px-6 py-8 min-h-[calc(100vh-4rem)]">
      <slot />
    </div>
  </div>
</template>

<style>
/* Ensure the background extends */
html,
body {
  min-height: 100vh;
  @apply bg-fill;
}
</style>

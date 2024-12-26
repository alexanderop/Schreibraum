<script setup lang="ts">
import TheLayout from '@/components/TheLayout.vue'
import { useDark } from '@vueuse/core'

// Force dark mode since this is a dark-only design
useDark({
  initialValue: 'dark',
  disableTransition: false,
})
</script>

<template>
  <TheLayout>
    <router-view />
  </TheLayout>
</template>

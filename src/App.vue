<script setup lang="ts">
import CommandPalette from '@/components/CommandPalette.vue'
import TheEditor from '@/components/TheEditor.vue'
import TheHeader from '@/components/TheHeader.vue'
import { useDark } from '@vueuse/core'

// Force dark mode since this is a dark-only design
useDark({
  initialValue: 'dark',
  disableTransition: false,
})
</script>

<template>
  <div class="min-h-screen bg-[#0a0a0a]">
    <TheHeader />
    <TheEditor />
    <CommandPalette />
  </div>
</template>

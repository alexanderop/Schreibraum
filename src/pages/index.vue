<script setup lang="ts">
import CommandPalette from '@/components/CommandPalette.vue'
import MarkdownEditor from '@/components/MarkdownEditor.vue'
import MarkdownPreview from '@/components/MarkdownPreview.vue'
</script>

<template>
  <div class="grid grid-cols-2 gap-4 h-full">
    <MarkdownEditor />
    <MarkdownPreview />
    <CommandPalette />
  </div>
</template>

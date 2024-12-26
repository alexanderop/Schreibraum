<script setup lang="ts">
import MarkdownEditor from '@/components/MarkdownEditor.vue'
import MarkdownPreview from '@/components/MarkdownPreview.vue'
</script>

<template>
  <div class="grid grid-cols-2 gap-4 h-full">
    <MarkdownEditor />
    <MarkdownPreview />
  </div>
</template>

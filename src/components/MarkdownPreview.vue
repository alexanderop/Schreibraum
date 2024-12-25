<script setup lang="ts">
import { useEditorStore } from '@/stores/editor'
import { marked } from 'marked'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'

const store = useEditorStore()
const { content } = storeToRefs(store)

const htmlContent = computed(() => {
  return content.value ? marked(content.value) : ''
})
</script>

<template>
  <div
    data-testid="preview-panel"
    class="prose prose-invert max-w-none"
    v-html="htmlContent"
  />
</template>

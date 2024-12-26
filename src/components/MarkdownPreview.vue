<script setup lang="ts">
import { useEditorStore } from '@/stores/editor'
import Shiki from '@shikijs/markdown-it'
import MarkdownIt from 'markdown-it'
import { storeToRefs } from 'pinia'
import { computed, onMounted, ref } from 'vue'

const store = useEditorStore()
const { content } = storeToRefs(store)
const md = ref<MarkdownIt>()

onMounted(async () => {
  const markdownIt = MarkdownIt({
    html: true,
    linkify: true,
  })

  markdownIt.renderer.rules.link_open = (tokens, idx, options, env, self) => {
    const token = tokens[idx]
    token.attrPush(['target', '_blank'])
    token.attrPush(['rel', 'noopener noreferrer'])
    return self.renderToken(tokens, idx, options)
  }

  await markdownIt.use(await Shiki({
    theme: 'vitesse-dark',
  }))
  md.value = markdownIt
})

const htmlContent = computed(() => {
  if (!md.value || !content.value)
    return ''
  return md.value.render(content.value)
})
</script>

<template>
  <div
    data-testid="preview-panel"
    class="prose mx-auto mt-8 max-w-5xl text-text-base"
    v-html="htmlContent"
  />
</template>

<style>
/* Base prose styles */
:deep(.prose) {
  @apply max-w-none;
}

/* Headings */
:deep(.prose h1),
:deep(.prose h2),
:deep(.prose h3),
:deep(.prose h4),
:deep(.prose h5),
:deep(.prose h6) {
  @apply text-accent font-bold mb-6;
}

:deep(.prose h1) {
  @apply text-4xl;
}

:deep(.prose h2) {
  @apply text-2xl;
}

:deep(.prose h3) {
  @apply text-xl;
}

/* Links */
:deep(.prose a) {
  @apply text-accent hover:opacity-75;
}

/* Code blocks */
:deep(.prose pre) {
  @apply bg-card-translucent rounded-xl border border-border-translucent shadow-2xl shadow-fill/25 p-6;
}

:deep(.prose code) {
  @apply bg-card-translucent text-text-base rounded px-1;
}

/* Tables */
:deep(.prose table) {
  @apply w-full border-collapse my-4 bg-card;
}

:deep(.prose th) {
  @apply bg-card-muted text-text-base font-bold p-2 text-left border border-border;
}

:deep(.prose td) {
  @apply p-2 border border-border text-text-base;
}

:deep(.prose tr) {
  @apply bg-card hover:bg-accent hover:bg-opacity-10;
}

/* Lists */
:deep(.prose ul),
:deep(.prose ol) {
  @apply my-6;
}

:deep(.prose li) {
  @apply my-2;
}

/* Blockquotes */
:deep(.prose blockquote) {
  @apply border-l-4 border-border pl-4 italic text-text-muted;
}

/* Horizontal rules */
:deep(.prose hr) {
  @apply border-border border-opacity-20 my-8;
}

/* Custom table styles */
:deep(.custom-table) {
  @apply w-full border-collapse my-4 bg-card;
}

:deep(.custom-table th) {
  @apply bg-card-muted text-text-base font-bold p-2 text-left border border-border;
}

:deep(.custom-table td) {
  @apply p-2 border border-border text-text-base;
}

:deep(.custom-table tr) {
  @apply bg-card hover:bg-accent hover:bg-opacity-10;
}
</style>

<script setup lang="ts">
import { useEditorStore } from '@/stores/editor'
import { storeToRefs } from 'pinia'

const store = useEditorStore()
const { content } = storeToRefs(store)

function handleInput(e: Event) {
  const target = e.target as HTMLTextAreaElement
  store.updateContent(target.value)
}
</script>

<template>
  <textarea
    v-model="content"
    role="textbox"
    class="w-full h-[calc(100vh-12rem)] bg-transparent text-white font-mono text-sm resize-none focus:outline-none p-0"
    placeholder="Start writing in markdown..."
    @input="handleInput"
  />
</template>

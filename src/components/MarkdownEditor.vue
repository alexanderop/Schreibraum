<script setup lang="ts">
import { useEditorNavigation } from '@/composables/useEditorNavigation'
import { useEditorStore } from '@/stores/editor'
import { storeToRefs } from 'pinia'
import { onMounted, ref } from 'vue'

const store = useEditorStore()
const { content, isEditorVisible } = storeToRefs(store)
const isFocused = ref(false)
const textareaRef = ref<HTMLTextAreaElement | null>(null)

onMounted(() => {
  if (textareaRef.value) {
    useEditorNavigation(textareaRef.value)
  }
})

function handleInput(e: Event) {
  const target = e.target as HTMLTextAreaElement
  store.updateContent(target.value)
  // Adjust textarea height to content
  target.style.height = 'auto'
  target.style.height = `${target.scrollHeight}px`
}

function handleFocus() {
  isFocused.value = true
}

function handleBlur() {
  isFocused.value = false
}

defineExpose({
  focus: () => textareaRef.value?.focus(),
})
</script>

<template>
  <div
    v-show="isEditorVisible"
    class="p-4"
    :class="{
      'ring-1 ring-accent rounded': isFocused,
    }"
  >
    <textarea
      ref="textareaRef"
      v-model="content"
      role="textbox"
      class="w-full min-h-[200px] bg-transparent font-mono text-sm resize-y focus:outline-none text-text-base"
      placeholder="Start writing in markdown..."
      @input="handleInput"
      @focus="handleFocus"
      @blur="handleBlur"
    />
  </div>
</template>

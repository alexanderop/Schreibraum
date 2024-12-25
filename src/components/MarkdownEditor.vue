<script setup lang="ts">
import { useEditorStore } from "@/stores/editor";
import { storeToRefs } from "pinia";
import { ref } from "vue";

const store = useEditorStore();
const { content } = storeToRefs(store);
const isFocused = ref(false);
const textareaRef = ref<HTMLTextAreaElement | null>(null);

function handleInput(e: Event) {
  const target = e.target as HTMLTextAreaElement;
  store.updateContent(target.value);
}

function handleFocus() {
  isFocused.value = true;
}

function handleBlur() {
  isFocused.value = false;
}

defineExpose({
  focus: () => textareaRef.value?.focus(),
});
</script>

<template>
  <div
    class="h-full p-4"
    :class="{
      'ring-1 ring-purple-400 rounded': isFocused,
    }"
  >
    <textarea
      ref="textareaRef"
      v-model="content"
      role="textbox"
      class="w-full h-full bg-transparent text-white font-mono text-sm resize-none focus:outline-none"
      placeholder="Start writing in markdown..."
      @input="handleInput"
      @focus="handleFocus"
      @blur="handleBlur"
    />
  </div>
</template>

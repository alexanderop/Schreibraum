<script setup lang="ts">
import { useEditorStore } from "@/stores/editor";
import { storeToRefs } from "pinia";
import { nextTick, ref, watch } from "vue";
import { RouterView } from "vue-router";

const store = useEditorStore();
const { isPreviewVisible, isEditorVisible } = storeToRefs(store);
const markdownRef = ref<HTMLElement | null>(null);

watch(isEditorVisible, (visible) => {
  if (visible) {
    // Use nextTick to ensure the component is mounted
    nextTick(() => {
      const textarea = markdownRef.value?.querySelector("textarea");
      textarea?.focus();
    });
  }
});
</script>

<template>
  <main class="py-5">
    <div
      class="grid gap-6 h-[calc(100vh-theme(spacing.14)-theme(spacing.10))]"
      :class="{
        'grid-cols-2': isPreviewVisible && isEditorVisible,
        'grid-cols-1': !isPreviewVisible || !isEditorVisible,
      }"
    >
      <!-- Markdown Section -->
      <div v-if="isEditorVisible" class="h-full">
        <h3 class="text-purple-400 text-xs font-medium mb-2">MARKDOWN</h3>
        <div
          ref="markdownRef"
          class="bg-[#141414] rounded h-[calc(100%-theme(spacing.6))]"
        >
          <RouterView name="markdown" />
        </div>
      </div>

      <!-- Preview Section -->
      <div v-if="isPreviewVisible" class="h-full">
        <h3 class="text-purple-400 text-xs font-medium mb-2">PREVIEW</h3>
        <div class="bg-[#141414] rounded p-4 h-[calc(100%-theme(spacing.6))]">
          <RouterView name="preview" />
        </div>
      </div>
    </div>
  </main>
</template>

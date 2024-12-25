<script setup lang="ts">
import { useEditorStore } from '@/stores/editor'
import { storeToRefs } from 'pinia'
import { RouterView } from 'vue-router'

const store = useEditorStore()
const { isPreviewVisible } = storeToRefs(store)
</script>

<template>
  <main class="container mx-auto px-6 py-5">
    <div
      class="grid gap-6"
      :class="{ 'grid-cols-2': isPreviewVisible, 'grid-cols-1': !isPreviewVisible }"
    >
      <!-- Markdown Section -->
      <div>
        <h3 class="text-purple-400 text-xs font-medium mb-2">
          MARKDOWN
        </h3>
        <div class="bg-[#141414] rounded p-4 min-h-[580px]">
          <RouterView name="markdown" />
        </div>
      </div>

      <!-- Preview Section -->
      <div v-if="isPreviewVisible">
        <h3 class="text-purple-400 text-xs font-medium mb-2">
          PREVIEW
        </h3>
        <div class="bg-[#141414] rounded p-4 min-h-[580px]">
          <RouterView name="preview" />
        </div>
      </div>
    </div>
  </main>
</template> 
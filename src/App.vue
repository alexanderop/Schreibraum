<script setup lang="ts">
import CommandPalette from '@/components/CommandPalette.vue'
import { useEditorStore } from '@/stores/editor'
import { useDark } from '@vueuse/core'
import { storeToRefs } from 'pinia'
import { RouterView } from 'vue-router'

// Force dark mode since this is a dark-only design
useDark({
  initialValue: 'dark',
  disableTransition: false,
})

const store = useEditorStore()
const { isPreviewVisible } = storeToRefs(store)
</script>

<template>
  <div class="min-h-screen bg-[#0a0a0a]">
    <!-- Header -->
    <header class="bg-[#141414]">
      <div class="max-w-7xl mx-auto px-6">
        <div class="flex items-center justify-between h-14">
          <!-- Logo Section -->
          <div class="flex items-center gap-3">
            <div class="h-6 w-6 rounded-full bg-purple-500" />
            <div class="flex items-center">
              <span class="text-white font-semibold">Minimal</span>
              <span class="text-purple-400 font-semibold">Blog</span>
            </div>
          </div>

          <!-- Actions -->
          <div class="flex items-center gap-4">
            <div class="bg-purple-500/10 px-4 py-1.5 rounded-full">
              <span class="text-purple-400 text-sm">Saved ✓</span>
            </div>
            <button class="w-8 h-8 rounded-full bg-[#1d1d1d] text-white flex items-center justify-center">
              ?
            </button>
          </div>
        </div>
      </div>
    </header>

    <!-- Main Content -->
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

    <CommandPalette />
  </div>
</template>

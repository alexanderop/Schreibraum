<script setup lang="ts">
import { useEditorStore } from '@/stores/editor'
import { storeToRefs } from 'pinia'
import { nextTick, ref, watch } from 'vue'
import { RouterView } from 'vue-router'

const store = useEditorStore()
const { isPreviewVisible, isEditorVisible } = storeToRefs(store)
const markdownRef = ref<HTMLElement | null>(null)

watch(isEditorVisible, (visible) => {
  if (visible) {
    // Use nextTick to ensure the component is mounted
    nextTick(() => {
      const textarea = markdownRef.value?.querySelector('textarea')
      textarea?.focus()
    })
  }
})
</script>

<template>
  <main class="py-6">
    <div
      class="grid gap-8 transition-all duration-300"
      :class="{
        'grid-cols-2': isPreviewVisible && isEditorVisible,
        'grid-cols-1': !isPreviewVisible || !isEditorVisible,
      }"
    >
      <!-- Markdown Section -->
      <div
        v-show="isEditorVisible"
        class="transition-opacity duration-300"
        :class="{ 'opacity-0': !isEditorVisible }"
      >
        <div class="flex items-center gap-2 mb-3 sticky top-0 pt-2 pb-4 z-10 bg-gradient-to-b from-fill to-transparent">
          <h3 class="text-xs font-medium uppercase tracking-wider text-accent">
            Markdown
          </h3>
          <div class="h-px flex-1 bg-border-translucent" />
        </div>
        <div
          ref="markdownRef"
          class="backdrop-blur-sm rounded-xl border border-border-translucent bg-card-translucent shadow-2xl shadow-fill/25"
        >
          <RouterView v-slot="{ Component }" name="markdown">
            <keep-alive>
              <component :is="Component" />
            </keep-alive>
          </RouterView>
        </div>
      </div>

      <!-- Preview Section -->
      <div
        v-show="isPreviewVisible"
        class="transition-opacity duration-300"
        :class="{ 'opacity-0': !isPreviewVisible }"
      >
        <div class="flex items-center gap-2 mb-3 sticky top-0 pt-2 pb-4 z-10 bg-gradient-to-b from-fill to-transparent">
          <h3 class="text-xs font-medium uppercase tracking-wider text-accent">
            Preview
          </h3>
          <div class="h-px flex-1 bg-border-translucent" />
        </div>
        <div
          class="backdrop-blur-sm rounded-xl border border-border-translucent bg-card-translucent p-6 shadow-2xl shadow-fill/25 overflow-auto"
        >
          <RouterView v-slot="{ Component }" name="preview">
            <keep-alive>
              <component :is="Component" />
            </keep-alive>
          </RouterView>
        </div>
      </div>
    </div>
  </main>
</template>

import type { Ref } from 'vue'
import { useLocalStorage } from '@vueuse/core'
import { defineStore } from 'pinia'

interface StorageAdapter<T> {
  get: () => Ref<T>
}

class LocalStorageAdapter<T> implements StorageAdapter<T> {
  constructor(
    private key: string,
    private defaultValue: T,
  ) {}

  get(): Ref<T> {
    return useLocalStorage(this.key, this.defaultValue)
  }
}

interface EditorState {
  content: string
  isPreviewVisible: boolean
  isEditorVisible: boolean
  isWordWrapEnabled: boolean
}

function createStorage<T>(key: string, defaultValue: T): StorageAdapter<T> {
  return new LocalStorageAdapter(key, defaultValue)
}

export const useEditorStore = defineStore('editor', () => {
  const content = createStorage('editor-content', '').get()
  const isPreviewVisible = createStorage('editor-preview-visible', true).get()
  const isEditorVisible = createStorage('editor-editor-visible', true).get()
  const isWordWrapEnabled = createStorage('editor-word-wrap', false).get()

  function updateContent(newContent: string) {
    content.value = newContent
  }

  function togglePreview() {
    isPreviewVisible.value = !isPreviewVisible.value
  }

  function toggleEditor() {
    isEditorVisible.value = !isEditorVisible.value
  }

  function toggleWordWrap() {
    isWordWrapEnabled.value = !isWordWrapEnabled.value
  }

  return {
    content,
    isPreviewVisible,
    isEditorVisible,
    isWordWrapEnabled,
    updateContent,
    togglePreview,
    toggleEditor,
    toggleWordWrap,
  }
})

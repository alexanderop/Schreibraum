import { defineStore } from "pinia";
import { ref } from "vue";

export const useEditorStore = defineStore("editor", () => {
  const content = ref("");
  const isPreviewVisible = ref(true);
  const isEditorVisible = ref(true);
  const isWordWrapEnabled = ref(false);

  function updateContent(newContent: string) {
    content.value = newContent;
  }

  function togglePreview() {
    isPreviewVisible.value = !isPreviewVisible.value;
  }

  function toggleEditor() {
    isEditorVisible.value = !isEditorVisible.value;
  }

  function toggleWordWrap() {
    isWordWrapEnabled.value = !isWordWrapEnabled.value;
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
  };
});

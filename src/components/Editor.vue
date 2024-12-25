<script setup lang="ts">
import { useEditorStore } from '@/stores/editor'
import { watch } from 'vue'

const store = useEditorStore()

// If using Monaco, you can watch the word wrap setting
watch(() => store.isWordWrapEnabled, (newValue) => {
  // Update Monaco editor settings
  if (editor) {
    editor.updateOptions({
      wordWrap: newValue ? 'on' : 'off',
    })
  }
})
</script>

import App from '@/App.vue'
import MarkdownEditor from '@/components/MarkdownEditor.vue'
import MarkdownPreview from '@/components/MarkdownPreview.vue'
import { useEditorStore } from '@/stores/editor'
import userEvent from '@testing-library/user-event'
import { render, screen, waitFor } from '@testing-library/vue'
import { createPinia, setActivePinia } from 'pinia'
import { createRouter, createWebHistory } from 'vue-router'

export class MarkdownPreviewTest {
  private user = userEvent.setup()
  private pinia: ReturnType<typeof createPinia>
  private store: ReturnType<typeof useEditorStore>

  constructor() {
    // Create and activate pinia first
    this.pinia = createPinia()
    setActivePinia(this.pinia)

    const router = createRouter({
      history: createWebHistory(),
      routes: [
        {
          path: '/',
          components: {
            markdown: MarkdownEditor,
            preview: MarkdownPreview,
          },
        },
      ],
    })

    render(App, {
      global: {
        plugins: [router, this.pinia],
      },
    })

    // Initialize store after pinia is set up
    this.store = useEditorStore()

    // Navigate to the route to ensure components are mounted
    router.push('/')
  }

  async typeInEditor(text: string) {
    // Wait for router navigation to complete and editor to be mounted
    await waitFor(() => {
      const editor = screen.queryByRole('textbox')
      if (!editor)
        throw new Error('Editor not found')
      return editor
    })

    const editor = screen.getByRole('textbox')
    await this.user.clear(editor)
    if (text.length > 0) {
      // Only type if there's text to type
      await this.user.type(editor, text)
    }
  }

  async clearEditor() {
    await waitFor(() => {
      const editor = screen.queryByRole('textbox')
      if (!editor)
        throw new Error('Editor not found')
      return editor
    })

    const editor = screen.getByRole('textbox')
    await this.user.clear(editor)
  }

  async getPreviewContent() {
    // We need to wait a bit for the preview to update
    await new Promise(resolve => setTimeout(resolve, 100))
    const previewPanel = screen.getByTestId('preview-panel')
    return previewPanel.innerHTML.trim()
  }

  async isEditorVisible() {
    return this.store.isEditorVisible
  }

  async isPreviewVisible() {
    return this.store.isPreviewVisible
  }

  async toggleEditor() {
    this.store.toggleEditor()
    // Wait for the toggle to complete
    await new Promise(resolve => setTimeout(resolve, 0))
  }

  async togglePreview() {
    this.store.togglePreview()
    // Wait for the toggle to complete
    await new Promise(resolve => setTimeout(resolve, 0))
  }
}

import type { Pinia } from 'pinia'
import App from '@/App.vue'
import MarkdownEditor from '@/components/MarkdownEditor.vue'
import MarkdownPreview from '@/components/MarkdownPreview.vue'
import { useEditorStore } from '@/stores/editor'
import userEvent from '@testing-library/user-event'
import { render, screen, waitFor } from '@testing-library/vue'
import { createMemoryHistory, createRouter } from 'vue-router'

export class MarkdownPreviewTest {
  private user = userEvent.setup()
  private store: ReturnType<typeof useEditorStore>
  private router: ReturnType<typeof createRouter>
  private cleanup: () => void

  constructor(pinia: Pinia) {
    this.router = createRouter({
      history: createMemoryHistory(),
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

    const { unmount } = render(App, {
      global: {
        plugins: [
          this.router,
          pinia,
        ],
      },
    })
    this.cleanup = unmount

    // Initialize store after pinia is set up
    this.store = useEditorStore()

    // Navigate to the route to ensure components are mounted
    this.router.push('/')
  }

  destroy() {
    this.cleanup()
  }

  async typeInEditor(text: string) {
    // Wait for router navigation to complete and editor to be mounted
    await waitFor(() => {
      const editor = screen.queryByRole('textbox')
      if (!editor)
        throw new Error('Editor not found')
      return editor
    })

    const editor = screen.getByRole('textbox') as HTMLTextAreaElement
    // Set value directly instead of simulating typing
    await this.user.clear(editor)
    editor.value = text
    // Dispatch input event to trigger reactivity
    editor.dispatchEvent(new Event('input'))
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
    // Remove artificial delay and just wait for the preview to be available
    await waitFor(() => screen.getByTestId('preview-panel'))
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

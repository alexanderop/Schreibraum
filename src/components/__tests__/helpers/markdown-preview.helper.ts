import App from '@/App.vue'
import MarkdownEditor from '@/components/MarkdownEditor.vue'
import MarkdownPreview from '@/components/MarkdownPreview.vue'
import userEvent from '@testing-library/user-event'
import { render, screen } from '@testing-library/vue'
import { createPinia } from 'pinia'
import { createRouter, createWebHistory } from 'vue-router'

export class MarkdownPreviewTest {
  private user = userEvent.setup()

  constructor() {
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

    const pinia = createPinia()
    render(App, {
      global: {
        plugins: [router, pinia],
      },
    })

    // Navigate to the route to ensure components are mounted
    router.push('/')
  }

  async typeInEditor(text: string) {
    // Wait for router navigation to complete
    await new Promise(resolve => setTimeout(resolve, 0))
    const editor = screen.getByRole('textbox')
    await this.user.clear(editor)
    if (text.length > 0) { // Only type if there's text to type
      await this.user.type(editor, text)
    }
  }

  async clearEditor() {
    const editor = screen.getByRole('textbox')
    await this.user.clear(editor)
  }

  async getPreviewContent() {
    // We need to wait a bit for the preview to update
    await new Promise(resolve => setTimeout(resolve, 100))
    const previewPanel = screen.getByTestId('preview-panel')
    return previewPanel.innerHTML.trim()
  }
}

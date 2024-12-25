import App from '@/App.vue'
import userEvent from '@testing-library/user-event'
import { render, screen } from '@testing-library/vue'
import { createPinia } from 'pinia'
import { createRouter, createWebHistory } from 'vue-router'

export class CommandPaletteTest {
  private user = userEvent.setup()
  private container: Element | undefined

  constructor() {
    const router = createRouter({
      history: createWebHistory(),
      routes: [
        {
          path: '/',
          components: {
            markdown: { template: '<div>Markdown View</div>' },
            preview: { template: '<div>Preview View</div>' },
          },
        },
      ],
    })

    const pinia = createPinia()
    const { container } = render(App, {
      global: {
        plugins: [router, pinia],
      },
    })
    this.container = container
  }

  async openCommandPalette() {
    await this.user.keyboard('{Meta>}p{/Meta}')
  }

  async closeCommandPalette() {
    await this.user.keyboard('{Meta>}p{/Meta}')
  }

  async typeInCommandPalette(text: string) {
    const input = screen.getByPlaceholderText('Type > to see available commands...')
    await this.user.type(input, text)
  }

  async pressKey(key: string) {
    await this.user.keyboard(key)
  }

  async clickOutside() {
    if (this.container) {
      await this.user.click(this.container)
    }
  }

  isCommandPaletteVisible() {
    return screen.queryByPlaceholderText('Type > to see available commands...') !== null
  }

  isCommandVisible(commandName: string) {
    return screen.queryByText(commandName) !== null
  }

  getHighlightedCommand() {
    const commands = screen.getAllByRole('option')
    const highlightedCommand = commands.find(command =>
      command.classList.contains('bg-[#2a2a2a]'),
    )
    return highlightedCommand?.querySelector('.text-white')?.textContent || ''
  }

  async pressCommandN() {
    await userEvent.keyboard('{Control>}n{/Control}')
  }
}

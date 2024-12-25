import App from '@/App.vue'
import userEvent from '@testing-library/user-event'
import { render, screen } from '@testing-library/vue'
import { createPinia } from 'pinia'
import { beforeEach, describe, expect, it } from 'vitest'
import { createRouter, createWebHistory } from 'vue-router'
import '@testing-library/jest-dom'

describe('command Palette Features', () => {
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

  const renderApp = () => {
    const pinia = createPinia()
    return render(App, {
      global: {
        plugins: [router, pinia],
      },
    })
  }

  beforeEach(async () => {
    await router.push('/')
  })

  it('should open command palette with Cmd+P', async () => {
    const user = userEvent.setup()
    renderApp()

    // Command palette should not be visible initially
    expect(screen.queryByPlaceholderText('Type > to see available commands...')).not.toBeInTheDocument()

    // Press Cmd+P
    await user.keyboard('{Meta>}p{/Meta}')

    // Command palette should be visible
    expect(screen.getByPlaceholderText('Type > to see available commands...')).toBeInTheDocument()
  })

  it('should close command palette with Cmd+P when open', async () => {
    const user = userEvent.setup()
    renderApp()

    // Open command palette
    await user.keyboard('{Meta>}p{/Meta}')
    expect(screen.getByPlaceholderText('Type > to see available commands...')).toBeInTheDocument()

    // Close command palette with Cmd+P
    await user.keyboard('{Meta>}p{/Meta}')
    expect(screen.queryByPlaceholderText('Type > to see available commands...')).not.toBeInTheDocument()
  })

  it('should show commands when typing ">"', async () => {
    const user = userEvent.setup()
    renderApp()

    // Open command palette
    await user.keyboard('{Meta>}p{/Meta}')
    const input = screen.getByPlaceholderText('Type > to see available commands...')

    // Type ">"
    await user.type(input, '>')

    // Should show commands
    expect(screen.getByText('Toggle Preview')).toBeInTheDocument()
    expect(screen.getByText('Toggle Word Wrap')).toBeInTheDocument()
    expect(screen.getByText('Format Document')).toBeInTheDocument()
  })

  it('should filter commands based on search query', async () => {
    const user = userEvent.setup()
    renderApp()

    // Open command palette and type ">preview"
    await user.keyboard('{Meta>}p{/Meta}')
    const input = screen.getByPlaceholderText('Type > to see available commands...')
    await user.type(input, '>preview')

    // Should only show matching commands
    expect(screen.getByText('Toggle Preview')).toBeInTheDocument()
    expect(screen.queryByText('Format Document')).not.toBeInTheDocument()
  })

  it('should execute command on Enter', async () => {
    const user = userEvent.setup()
    renderApp()

    // Open command palette
    await user.keyboard('{Meta>}p{/Meta}')
    const input = screen.getByPlaceholderText('Type > to see available commands...')

    // Type ">" to show commands
    await user.type(input, '>')

    // Press Enter (first command is Toggle Preview)
    await user.keyboard('{Enter}')

    // Command palette should be closed
    expect(screen.queryByPlaceholderText('Type > to see available commands...')).not.toBeInTheDocument()
  })

  it('should navigate through commands with arrow keys', async () => {
    const user = userEvent.setup()
    renderApp()

    // Open command palette and show commands
    await user.keyboard('{Meta>}p{/Meta}')
    const input = screen.getByPlaceholderText('Type > to see available commands...')
    await user.type(input, '>')

    // First command should be highlighted
    const firstCommand = screen.getByText('Toggle Preview')
    expect(firstCommand.closest('div')).toHaveClass('hover:bg-[#2a2a2a]')

    // Press arrow down
    await user.keyboard('{ArrowDown}')

    // Second command should be highlighted
    const secondCommand = screen.getByText('Toggle Word Wrap')
    expect(secondCommand.closest('div')).toHaveClass('hover:bg-[#2a2a2a]')
  })

  it('should close command palette when clicking outside', async () => {
    const user = userEvent.setup()
    const { container } = renderApp()

    // Open command palette
    await user.keyboard('{Meta>}p{/Meta}')
    expect(screen.getByPlaceholderText('Type > to see available commands...')).toBeInTheDocument()

    // Click outside - using container instead of document.body
    await user.click(container)

    // Command palette should be closed
    expect(screen.queryByPlaceholderText('Type > to see available commands...')).not.toBeInTheDocument()
  })
})

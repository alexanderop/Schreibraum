import type { TestingLibraryMatchers } from '@testing-library/jest-dom/matchers'
import { vi } from 'vitest'
import '@testing-library/jest-dom'

declare module 'vitest' {
  interface Assertion<T = any> extends TestingLibraryMatchers<T, void> {}
  interface AsymmetricMatchersContaining extends TestingLibraryMatchers<any, void> {}
}

// Add any global mocks or setup here
globalThis.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}))

vi.mock('@shikijs/markdown-it', () => ({
  default: () => () => {
    // Simple mock that just returns the code block without highlighting
    return (md: any) => {
      md.renderer.rules.fence = (tokens: any, idx: number) => {
        const token = tokens[idx]
        return `<pre class="shiki vitesse-dark"><code class="language-${token.info}">${token.content}</code></pre>`
      }
    }
  },
}))

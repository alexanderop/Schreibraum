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

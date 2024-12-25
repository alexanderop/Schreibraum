import { beforeEach, describe, expect, it } from 'vitest'
import { MarkdownPreviewTest } from './helpers/markdown-preview.helper'
import '@testing-library/jest-dom'

describe('markdown preview features', () => {
  let markdownPreview: MarkdownPreviewTest

  beforeEach(() => {
    markdownPreview = new MarkdownPreviewTest()
  })

  it('should update preview when typing in editor', async () => {
    await markdownPreview.typeInEditor('# Hello World')
    expect(await markdownPreview.getPreviewContent()).toContain('<h1>Hello World</h1>')

    await markdownPreview.typeInEditor('\n\nThis is a **bold** text')
    expect(await markdownPreview.getPreviewContent()).toContain('<strong>bold</strong>')
  })

  it('should render different markdown elements correctly', async () => {
    const markdownText = `
# Heading 1
## Heading 2

This is a paragraph with *italic* and **bold** text.

- List item 1
- List item 2

1. Numbered item 1
2. Numbered item 2

> This is a blockquote

\`inline code\`

\`\`\`
code block
\`\`\`

[Link](https://example.com)
`
    await markdownPreview.typeInEditor(markdownText)
    const content = await markdownPreview.getPreviewContent()

    expect(content).toContain('<h1>Heading 1</h1>')
    expect(content).toContain('<h2>Heading 2</h2>')
    expect(content).toContain('<em>italic</em>')
    expect(content).toContain('<strong>bold</strong>')
    expect(content).toContain('<ul>')
    expect(content).toContain('<ol>')
    expect(content).toContain('<blockquote>')
    expect(content).toContain('<code>')
    expect(content).toContain('<pre>')
    expect(content).toContain('<a href="https://example.com">')
  })

  it('should update preview in real-time', async () => {
    await markdownPreview.typeInEditor('# ')
    expect(await markdownPreview.getPreviewContent()).toContain('<h1></h1>')

    await markdownPreview.typeInEditor('# H')
    expect(await markdownPreview.getPreviewContent()).toContain('<h1>H</h1>')

    await markdownPreview.typeInEditor('# Hello')
    expect(await markdownPreview.getPreviewContent()).toContain('<h1>Hello</h1>')
  })

  it('should handle empty input', async () => {
    await markdownPreview.typeInEditor(' ')
    await markdownPreview.clearEditor()
    expect(await markdownPreview.getPreviewContent()).toBe('')
  })
})

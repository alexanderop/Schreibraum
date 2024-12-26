import { onUnmounted } from 'vue'

export function useEditorNavigation(editorElement: HTMLTextAreaElement) {
  const handleKeyDown = (event: KeyboardEvent) => {
    // Check if editor is focused
    if (document.activeElement !== editorElement)
      return

    // Check if cmd (Mac) is pressed
    if (!event.metaKey)
      return

    let leftPos: number
    let rightPos: number
    let currentPos: number
    let textBeforeCursor: string
    let lastNewLine: number
    let currentLine: string
    let previousLineEnd: number
    let previousLineLength: number
    let newPosition: number
    let pos: number
    let textBeforeCursorDown: string
    let lastNewLineDown: number
    let currentLineDown: string
    let nextLineStart: number
    let nextLineEnd: number
    let nextLineLength: number
    let newPos: number

    switch (event.key.toLowerCase()) {
      case 'j': {
        event.preventDefault()
        // Move left
        leftPos = Math.max(0, editorElement.selectionStart - 1)
        editorElement.setSelectionRange(leftPos, leftPos)
        break
      }
      case 'l': {
        event.preventDefault()
        // Move right
        rightPos = Math.min(editorElement.value.length, (editorElement.selectionStart || 0) + 1)
        editorElement.setSelectionRange(rightPos, rightPos)
        break
      }
      case 'i': {
        event.preventDefault()
        // Move up
        currentPos = editorElement.selectionStart || 0
        textBeforeCursor = editorElement.value.substring(0, currentPos)
        lastNewLine = textBeforeCursor.lastIndexOf('\n')
        currentLine = textBeforeCursor.substring(lastNewLine + 1)
        previousLineEnd = lastNewLine === -1 ? 0 : textBeforeCursor.lastIndexOf('\n', lastNewLine - 1)
        previousLineLength = editorElement.value.substring(previousLineEnd + 1, lastNewLine).length
        newPosition = previousLineEnd + Math.min(currentLine.length, previousLineLength)
        editorElement.setSelectionRange(Math.max(0, newPosition), Math.max(0, newPosition))
        break
      }
      case 'k': {
        event.preventDefault()
        // Move down
        pos = editorElement.selectionStart || 0
        textBeforeCursorDown = editorElement.value.substring(0, pos)
        lastNewLineDown = textBeforeCursorDown.lastIndexOf('\n')
        currentLineDown = textBeforeCursorDown.substring(lastNewLineDown + 1)

        // Get the current column position
        const currentColumn = currentLineDown.length

        // Find the next line's start and end
        nextLineStart = editorElement.value.indexOf('\n', pos) + 1

        // If there's no next line but we're not at the end, create a new line
        if (nextLineStart <= 0 && pos < editorElement.value.length) {
          // Move to end of current line
          newPos = editorElement.value.length
          editorElement.setSelectionRange(newPos, newPos)
          break
        }
        // If we're at the end of the file, add a new line
        else if (nextLineStart <= 0) {
          editorElement.value += '\n'
          newPos = editorElement.value.length
          editorElement.setSelectionRange(newPos, newPos)
          // Trigger input event to update the store
          editorElement.dispatchEvent(new Event('input', { bubbles: true }))
          break
        }

        // Normal case - there is a next line
        nextLineEnd = editorElement.value.indexOf('\n', nextLineStart)
        if (nextLineEnd === -1)
          nextLineEnd = editorElement.value.length

        nextLineLength = nextLineEnd - nextLineStart
        // Try to maintain the same column position
        newPos = nextLineStart + Math.min(currentColumn, nextLineLength)
        editorElement.setSelectionRange(newPos, newPos)
        break
      }
    }
  }

  window.addEventListener('keydown', handleKeyDown)

  onUnmounted(() => {
    window.removeEventListener('keydown', handleKeyDown)
  })
}

import { useEditorStore } from '@/stores/editor'
import { computed, nextTick, onMounted, onUnmounted, ref } from 'vue'

export interface Command {
  id: string
  title: string
  description: string
  shortcut: string
  action: () => void
  keyBinding?: {
    key: string
    modifiers?: {
      meta?: boolean
      ctrl?: boolean
      alt?: boolean
      shift?: boolean
    }
  }
}

export function useCommandPalette() {
  const isOpen = ref(false)
  const searchQuery = ref('')
  const selectedIndex = ref(0)
  const inputRef = ref<HTMLInputElement | null>(null)
  const store = useEditorStore()

  function formatDocument() {
    // TODO: Implement document formatting
    const formattedContent = store.content
    store.updateContent(formattedContent)
  }

  const commands: Command[] = [
    {
      id: 'toggle-preview',
      title: 'Toggle Preview',
      description: 'Show or hide the preview panel',
      shortcut: '⌘U',
      action: () => store.togglePreview(),
      keyBinding: {
        key: 'u',
        modifiers: { meta: true },
      },
    },
    {
      id: 'toggle-word-wrap',
      title: 'Toggle Word Wrap',
      description: 'Enable/disable word wrapping in editor',
      shortcut: '⌥Z',
      action: () => store.toggleWordWrap(),
      keyBinding: {
        key: 'z',
        modifiers: { alt: true },
      },
    },
    {
      id: 'format-document',
      title: 'Format Document',
      description: 'Format the markdown document',
      shortcut: '⇧⌥F',
      action: formatDocument,
      keyBinding: {
        key: 'f',
        modifiers: { shift: true, alt: true },
      },
    },
    {
      id: 'toggle-editor',
      title: 'Toggle Editor',
      description: 'Show or hide the editor panel',
      shortcut: '⌘E',
      action: () => store.toggleEditor(),
      keyBinding: {
        key: 'e',
        modifiers: { meta: true },
      },
    },
  ]

  const showCommands = computed(() => searchQuery.value.startsWith('>'))

  const filteredCommands = computed(() => {
    if (!showCommands.value)
      return []

    const query = searchQuery.value.slice(1).toLowerCase().trim()
    if (!query)
      return commands

    return commands.filter((command) => {
      const titleMatch = command.title.toLowerCase().includes(query)
      const descMatch = command.description.toLowerCase().includes(query)
      return titleMatch || descMatch
    })
  })

  function openPalette() {
    isOpen.value = true
    searchQuery.value = ''
    selectedIndex.value = 0
    nextTick(() => {
      inputRef.value?.focus()
    })
  }

  function closePalette() {
    isOpen.value = false
    searchQuery.value = ''
  }

  function handleKeydown(e: KeyboardEvent) {
    // Handle command palette toggle
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'p') {
      e.preventDefault()
      if (isOpen.value)
        closePalette()
      else
        openPalette()
      return
    }

    // Execute commands based on key bindings
    const matchingCommand = commands.find((cmd) => {
      if (!cmd.keyBinding)
        return false
      const kb = cmd.keyBinding

      const keyMatches = kb.key.toLowerCase() === e.key.toLowerCase()
      const metaMatches = !kb.modifiers?.meta || e.metaKey
      const ctrlMatches = !kb.modifiers?.ctrl || e.ctrlKey
      const altMatches = !kb.modifiers?.alt || e.altKey
      const shiftMatches = !kb.modifiers?.shift || e.shiftKey

      return keyMatches && metaMatches && ctrlMatches && altMatches && shiftMatches
    })

    if (matchingCommand) {
      e.preventDefault()
      matchingCommand.action()
      return
    }

    // Command palette specific shortcuts (only when open)
    if (!isOpen.value)
      return

    switch (e.key) {
      case 'ArrowDown':
      case 'Tab':
        e.preventDefault()
        if (filteredCommands.value.length > 0) {
          selectedIndex.value = (selectedIndex.value + 1) % filteredCommands.value.length
        }
        break
      case 'ArrowUp':
        e.preventDefault()
        if (filteredCommands.value.length > 0) {
          selectedIndex.value = selectedIndex.value - 1 < 0
            ? filteredCommands.value.length - 1
            : selectedIndex.value - 1
        }
        break
      case 'Enter':
        e.preventDefault()
        if (filteredCommands.value[selectedIndex.value]) {
          filteredCommands.value[selectedIndex.value].action()
          isOpen.value = false
        }
        break
      case 'Escape':
        e.preventDefault()
        isOpen.value = false
        break
      case 'n':
        if (e.ctrlKey || e.metaKey) {
          e.preventDefault()
          if (filteredCommands.value.length > 0) {
            selectedIndex.value = (selectedIndex.value + 1) % filteredCommands.value.length
          }
        }
        break
    }
  }

  onMounted(() => {
    window.addEventListener('keydown', handleKeydown)
  })

  onUnmounted(() => {
    window.removeEventListener('keydown', handleKeydown)
  })

  function executeCommand(command: Command) {
    command.action()
    isOpen.value = false
  }

  return {
    isOpen,
    searchQuery,
    selectedIndex,
    inputRef,
    showCommands,
    filteredCommands,
    openPalette,
    closePalette,
    executeCommand,
  }
}

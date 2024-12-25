import { beforeEach, describe, expect, it } from 'vitest'
import { CommandPaletteTest } from './helpers/command-palette.helper'

describe('command palette features', () => {
  let commandPalette: CommandPaletteTest

  beforeEach(() => {
    commandPalette = new CommandPaletteTest()
  })

  it('should open command palette with Cmd+P', async () => {
    expect(commandPalette.isCommandPaletteVisible()).toBe(false)
    await commandPalette.openCommandPalette()
    expect(commandPalette.isCommandPaletteVisible()).toBe(true)
  })

  it('should close command palette with Cmd+P when open', async () => {
    await commandPalette.openCommandPalette()
    expect(commandPalette.isCommandPaletteVisible()).toBe(true)

    await commandPalette.closeCommandPalette()
    expect(commandPalette.isCommandPaletteVisible()).toBe(false)
  })

  it('should show commands when typing ">"', async () => {
    await commandPalette.openCommandPalette()
    await commandPalette.typeInCommandPalette('>')

    expect(commandPalette.isCommandVisible('Toggle Preview')).toBe(true)
    expect(commandPalette.isCommandVisible('Toggle Word Wrap')).toBe(true)
    expect(commandPalette.isCommandVisible('Format Document')).toBe(true)
  })

  it('should filter commands based on search query', async () => {
    await commandPalette.openCommandPalette()
    await commandPalette.typeInCommandPalette('>preview')

    expect(commandPalette.isCommandVisible('Toggle Preview')).toBe(true)
    expect(commandPalette.isCommandVisible('Format Document')).toBe(false)
  })

  it('should execute command on Enter', async () => {
    await commandPalette.openCommandPalette()
    await commandPalette.typeInCommandPalette('>')
    await commandPalette.pressKey('{Enter}')

    expect(commandPalette.isCommandPaletteVisible()).toBe(false)
  })

  it('should navigate through commands with arrow keys', async () => {
    await commandPalette.openCommandPalette()
    await commandPalette.typeInCommandPalette('>')

    expect(commandPalette.getHighlightedCommand()).toBe('Toggle Preview')

    await commandPalette.pressKey('{ArrowDown}')
    expect(commandPalette.getHighlightedCommand()).toBe('Toggle Word Wrap')
  })

  it('should navigate through commands with Cmd+N', async () => {
    await commandPalette.openCommandPalette()
    await commandPalette.typeInCommandPalette('>')

    // Get initial command and verify navigation
    const firstCommand = commandPalette.getHighlightedCommand()
    expect(firstCommand).toBeTruthy()

    // Navigate to second command
    const secondCommand
      = await commandPalette.verifyNavigationToNextCommand(firstCommand)

    // Navigate to third command
    await commandPalette.verifyNavigationToNextCommand(secondCommand)

    // Verify the list wraps back to the first command
    await commandPalette.verifyCommandListWrapping(firstCommand)
  })
})

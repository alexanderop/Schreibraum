<template>
  <header class="bg-black border-b border-white/10">
    <div class="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
      <!-- Logo Section -->
      <div class="flex items-center gap-3">
        <div
          class="h-7 w-7 rounded-lg bg-purple-600 flex items-center justify-center"
        >
          <span class="text-white font-bold text-lg">S</span>
        </div>
        <div class="flex items-center">
          <span class="text-white font-semibold text-lg tracking-tight"
            >Schreibraum</span
          >
        </div>
      </div>

      <!-- Actions -->
      <div class="flex items-center">
        <div class="relative group">
          <button
            class="w-9 h-9 rounded-full bg-[#1d1d1d] hover:bg-[#2d2d2d] text-white/80 hover:text-white flex items-center justify-center transition-colors"
            aria-label="Keyboard shortcuts"
          >
            <span class="text-sm">?</span>
          </button>
          <div
            class="absolute right-0 mt-2 w-72 p-3 bg-[#1d1d1d] rounded-lg shadow-lg invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-200"
          >
            <div class="text-sm text-white/90">
              <p class="mb-2 font-medium">Keyboard Shortcuts:</p>
              <div class="space-y-1.5">
                <div class="flex justify-between">
                  <span>Toggle Preview</span>
                  <span class="text-purple-400 font-mono">⌘U</span>
                </div>
                <div class="flex justify-between">
                  <span>Toggle Word Wrap</span>
                  <span class="text-purple-400 font-mono">⌥Z</span>
                </div>
                <div class="flex justify-between">
                  <span>Format Document</span>
                  <span class="text-purple-400 font-mono">⇧⌥F</span>
                </div>
                <div class="flex justify-between">
                  <span>Toggle Editor</span>
                  <span class="text-purple-400 font-mono">⌘E</span>
                </div>
                <div class="flex justify-between">
                  <span>Command Palette</span>
                  <span class="text-purple-400 font-mono">⌘P</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

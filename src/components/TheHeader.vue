<template>
  <header class="backdrop-blur-sm border-b border-border-translucent sticky top-0 z-50 bg-fill/80">
    <div class="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
      <!-- Logo Section -->
      <div class="flex items-center gap-3 group">
        <div
          class="h-7 w-7 rounded-lg flex items-center justify-center transform transition-transform group-hover:scale-105 bg-accent"
        >
          <span class="text-white font-bold text-lg">S</span>
        </div>
        <div class="flex items-center">
          <span class="font-semibold text-lg tracking-tight transition-colors text-text-base">Schreibraum</span>
        </div>
      </div>

      <!-- Actions -->
      <div class="flex items-center">
        <div class="relative group">
          <button
            class="w-9 h-9 rounded-full hover:text-white flex items-center justify-center transition-all duration-200 transform hover:scale-105 bg-card-translucent text-text-muted"
            aria-label="Keyboard shortcuts"
          >
            <span class="text-sm">?</span>
          </button>
          <div
            class="absolute right-0 mt-2 w-72 p-4 backdrop-blur-sm rounded-xl shadow-xl border border-border-translucent invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-200 transform group-hover:translate-y-0 translate-y-2 bg-card/95"
          >
            <div class="text-sm">
              <p class="mb-3 font-medium text-text-base">
                Keyboard Shortcuts
              </p>
              <div class="space-y-2.5">
                <div class="flex justify-between items-center">
                  <span class="text-text-muted">Toggle Preview</span>
                  <span class="px-2 py-0.5 rounded font-mono text-xs text-accent bg-accent-muted">⌘U</span>
                </div>
                <div class="flex justify-between items-center">
                  <span class="text-text-muted">Toggle Word Wrap</span>
                  <span class="px-2 py-0.5 rounded font-mono text-xs text-accent bg-accent-muted">⌥Z</span>
                </div>
                <div class="flex justify-between items-center">
                  <span class="text-text-muted">Format Document</span>
                  <span class="px-2 py-0.5 rounded font-mono text-xs text-accent bg-accent-muted">⇧⌥F</span>
                </div>
                <div class="flex justify-between items-center">
                  <span class="text-text-muted">Toggle Editor</span>
                  <span class="px-2 py-0.5 rounded font-mono text-xs text-accent bg-accent-muted">⌘E</span>
                </div>
                <div class="flex justify-between items-center">
                  <span class="text-text-muted">Command Palette</span>
                  <span class="px-2 py-0.5 rounded font-mono text-xs text-accent bg-accent-muted">⌘P</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>
